import { commafyNumber } from './commafy-number';

export const getDollarString = (num, showZero = false) => {
  if (!num || num === 'null') {
    return showZero ? '$0' : '';
  }

  let safeNum = Math.max(0, +num);

  if (safeNum % 1 === 0) {
    return `$${commafyNumber(safeNum)}`;
  }

  return `$${commafyNumber(parseFloat(String(safeNum)).toFixed(2))}`;
};
