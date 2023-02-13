import { Player, PlayerAssignments } from '../players';

export const isInjuredPlayer = (player: Player): boolean => {
  return player?.playerAssignment === PlayerAssignments.UNAVAILABLE;
};
