import { ObjectiveNames } from '../../game/objectives/objectives';
import { Student } from '../../student/student.interface';

export const scenarioCompleted = (student: Student): boolean => {
  return (
    student?.objectives?.hasOwnProperty(ObjectiveNames.SEASON_SCENARIO) &&
    student.objectives[ObjectiveNames.SEASON_SCENARIO]
  );
};
