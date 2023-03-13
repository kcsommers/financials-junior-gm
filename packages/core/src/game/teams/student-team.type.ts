import { Player } from './players';
import { TeamPlayer } from './team';
import { Team } from './team';

export type StudentTeam = Team & {
  players: { [key in TeamPlayer]?: Player };
};
