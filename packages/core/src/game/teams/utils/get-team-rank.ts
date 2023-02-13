import { Student } from '../../../student/student.interface';
import { getMaxTeamRank } from './get-max-team-rank';
import { isStarter } from './is-starter';

export const getTeamRank = (student: Student) => {
  if (!student?.players) {
    return 0;
  }

  return Math.min(
    student.players.reduce((total, p) => {
      if (isStarter(p)) {
        total += +p.overallRank;
      }
      return total;
    }, 0),
    getMaxTeamRank(+student.level)
  );
};
