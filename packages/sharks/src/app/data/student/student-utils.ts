import { ApiHelper } from '@statrookie/core';
import { BASE_URL } from 'app/api';

export const updateStudentTimeSpent = (student, startTime): Promise<any> => {
  if (!student || !startTime) {
    return Promise.reject('no student or start time');
  }

  const timeSpent = Date.now() - startTime;
  return ApiHelper.updateStudentById(BASE_URL, student._id, {
    timeSpent: student.timeSpent + timeSpent,
  });
};
