import { StartingPlayer, TeamPlayer } from './team';

export type PlayerPosition = 'forward' | 'defender' | 'goalie' | 'defense';

export type PlayerAssignment =
  | 'marketPlayer'
  | 'scoutPlayer'
  | 'rosterPlayer'
  | 'fOne'
  | 'fTwo'
  | 'fThree'
  | 'gOne'
  | 'dOne'
  | 'dTwo'
  | 'benchOne'
  | 'benchTwo'
  | 'benchThree'
  | 'traded';

export const startingPlayerProperties: StartingPlayer[] = [
  'fOne',
  'fTwo',
  'fThree',
  'dOne',
  'dTwo',
  'gOne',
];

export const teamPlayerProperties: TeamPlayer[] = [
  'fOne',
  'fTwo',
  'fThree',
  'dOne',
  'dTwo',
  'gOne',
  'benchOne',
  'benchTwo',
  'benchThree',
];

export type Player = {
  playerName: string;
  playerPosition: PlayerPosition;
  offensiveRank: string;
  defensiveRank: string;
  passRank: string;
  overallRank: string;
  sharkPlayer: string;
  playerAssignment: PlayerAssignment;
  playerLevel: string;
  playerPicture: string;
  playerCost: string | number;
  _id: string;
};

export const PlayerAssignments = {
  MARKET: 'marketPlayer',
  SCOUT: 'scoutPlayer',
  OFFERED_SCOUT: 'offeredScoutPlayer',
  TRADED: 'traded',
  UNAVAILABLE: null,
  F_ONE: 'fOne',
  F_TWO: 'fTwo',
  F_THREE: 'fThree',
  D_ONE: 'dOne',
  D_TWO: 'dTwo',
  G_ONE: 'gOne',
};

export enum PlayerPositions {
  FORWARD = 'forward',
  DEFENSE = 'defense',
  GOALIE = 'goalie',
}
