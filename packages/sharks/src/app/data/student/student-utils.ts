import { updateStudentById } from '../../api-helper';

export const updateStudentTimeSpent = (student, startTime): Promise<any> => {
  if (!student || !startTime) {
    return Promise.reject('no student or start time');
  }

  const timeSpent = Date.now() - startTime;
  return updateStudentById(student._id, {
    timeSpent: student.timeSpent + timeSpent,
  });
};
