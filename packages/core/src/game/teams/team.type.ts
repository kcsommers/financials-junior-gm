import { ReactElement } from 'react';
import { TeamStatistics } from './team-statistics.type';

export type Team = {
  name: string;
  city?: string;
  stats: TeamStatistics;
  getLogo: (props?: { [key: string]: any }) => ReactElement;
};
