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
  MARKET: 'marketPlayer' as PlayerAssignment,
  SCOUT: 'scoutPlayer' as PlayerAssignment,
  OFFERED_SCOUT: 'offeredScoutPlayer' as PlayerAssignment,
  TRADED: 'traded' as PlayerAssignment,
  UNAVAILABLE: null as PlayerAssignment,
  F_ONE: 'fOne' as PlayerAssignment,
  F_TWO: 'fTwo' as PlayerAssignment,
  F_THREE: 'fThree' as PlayerAssignment,
  D_ONE: 'dOne' as PlayerAssignment,
  D_TWO: 'dTwo' as PlayerAssignment,
  G_ONE: 'gOne' as PlayerAssignment,
};

export enum PlayerPositions {
  FORWARD = 'forward',
  DEFENSE = 'defense',
  GOALIE = 'goalie',
}
