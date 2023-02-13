export const toTitleCase = (str: string): string => {
  if (!str) {
    return str;
  }

  return str
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.substr(1))
    .join(' ');
};
