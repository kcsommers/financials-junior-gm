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
