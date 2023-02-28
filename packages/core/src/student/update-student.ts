import axios from 'axios';
import { logger } from '../auth/utils/logger';
import { Student } from './student.interface';

export type UpdateStudentResponse = {
  message: string;
  success: boolean;
  updatedStudent: Student;
};

const updateStudentById = (
  baseUrl: string,
  id: string,
  data: Partial<Student>
): Promise<UpdateStudentResponse> => {
  return axios.put(`${baseUrl}/api/v1/student/${id}`, data);
};

export const updateStudent = async (
  studentId: string,
  data: Partial<Student>,
  apiBaseUrl: string
): Promise<UpdateStudentResponse> => {
  try {
    const updateStudentRes = await updateStudentById(
      apiBaseUrl,
      studentId,
      data
    );
    logger.log('Update student res:::: ', updateStudentRes);
    return updateStudentRes;
  } catch (error: any) {
    logger.error('Update student error:::: ', error);
    throw error;
  }
};
