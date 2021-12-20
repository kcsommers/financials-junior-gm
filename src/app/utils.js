export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const commafyNumber = (num) => {
  if (!num) {
    return num;
  }
  let counter = 0;
  let intString = typeof num === 'number' ? num.toString() : num;
  let decString = '';
  if (intString.includes('.')) {
    const decIndex = intString.indexOf('.');
    decString = intString.substring(decIndex);
    intString = intString.substring(0, decIndex);
  }
  for (let i = intString.length; i > 0; i--) {
    if (counter === 3) {
      intString = intString.substring(0, i) + ',' + intString.substring(i);
      counter = 0;
    }
    counter++;
  }
  return intString + decString;
};

export const getDollarString = (num, showZero = false) => {
  if (!num || num === 'null') {
    return showZero ? '$0' : '';
  }

  let safeNum = Math.max(0, +num);

  if (safeNum % 1 === 0) {
    return `$${commafyNumber(safeNum)}`;
  }

  return `$${commafyNumber(parseFloat(safeNum).toFixed(2))}`;
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
          num: 10,
        },
      };
    case 3:
    case '3':
      return {
        0: {
          short: '$300',
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
    default: {
      return {
        short: '?',
        long: 'unknown',
        num: 0,
      };
    }
  }
};

export const isInt = (num) => {
  return !isNaN(num) && (num / 1) % 1 === 0;
};

export const formatNumber = (num) => {
  var SI_SYMBOL = ['', 'k', 'M', 'G', 'T', 'P', 'E'];

  // what tier? (determines SI symbol)
  var tier = (Math.log10(Math.abs(num)) / 3) | 0;

  // if zero, we don't need a suffix
  if (tier === 0) {
    return num;
  }

  // get suffix and determine scale
  var suffix = SI_SYMBOL[tier];
  var scale = Math.pow(10, tier * 3);

  // scale the number
  var scaled = num / scale;

  // format number and add suffix
  return (isInt(scaled) ? scaled : scaled.toFixed(1)) + suffix;
};

export const toTitleCase = (str) => {
  if (!str) {
    return str;
  }

  return str
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.substr(1))
    .join(' ');
};
