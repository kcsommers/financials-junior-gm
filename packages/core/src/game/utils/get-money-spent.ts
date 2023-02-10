import { Student } from '../../student/student.interface';
import {
  PlayerAssignments,
  playerProperties,
} from '../../game/players/players';

export const getMoneySpent = (student: Student): number => {
  if (!student?.players) {
    return 0;
  }

  return Math.min(
    student.players.reduce((total, p) => {
      if (
        p &&
        (playerProperties.includes(p.playerAssignment) ||
          p.playerAssignment === PlayerAssignments.UNAVAILABLE) // <-- injured
      ) {
        total += +p.playerCost;
      }
      return total;
    }, 0),
    +student.totalBudget
  );
};
