import { updateStudentById } from '../../api-helper';

export const updateStudentTimeSpent = (student, startTime) => {
  if (!student || !startTime) {
    return;
  }

  const timeSpent = Date.now() - startTime;
  return updateStudentById(student._id, {
    timeSpent: student.timeSpent + timeSpent,
  });
};
