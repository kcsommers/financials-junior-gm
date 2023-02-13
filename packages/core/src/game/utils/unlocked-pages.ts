import { Student } from '../../student/student.interface';
import { startingLineupFull } from '../teams/utils/starting-lineup-full';

export const budgetPageUnlocked = (student: Student): boolean => {
  return +student?.level > 1 || !!student?.tutorials?.home;
};

export const teamPageUnlocked = (student: Student): boolean => {
  if (!student) {
    return false;
  }
  if (+student.level > 1) {
    return (student.pagesVisited || []).includes('team');
  }
  return !!student?.tutorials?.budget;
};

export const seasonPageUnlocked = (student: Student): boolean => {
  if (!student) {
    return false;
  }
  if (+student.level > 1) {
    return startingLineupFull(student);
  }
  console.log('huh:::: ', !!student.tutorials?.season, student.tutorials);
  return !!student.tutorials?.season;
};
