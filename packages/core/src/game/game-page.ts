export type GamePage =
  | 'home'
  | 'budget'
  | 'team'
  | 'season'
  | 'trophies'
  | 'scout';

export const isGamePage = (pathname: string): boolean => {
  const gamePages: GamePage[] = [
    'home',
    'budget',
    'team',
    'season',
    'trophies',
    'scout',
  ];
  return gamePages.includes(pathname.replace('/game/', '') as GamePage);
};
