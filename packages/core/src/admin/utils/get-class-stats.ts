import { Student } from '../../student/student.interface';
import { tutorialCompleted } from '../../game/utils/tutorial-completed';

export const getClassStats = (students: Student[]) => {
  const stats = {
    totalTime: 0,
    completedTutorial: 0,
    completedLevel1: 0,
    completedLevel2: 0,
    completedGame: 0,
  };

  (students || []).forEach((student) => {
    stats.totalTime += +student.timeSpent;
    if (tutorialCompleted(student)) {
      stats.completedTutorial++;
    }
    if (+student.level > 1) {
      stats.completedLevel1++;
    }
    if (+student.level > 2) {
      stats.completedLevel2++;
    }
    if (student.wonGame) {
      stats.completedGame++;
    }
  });

  return stats;
};
