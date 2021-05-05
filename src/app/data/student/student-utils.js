export const setTimeSpent = (student, startTime) => {
  if (!student || !startTime) {
    return;
  }

  const timeSpent = Date.now() - startTime;
  console.log('TIMESPENT:::: ', timeSpent);
};
