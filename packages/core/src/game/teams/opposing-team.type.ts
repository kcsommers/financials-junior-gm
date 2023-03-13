import { Team } from './team';

export type OpposingTeam = Team & {
  color: string;
  videos: {
    gameOn: string;
    gameHighlight?: {
      loss: string;
      win: string;
    };
  };
};
