import { isInt } from './is-int';

export const formatNumber = (num: number) => {
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
