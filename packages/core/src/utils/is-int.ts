export const isInt = (num: any) => {
  return !isNaN(num) && (num / 1) % 1 === 0;
};
