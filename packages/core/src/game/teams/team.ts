import { ReactElement } from 'react';
import { TeamStatistics } from './team-statistics';

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

export type Team = {
  name: string;
  city?: string;
  stats: TeamStatistics;
  getLogo: (props?: { [key: string]: any }) => ReactElement;
};
