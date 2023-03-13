export const getPlayerStatMax = (level: number): number => {
  const maxes = {
    1: 30,
    2: 60,
    3: 90,
  };

  return maxes[level] || 30;
};
