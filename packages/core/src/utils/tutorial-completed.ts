import { Student } from '../auth/users/student.interface';

export const tutorialCompleted = (student: Student) => {
  return !!(
    student &&
    student.tutorials &&
    student.tutorials.home &&
    student.tutorials.budget &&
    student.tutorials.team &&
    student.tutorials.scout &&
    student.tutorials.season
  );
};
