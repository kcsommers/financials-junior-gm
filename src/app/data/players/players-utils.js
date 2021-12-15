import {
  PlayerAssignments,
  PlayerPositions,
  TeamAssignments,
  playerProps,
} from './players';
import { cloneDeep } from 'lodash';
import { updateStudentById } from './../../api-helper';
import { Objectives } from '@data/objectives/objectives';

export const getOpenAssignment = (position, student) => {
  if (!position) {
    return [
      PlayerAssignments.F_ONE,
      PlayerAssignments.F_TWO,
      PlayerAssignments.F_THREE,
      PlayerAssignments.D_ONE,
      PlayerAssignments.D_TWO,
      PlayerAssignments.G_ONE,
    ].find((a) => !student[a]);
  }

  switch (position) {
    case PlayerPositions.FORWARD: {
      return [
        PlayerAssignments.F_ONE,
        PlayerAssignments.F_TWO,
        PlayerAssignments.F_THREE,
      ].find((a) => !student[a]);
    }
    case PlayerPositions.DEFENSE: {
      return [PlayerAssignments.D_ONE, PlayerAssignments.D_TWO].find(
        (a) => !student[a]
      );
    }
    case PlayerPositions.GOALIE: {
      return PlayerAssignments.G_ONE;
    }
    default: {
      return [];
    }
  }
};

export const getAssignmentsByPosition = (position) => {
  switch (position) {
    case PlayerPositions.FORWARD: {
      return [
        PlayerAssignments.F_ONE,
        PlayerAssignments.F_TWO,
        PlayerAssignments.F_THREE,
      ];
    }
    case PlayerPositions.DEFENSE: {
      return [PlayerAssignments.D_ONE, PlayerAssignments.D_TWO];
    }
    case PlayerPositions.GOALIE: {
      return [PlayerAssignments.G_ONE];
    }
    default: {
      return [];
    }
  }
};

export const startingLineupFull = (team) => {
  return (
    getAvailableSlots(
      [
        ...TeamAssignments.offense,
        ...TeamAssignments.defense,
        ...TeamAssignments.goalie,
      ],
      team
    ) === 0
  );
};

export const getAvailableSlots = (props, team) => {
  if (!team) {
    return props.length;
  }

  return props.reduce((total, p) => {
    if (!team[p]) {
      total++;
    }
    return total;
  }, 0);
};

export const isTeamPlayer = (player) => {
  if (!player) {
    return false;
  }
  return [
    PlayerAssignments.F_ONE,
    PlayerAssignments.F_TWO,
    PlayerAssignments.F_THREE,
    PlayerAssignments.D_ONE,
    PlayerAssignments.D_TWO,
    PlayerAssignments.G_ONE,
  ].includes(player.playerAssignment);
};

export const isStarter = (player) => {
  if (!player) {
    return false;
  }
  return [
    PlayerAssignments.F_ONE,
    PlayerAssignments.F_TWO,
    PlayerAssignments.F_THREE,
    PlayerAssignments.D_ONE,
    PlayerAssignments.D_TWO,
    PlayerAssignments.G_ONE,
  ].includes(player.playerAssignment);
};

export const getPlayerPositon = (assignment) => {
  switch (assignment) {
    case PlayerAssignments.F_ONE:
    case PlayerAssignments.F_TWO:
    case PlayerAssignments.F_THREE: {
      return PlayerPositions.FORWARD;
    }
    case PlayerAssignments.D_ONE:
    case PlayerAssignments.D_TWO: {
      return PlayerPositions.DEFENSE;
    }
    case PlayerAssignments.G_ONE: {
      return PlayerPositions.GOALIE;
    }
    default: {
      return null;
    }
  }
};

export const handleReleasePlayer = (releasedPlayer, student) => {
  return new Promise((resolve, reject) => {
    const prevAssignment = releasedPlayer.playerAssignment;
    releasedPlayer.playerAssignment = PlayerAssignments.MARKET;

    const playersCopy = cloneDeep(student.players);

    playersCopy.splice(
      playersCopy.findIndex((p) => p._id === releasedPlayer._id),
      1,
      releasedPlayer
    );

    updateStudentById(student._id, {
      [prevAssignment]: null,
      players: playersCopy,
    })
      .then((res) =>
        resolve({
          updatedStudent: res.updatedStudent,
          updatedPlayer: releasedPlayer,
          prevAssignment,
        })
      )
      .catch((err) => reject(err));
  });
};

