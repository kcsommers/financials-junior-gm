import { Player, startingPlayerProperties } from '../../game/teams/players';
import { isTeamPlayer } from '../../game/teams/utils/is-team-player';
import { Student } from '../../student/student.interface';

const getSecondHighestPlayer = (student: Student): Player => {
  const sortedTeamPlayers = student.players
    .filter((p) => isTeamPlayer(p))
    .sort((a, b) => +b.overallRank - +a.overallRank);
  return sortedTeamPlayers[1];
};

const getStartingPlayer = (student: Student): Player => {
  const assignment =
    startingPlayerProperties[
      Math.floor(Math.random() * startingPlayerProperties.length)
    ];
  return student.players.find(
    (player) => player.playerAssignment === assignment
  );
};

export const getInjuredPlayer = (student: Student): Player => {
  const levelSeason = (student.seasons || [])[+student.level - 1] || [];
  if (levelSeason.length <= 4) {
    return getSecondHighestPlayer(student);
  }
  return getStartingPlayer(student);
};
