import { logger } from '../../utils/logger';
import { Student } from '../../student/student.interface';
import {
  updateStudent,
  UpdateStudentResponse,
} from '../../student/update-student';
import { startingLineupFull } from '../teams/utils/starting-lineup-full';

export const checkTeamObjective = async (
  student: Student,
  apiBaseUrl: string
): Promise<UpdateStudentResponse> => {
  const teamFull = startingLineupFull(student);
  let studentUpdate: Partial<Student>;
  if (teamFull && !student.objectives?.FILL_TEAM) {
    studentUpdate = {
      objectives: {
        ...student.objectives,
        FILL_TEAM: true,
      },
    };
  } else if (!teamFull && student.objectives?.FILL_TEAM) {
    studentUpdate = {
      objectives: {
        ...student.objectives,
        FILL_TEAM: false,
      },
    };
  }
  if (studentUpdate) {
    try {
      const updateStudentRes = await updateStudent(
        student._id,
        studentUpdate,
        apiBaseUrl
      );
      return updateStudentRes;
    } catch (error: any) {
      logger.error('Error updating team objective:::: ', error);
      throw error;
    }
  }
  return null;
};
