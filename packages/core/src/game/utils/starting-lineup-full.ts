import { Student } from '../../auth/users/student.interface';
import { TeamAssignments } from '../../game/players/players';
import { getAvailableSlots } from './get-available-slots';

export const startingLineupFull = (student: Student): boolean => {
  return (
    getAvailableSlots(
      [
        ...TeamAssignments.offense,
        ...TeamAssignments.defense,
        ...TeamAssignments.goalie,
      ],
      student
    ) === 0
  );
};
