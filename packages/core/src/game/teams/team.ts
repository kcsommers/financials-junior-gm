export type StartingPlayer =
  | 'fOne'
  | 'fTwo'
  | 'fThree'
  | 'dOne'
  | 'dTwo'
  | 'gOne';

export type TeamPlayer =
  | 'fOne'
  | 'fTwo'
  | 'fThree'
  | 'dOne'
  | 'dTwo'
  | 'gOne'
  | 'benchOne'
  | 'benchTwo'
  | 'benchThree';

export const TeamAssignments = {
  offense: ['fOne', 'fTwo', 'fThree'],
  defense: ['dOne', 'dTwo'],
  goalie: ['gOne'],
};
