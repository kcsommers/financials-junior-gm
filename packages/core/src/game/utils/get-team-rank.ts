import { Student } from '../../student/student.interface';
import { playerProperties } from '../players/players';
import { getMaxTeamRank } from './get-max-team-rank';

export const getTeamRank = (student: Student) => {
  if (!student?.players) {
    return 0;
  }

  return Math.min(
    student.players.reduce((total, p) => {
      if (p && playerProperties.includes(p.playerAssignment)) {
        total += +p.overallRank;
      }
      return total;
    }, 0),
    getMaxTeamRank(+student.level)
  );
};
