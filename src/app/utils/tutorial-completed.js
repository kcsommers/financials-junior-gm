export const tutorialCompleted = (student) => {
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
