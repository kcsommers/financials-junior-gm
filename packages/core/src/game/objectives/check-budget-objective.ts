import { logger } from '../../auth/utils/logger';
import { Student } from '../../student/student.interface';
import {
  updateStudent,
  UpdateStudentResponse,
} from '../../student/update-student';
import { ObjectiveNames } from './objectives';

export const checkBudgetObjective = async (
  student: Student,
  apiBaseUrl: string
): Promise<UpdateStudentResponse> => {
  if (student?.objectives?.LEARN_BUDGET) {
    return;
  }
  try {
    const updateStudentRes = await updateStudent(
      student._id,
      {
        objectives: {
          ...student.objectives,
          [ObjectiveNames.LEARN_BUDGET]: true,
        },
      },
      apiBaseUrl
    );
    return updateStudentRes;
  } catch (error: any) {
    logger.error('Error updating budget objective:::: ', error);
    throw error;
  }
};
