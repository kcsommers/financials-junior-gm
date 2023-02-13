import { Student } from '../../../student/student.interface';
import { getAvailableSlots } from '../../utils/get-available-slots';
import { TeamAssignments } from '../team';

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
