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

export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getDollarString = (num) => {
  if (!num) {
    return '$0';
  }
  if (num % 1 === 0) {
    return `$${num}`;
  }
  return `$${num.toFixed(2)}`;
};
