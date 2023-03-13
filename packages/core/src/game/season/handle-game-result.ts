import { cloneDeep } from 'lodash';
import { OpposingTeam } from '../../game/teams/opposing-team.type';
import { updateStandings } from '../../game/teams/team-statistics';
import { StudentTeam } from '../teams/student-team.type';
import { GameResult } from './game-result';
import { getRandomStat } from './stats';

export const handleGameResult = (
  studentTeam: StudentTeam,
  opposingTeams: OpposingTeam[],
  gameResult: GameResult
) => {
  const clonedStudentTeam = cloneDeep(studentTeam);
  const clonedOpposingTeams = cloneDeep(opposingTeams);

  clonedStudentTeam.stats.points += gameResult.studentPoints;
  if (gameResult.studentWin) {
    clonedStudentTeam.stats.wins += 1;
  } else {
    clonedStudentTeam.stats.losses += 1;
  }

  clonedOpposingTeams.forEach((team) => {
    if (team.name === gameResult.opposingTeam.name) {
      if (gameResult.studentWin) {
        team.stats.losses += 1;
        const scoreDiff = Math.abs(gameResult.score[0] - gameResult.score[1]);
        // if overtime win opponent still gets a point
        if (scoreDiff <= 1) {
          team.stats.points += 1;
        }
      } else {
        team.stats.wins += 1;
        team.stats.points += 2;
      }
    } else {
      team.stats.points += getRandomStat(3);
      const wins = getRandomStat(2);
      const losses = wins === 0 ? 1 : 0;
      team.stats.wins += wins;
      team.stats.losses += losses;
    }
  });

  updateStandings(clonedStudentTeam, clonedOpposingTeams);

  return { studentTeam: clonedStudentTeam, opposingTeams: clonedOpposingTeams };
};
