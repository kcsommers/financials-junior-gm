import { cloneDeep } from 'lodash';
import { logger } from '../auth/utils/logger';
import { Student } from '../student/student.interface';
import {
  updateStudent,
  UpdateStudentResponse,
} from '../student/update-student';
import { TutorialName } from './tutorial-name';

export const postTutorialCompleted = async (
  student: Student,
  tutorialName: TutorialName,
  apiBaseUrl: string
): Promise<UpdateStudentResponse> => {
  try {
    const clonedTutorials = cloneDeep(student.tutorials || ({} as any));
    clonedTutorials[tutorialName] = true;
    const updateStudentRes = await updateStudent(
      student._id,
      {
        tutorials: clonedTutorials,
      },
      apiBaseUrl
    );
    return updateStudentRes;
  } catch (error: any) {
    logger.error('postTutorialCompleted error:::: ', error);
    throw error;
  }
};