export const handleSignPlayer = (signedPlayer, assignment, student) => {
  return new Promise((resolve, reject) => {
    signedPlayer.playerAssignment = assignment;

    const clonedStudent = cloneDeep(student);
    clonedStudent[assignment] = signedPlayer;
    clonedStudent.players.splice(
      clonedStudent.players.findIndex((p) => p._id === signedPlayer._id),
      1,
      signedPlayer
    );

    const teamFull = startingLineupFull(clonedStudent);

    const studentUpdates = {
      [assignment]: signedPlayer._id,
      players: clonedStudent.players,
    };

    // check for a season scenario objective on the student
    // if its false (incomplete), check that the team is full
    if (
      student.objectives &&
      student.objectives[Objectives.SEASON_SCENARIO] === false &&
      teamFull
    ) {
      // if so set the objective to complete (true)
      studentUpdates.objectives = {
        ...student.objectives,
        [Objectives.SEASON_SCENARIO]: true,
      };
    }

    updateStudentById(student._id, studentUpdates)
      .then((res) =>
        resolve({
          updatedStudent: res.updatedStudent,
          updatedPlayer: signedPlayer,
          startingLineupFull: teamFull,
        })
      )
      .catch((err) => reject(err));
  });
};

export const handleTradePlayers = (signedPlayer, releasedPlayer, student) => {
  return new Promise((resolve, reject) => {
    const prevAssignment = releasedPlayer.playerAssignment;

    releasedPlayer.playerAssignment = PlayerAssignments.UNAVAILABLE;
    signedPlayer.playerAssignment = prevAssignment;

    const playersCopy = cloneDeep(student.players).reduce((arr, p) => {
      if (p._id === releasedPlayer._id) {
        arr.push(releasedPlayer);
        return arr;
      }

      if (p._id === signedPlayer._id) {
        arr.push(signedPlayer);
        return arr;
      }

      arr.push(p);
      return arr;
    }, []);

    const studentUpdates = {
      [signedPlayer.playerAssignment]: signedPlayer._id,
      [releasedPlayer.playerAssignment]: PlayerAssignments.UNAVAILABLE,
      players: playersCopy,
    };

    updateStudentById(student._id, studentUpdates)
      .then((res) =>
        resolve({
          updatedStudent: res.updatedStudent,
          updatedSignedPlayer: signedPlayer,
          updatedReleasedPlayer: releasedPlayer,
        })
      )
      .catch((err) => reject(err));
  });
};

export const getMaxTeamRank = (level) => {
  if (level === 1) {
    return 160;
  }

  if (level === 2) {
    return 330;
  }

  if (level === 3) {
    return 515;
  }
};

export const getMoneySpent = (players, totalBudget) => {
  if (!players) {
    return 0;
  }

  return Math.min(
    players.reduce((total, p) => {
      if (
        p &&
        (playerProps.includes(p.playerAssignment) ||
          p.playerAssignment === PlayerAssignments.UNAVAILABLE)
      ) {
        total += +p.playerCost;
      }
      return total;
    }, 0),
    totalBudget
  );
};

export const getTeamRank = (players, level) => {
  if (!players) {
    return 0;
  }

  return Math.min(
    players.reduce((total, p) => {
      if (p && playerProps.includes(p.playerAssignment)) {
        total += +p.overallRank;
      }
      return total;
    }, 0),
    getMaxTeamRank(level)
  );
};

export const getPlayerStatMax = (level) => {
  const maxes = {
    1: 30,
    2: 60,
    3: 90,
  };

  return maxes[level] || 30;
};

export const getTopPlayer = (players) => {
  let _topPlayer;
  (players || []).forEach((_player) => {
    if (
      _player &&
      isStarter(_player) &&
      (!_topPlayer || _player.overallRank > _topPlayer.overallRank)
    ) {
      _topPlayer = _player;
    }
  });
  return _topPlayer || {};
};
