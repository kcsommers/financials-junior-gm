export const getPlayerMinMaxRank = (level: number) => {
  if (level === 1) {
    return {
      min: 5,
      max: 15,
    };
  }
  if (level === 2) {
    return {
      min: 35,
      max: 45,
    };
  }
  return {
    min: 75,
    max: 65,
  };
};
