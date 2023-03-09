import { logger } from '../auth/utils/logger';
import { Student } from './student.interface';
import { updateStudent, UpdateStudentResponse } from './update-student';

export const postStudentTimeSpent = async (
  student: Student,
  startTime: number,
  apiBaseUrl: string
): Promise<UpdateStudentResponse> => {
  if (!student || !startTime) {
    return Promise.reject('no student or start time');
  }

  const timeSpent = Date.now() - startTime;
  try {
    const updateStudentRes = await updateStudent(
      student._id,
      {
        timeSpent: student.timeSpent + timeSpent,
      },
      apiBaseUrl
    );
    return updateStudentRes;
  } catch (error: any) {
    logger.error('Error updating student time spent:::: ', error);
  }
};
