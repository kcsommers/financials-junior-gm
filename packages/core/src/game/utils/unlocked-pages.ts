import { scenarioActive } from '../../game/season/scenario-active';
import { Student } from '../../student/student.interface';

export const budgetPageUnlocked = (student: Student): boolean => {
  return !!student?.tutorials?.home;
};

export const teamPageUnlocked = (student: Student): boolean => {
  // if (+student.level > 1) {
  //   return (student.pagesVisited || []).includes('team');
  // }
  return !!(student?.tutorials?.budget && student?.objectives?.LEARN_BUDGET);
};

export const seasonPageUnlocked = (student: Student): boolean => {
  // if (+student.level > 1) {
  //   return startingLineupFull(student);
  // }
  return !!(
    student?.objectives?.LEARN_BUDGET &&
    student?.objectives?.FILL_TEAM &&
    !scenarioActive(student)
  );
};
