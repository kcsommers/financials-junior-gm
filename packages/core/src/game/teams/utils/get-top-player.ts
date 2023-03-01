import { Player } from '../players';
import { isStarter } from './is-starter';

export const getTopPlayer = (players: Player[]) => {
  const topPlayer = (players || []).reduce((currTop, player) => {
    if (
      isStarter(player) &&
      (!currTop || player.overallRank > currTop.overallRank)
    ) {
      return player;
    }
    return currTop;
  }, null);

  return topPlayer;
};
