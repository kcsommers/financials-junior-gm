import { cloneDeep } from 'lodash';
import { logger } from '../../auth/utils/logger';
import { initPlayersByLevel } from '../../game/teams/api/init-players-by-level';
import { Student } from '../../student/student.interface';
import {
  updateStudent,
  UpdateStudentResponse,
} from '../../student/update-student';

export const postResetSeason = async (
  student: Student,
  apiBaseUrl: string
): Promise<UpdateStudentResponse> => {
  const clonedSeasons = cloneDeep(student.seasons || []);
  clonedSeasons[+student.level - 1] = [];
  try {
    const updateStudentRes = await updateStudent(
      student._id,
      {
        seasons: clonedSeasons,
        objectives: {},
        savingsBudget: 0,
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
    logger.error('resetSeason error:::: ', error);
    throw error;
  }
};
