export const getMaxTeamRank = (level: number): number => {
  if (level === 1) {
    return 160;
  }
  if (level === 2) {
    return 330;
  }
  if (level === 3) {
    return 515;
  }
  return 0;
};
