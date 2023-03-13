export const getRandomTeamRank = (level: number): number => {
  if (level === 1) {
    return Math.floor(Math.random() * (95 - 70) + 70);
  }
  if (level === 2) {
    return Math.floor(Math.random() * (295 - 240) + 240);
  }
  if (level === 3) {
    return Math.floor(Math.random() * (490 - 425) + 425);
  }
};

export const getRandomStat = (mult: number): number => {
  return Math.floor(Math.random() * mult);
};
