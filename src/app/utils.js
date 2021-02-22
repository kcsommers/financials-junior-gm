import { playerProps } from './data/players/players';

export const getMoneySpent = (players) => {
  if (!players) {
    return 0;
  }
  return Math.max(
    players.reduce((total, p) => {
      if (playerProps.includes(p.playerAssignment)) {
        total += +p.playerCost;
      }
      return total;
    }, 0),
    0
  );
};

export const getTeamRank = (players) => {
  if (!players) {
    return 0;
  }

  return Math.min(
    players.reduce((total, p) => {
      if (playerProps.includes(p.playerAssignment)) {
        total += +p.overallRank;
      }
      return total;
    }, 0),
    100
  );
};

export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getDollarString = (num, showZero = false) => {
  if (!num || num === 'null') {
    return showZero ? '$0' : '';
  }
  if (+num % 1 === 0) {
    return `$${num}`;
  }

  return `$${parseFloat(num).toFixed(2)}`;
};

export const getMoneyLevels = (level) => {
  switch (level) {
    case 1:
    case '1':
      return {
        0: {
          short: '$2',
          long: 'two dollar',
          num: 2,
        },
        1: {
          short: '$1',
          long: 'one dollar',
          num: 1,
        },
        2: {
          short: '50\u00a2',
          long: 'fifty cent',
          num: 0.5,
        },
      };
    case 2:
    case '2':
      return {
        0: {
          short: '$2',
          long: 'two dollar',
          num: 2,
        },
        1: {
          short: '$1',
          long: 'one dollar',
          num: 1,
        },
        2: {
          short: '50\u00a2',
          long: 'fifty cent',
          num: 0.5,
        },
      };
    case 3:
    case '3':
      return {
        0: {
          short: '$2',
          long: 'two dollar',
          num: 2,
        },
        1: {
          short: '$1',
          long: 'one dollar',
          num: 1,
        },
        2: {
          short: '50\u00a2',
          long: 'fifty cent',
          num: 0.5,
        },
      };
    default: {
      return {
        short: '?',
        long: 'unknown',
        num: 0,
      };
    }
  }
};
