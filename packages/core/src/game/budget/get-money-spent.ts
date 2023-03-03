import { isInjuredPlayer } from '../../game/teams/utils/is-injured-player';
import { isTeamPlayer } from '../../game/teams/utils/is-team-player';
import { Student } from '../../student/student.interface';

export const getMoneySpent = (student: Student): number => {
  if (!student?.players) {
    return 0;
  }
  return Math.min(
    student.players.reduce((total, p) => {
      if (isTeamPlayer(p) || isInjuredPlayer(p)) {
        total += +p.playerCost;
      }
      return total;
    }, 0),
    +student.totalBudget
  );
};
