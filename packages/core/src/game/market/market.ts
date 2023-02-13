import { Player } from '../../game/teams/players';

export type MarketAction = 'release' | 'sign' | 'trade';

export type MarketConfig = {
  action: MarketAction;
  tradedPlayer?: Player;
};
