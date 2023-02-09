import { Student } from '../../auth/users/student.interface';

export const getAvailableSlots = (props, student: Student): number => {
  if (!student) {
    return props.length;
  }

  return props.reduce((total, p) => {
    if (!student[p]) {
      total++;
    }
    return total;
  }, 0);
};
