export const getPlayerProps = () => [
  'fOne',
  'fTwo',
  'fThree',
  'dOne',
  'dTwo',
  'gOne',
  'benchOne',
  'benchTwo',
  'benchThree',
];

export const getMoneySpent = (student) => {
  if (!student) {
    return 0;
  }

  return getPlayerProps().reduce((total, p) => {
    const player = student[p];
    if (player) {
      total += player.playerCost;
    }
    return total;
  }, 0);
};
