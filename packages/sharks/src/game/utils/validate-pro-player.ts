import { Player } from '@statrookie/core/src/game/teams/players';

export const validateProPlayer = (player: Player): boolean => {
  return player?.sharkPlayer === 'TRUE';
};
