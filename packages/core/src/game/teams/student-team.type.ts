import { ReactElement } from 'react';
import { Player } from './players';
import { TeamPlayer } from './team';
import { TeamStatistics } from './team-statistics.type';

export type StudentTeam = {
  nickName: string;
  city: string;
  stats: TeamStatistics;
  logo: ReactElement;
  players: { [key in TeamPlayer]?: Player };
};
