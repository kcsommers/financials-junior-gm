import { Player, PlayerAssignments } from '../players';

export const isStarter = (player: Player): boolean => {
  if (!player) {
    return false;
  }
  return [
    PlayerAssignments.F_ONE,
    PlayerAssignments.F_TWO,
    PlayerAssignments.F_THREE,
    PlayerAssignments.D_ONE,
    PlayerAssignments.D_TWO,
    PlayerAssignments.G_ONE,
  ].includes(player.playerAssignment);
};
