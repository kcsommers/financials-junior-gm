import {
  PlayerAssignments,
  PlayerPositions,
  TeamAssignments,
  playerProps,
} from './players';
import { cloneDeep } from 'lodash';
import { updateStudentById } from './../../api-helper';

export const getOpenAssignment = (position, student) => {
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
    case PlayerPositions.BENCH: {
      return [
        PlayerAssignments.BENCH_ONE,
        PlayerAssignments.BENCH_TWO,
        PlayerAssignments.BENCH_THREE,
      ].find((a) => !student[a]);
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
    case PlayerPositions.BENCH: {
      return [
        PlayerAssignments.BENCH_ONE,
        PlayerAssignments.BENCH_TWO,
        PlayerAssignments.BENCH_THREE,
      ];
    }
    default: {
      return [];
    }
  }
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
    PlayerAssignments.BENCH_ONE,
    PlayerAssignments.BENCH_TWO,
    PlayerAssignments.BENCH_THREE,
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
    case PlayerAssignments.BENCH_ONE:
    case PlayerAssignments.BENCH_TWO:
    case PlayerAssignments.BENCH_THREE: {
      return PlayerPositions.BENCH;
    }
    default: {
      return null;
    }
  }
};

export const handleReleasePlayer = (releasedPlayer, student) => {
  return new Promise((resolve, reject) => {
    const prevAssignment = releasedPlayer.playerAssignment;
    const prevPosition = getPlayerPositon(prevAssignment);
    releasedPlayer.playerAssignment =
      prevPosition === PlayerPositions.BENCH
        ? PlayerAssignments.OFFERED_SCOUT
        : PlayerAssignments.MARKET;

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

export const handleSignPlayer = (
  signedPlayer,
  assignment,
  student,
  seasonState,
  newRolloverBudget
) => {
  return new Promise((resolve, reject) => {
    signedPlayer.playerAssignment = assignment;
    const clonedStudent = cloneDeep(student);
    clonedStudent.players.splice(
      clonedStudent.players.findIndex((p) => p._id === signedPlayer._id),
      1,
      signedPlayer
    );

    const studentUpdates = {
      [assignment]: signedPlayer._id,
      players: clonedStudent.players,
    };

    if (newRolloverBudget !== undefined) {
      studentUpdates.rollOverBudget = newRolloverBudget;
    }

    // if theres an active season scenario, check that the team is full
    // and end the current game block if so
    if (seasonState && seasonState.currentScenario) {
      clonedStudent[assignment] = signedPlayer._id;
      if (
        getAvailableSlots(
          [
            ...TeamAssignments.offense,
            ...TeamAssignments.defense,
            ...TeamAssignments.goalie,
          ],
          clonedStudent
        ) === 0
      ) {
        const studentSeasons = clonedStudent.seasons;
        if (studentSeasons[(+student.level || 1) - 1]) {
          studentSeasons[(+student.level || 1) - 1].push(
            seasonState.completedGames
          );
        } else {
          studentSeasons[(+student.level || 1) - 1] = [
            seasonState.completedGames,
          ];
        }

        studentUpdates.seasons = studentSeasons;
      }
    }

    updateStudentById(student._id, studentUpdates)
      .then((res) =>
        resolve({
          updatedStudent: res.updatedStudent,
          updatedPlayer: signedPlayer,
        })
      )
      .catch((err) => reject(err));
  });
};

export const handleTradePlayers = (
  signedPlayer,
  releasedPlayer,
  student,
  newRolloverBudget
) => {
  return new Promise((resolve, reject) => {
    const prevAssignment = releasedPlayer.playerAssignment;
    const prevPosition = getPlayerPositon(prevAssignment);

    releasedPlayer.playerAssignment =
      prevPosition === PlayerPositions.BENCH
        ? PlayerAssignments.OFFERED_SCOUT
        : PlayerAssignments.MARKET;
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
      [releasedPlayer.playerAssignment]:
        prevPosition === PlayerPositions.BENCH
          ? PlayerAssignments.OFFERED_SCOUT
          : PlayerAssignments.MARKET,
      players: playersCopy,
    };

    if (newRolloverBudget !== undefined) {
      studentUpdates.rollOverBudget = newRolloverBudget;
    }

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
    return 100;
  }

  if (level === 2) {
    return 350;
  }

  if (level === 3) {
    return 510;
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
          p.playerAssignment === PlayerAssignments.INJURED)
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
