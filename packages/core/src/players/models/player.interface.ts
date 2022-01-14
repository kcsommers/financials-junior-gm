import { PlayerAssignment } from './player-assignment.type';
import { PlayerPosition } from './player-position.type';

export interface IPlayer {
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
  playerCost: string;
}
