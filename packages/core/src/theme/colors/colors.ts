export type ThemeColor = 'primary' | 'secondary' | 'secondary-2' | 'foreground';

export const themeColors: ThemeColor[] = [
  'primary',
  'secondary',
  'secondary-2',
  'foreground',
];

export const isThemeColor = (color: any): boolean => {
  return themeColors.includes(color);
};
