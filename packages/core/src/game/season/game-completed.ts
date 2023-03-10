import { cloneDeep } from 'lodash';
import { logger } from '../../auth/utils/logger';
import { Student } from '../../student/student.interface';
import {
  updateStudent,
  UpdateStudentResponse,
} from '../../student/update-student';
import { GameResult } from './game-result';
import { scenarioCompleted } from './scenario-completed';

export const postGameCompleted = async (
  student: Student,
  gameResult: GameResult,
  apiBaseUrl: string
): Promise<UpdateStudentResponse> => {
  const clonedStudent = cloneDeep(student);

  const clonedSeasons = clonedStudent.seasons || [];
  const levelSeason = clonedSeasons[+student.level - 1] || [];
  levelSeason.push(gameResult);
  clonedSeasons[+student.level - 1] = levelSeason;

  if (scenarioCompleted(student)) {
    delete clonedStudent.objectives.SEASON_SCENARIO;
  }

  try {
    const updateStudentRes = await updateStudent(
      student._id,
      {
        seasons: clonedSeasons,
        objectives: clonedStudent.objectives,
      },
      apiBaseUrl
    );
    return updateStudentRes;
  } catch (error: any) {
    logger.error('error completing game::::');
    throw error;
  }
};
