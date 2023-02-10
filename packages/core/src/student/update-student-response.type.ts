import { Student } from './student.interface';

export type UpdateStudentResponse = {
  message: string;
  success: boolean;
  updatedStudent: Student;
};
