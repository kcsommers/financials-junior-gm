import { updateStudentById } from '../../api-helper';

export const updateStudentTimeSpent = (student, startTime): Promise<any> => {
  if (!student || !startTime) {
    Promise.reject('No Student or start time');
  }

  const timeSpent = Date.now() - startTime;
  return updateStudentById(student._id, {
    timeSpent: student.timeSpent + timeSpent,
  });
};
