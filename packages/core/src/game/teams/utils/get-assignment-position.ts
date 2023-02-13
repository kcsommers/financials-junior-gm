import { PlayerAssignment, PlayerPosition, PlayerPositions } from '../players';

export const getAssignmentPosition = (
  assignment: PlayerAssignment
): PlayerPosition => {
  switch (assignment) {
    case 'fOne':
    case 'fTwo':
    case 'fThree': {
      return PlayerPositions.FORWARD;
    }
    case 'dOne':
    case 'dTwo': {
      return PlayerPositions.DEFENSE;
    }
    case 'gOne': {
      return PlayerPositions.GOALIE;
    }
  }
};
