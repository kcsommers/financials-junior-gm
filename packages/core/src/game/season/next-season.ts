import { logger } from '../../utils/logger';
import { initPlayersByLevel } from '../../game/teams/api/init-players-by-level';
import { Student } from '../../student/student.interface';
import {
  updateStudent,
  UpdateStudentResponse,
} from '../../student/update-student';

export const postNextSeason = async (
  student: Student,
  apiBaseUrl: string
): Promise<UpdateStudentResponse> => {
  try {
    const updateStudentRes = await updateStudent(
      student._id,
      {
        level: +student.level + 1,
        rollOverBudget: 0,
        savingsBudget: 0,
        objectives: {},
        pagesVisited: [],
      },
      apiBaseUrl
    );
    const initPlayersRes = await initPlayersByLevel(
      +updateStudentRes.updatedStudent.level,
      apiBaseUrl
    );
    const res: UpdateStudentResponse = {
      ...initPlayersRes,
      updatedStudent: initPlayersRes.data,
    };
    return res;
  } catch (error: any) {
    logger.error('postNextSeason error:::: ', error);
    throw error;
  }
};
