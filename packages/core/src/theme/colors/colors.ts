export type ThemeColor =
  | 'primary'
  | 'primary-2'
  | 'secondary'
  | 'secondary-2'
  | 'highlight'
  | 'foreground'
  | 'danger'
  | 'light'
  | 'dark';

export const themeColors: ThemeColor[] = [
  'primary',
  'primary-2',
  'secondary',
  'highlight',
  'secondary-2',
  'foreground',
  'danger',
  'light',
  'dark',
];

export const isThemeColor = (color: any): boolean => {
  return themeColors.includes(color);
};

export type ThemeColors = { [key in ThemeColor]: [number, number, number] };
