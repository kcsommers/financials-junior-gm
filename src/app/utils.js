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
          short: '$3',
          long: 'three dollar',
          num: 3,
        },
        1: {
          short: '$2',
          long: 'two dollar',
          num: 2,
        },
        2: {
          short: '$1 ',
          long: 'one dollar',
          num: 1,
        },
      };
    case 2:
    case '2':
      return {
        0: {
          short: '$3k',
          long: 'three hundred dollar',
          num: 300,
        },
        1: {
          short: '$200',
          long: 'two hundred dollar',
          num: 200,
        },
        2: {
          short: '$100',
          long: 'one hundred dollar',
          num: 100,
        },
      };
    case 3:
    case '3':
      return {
        0: {
          short: '$30',
          long: 'thirty dollar',
          num: 30,
        },
        1: {
          short: '$20',
          long: 'twenty dollar',
          num: 20,
        },
        2: {
          short: '$10',
          long: 'ten dollar',
          num: 0,
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
