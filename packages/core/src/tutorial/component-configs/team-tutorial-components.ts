import { Player } from '../../game/teams/players';
import { TutorialComponentConfig } from './tutorial-component-config';

export type TeamTutorialComponents = Partial<{
  teamBoard: TutorialComponentConfig<{
    scale: number;
    zIndex: number;
  }>;
  forwardCards: TutorialComponentConfig<{
    borderColor: string;
    scale: number;
  }>;
  defenseCards: TutorialComponentConfig<{
    borderColor: string;
    scale: number;
  }>;
  goalieCard: TutorialComponentConfig<{
    borderColor: string;
    scale: number;
  }>;
}>;

export type TeamTutorialSlideEvent =
  | {
      name: 'SHOW_MARKET';
      payload: { player: Player };
    }
  | {
      name: 'SHOW_PLAYER_DETAILS';
      payload: { player: Player };
    }
  | {
      name: 'SHOW_CONFIRM_SIGN_PLAYER';
      payload: { player: Player };
    }
  | {
      name: 'CLOSE_MODAL';
    };
