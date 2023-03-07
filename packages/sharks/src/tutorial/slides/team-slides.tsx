import {
  Player,
  PlayerAssignments,
  PlayerPositions,
} from '@statrookie/core/src/game/teams/players';
import {
  TeamTutorialComponents,
  TeamTutorialSlideEvent,
} from '@statrookie/core/src/tutorial/component-configs/team-tutorial-components';
import { TutorialSlide } from '@statrookie/core/src/tutorial/tutorial-slide';
import { v4 as uuid } from 'uuid';
import { SharksThemeColors } from '../../theme/theme-colors';
import { mascotConfigs } from '../mascot-configs';

const player: Player = {
  defensiveRank: '16',
  offensiveRank: '24',
  overallRank: '20',
  passRank: '20',
  playerAssignment: PlayerAssignments.F_ONE,
  playerCost: 2,
  playerLevel: '1',
  playerName: 'Janelle Kingsly ',
  playerPicture:
    'https://res.cloudinary.com/statrookie/image/upload/v1613543710/am-players/female-hispanic_buznke.svg',
  playerPosition: PlayerPositions.FORWARD,
  sharkPlayer: 'FALSE',
  _id: uuid(),
};

export const teamSlides: TutorialSlide<
  TeamTutorialComponents,
  TeamTutorialSlideEvent
>[] = [
  {
    id: uuid(),
    textComponent: <p className="text-4xl">Welcome to your team!</p>,
    mascotConfig: mascotConfigs.sharkieSpeak,
  },
  {
    id: uuid(),
    textComponent: (
      <p className="text-4xl">
        Sign three forwards to help your team score goals.
      </p>
    ),
    mascotConfig: {
      ...mascotConfigs.sharkieLean,
      animate: {
        scale: 0.75,
        x: '-30%',
        y: '40%',
      },
    },
    componentConfigs: {
      teamBoard: {
        variants: {
          animate: {
            scale: 1.1,
            zIndex: 60,
          },
        },
      },
      forwardCards: {
        variants: {
          animate: {
            borderColor: `rgb(${SharksThemeColors.primary.join(' ')})`,
            scale: 1.1,
          },
        },
      },
    },
  },
  {
    id: uuid(),
    textComponent: (
      <p className="text-4xl">
        Sign two defenders to help your team stop the other team from scoring
        goals.
      </p>
    ),
    mascotConfig: {
      ...mascotConfigs.sharkieLean,
      animate: {
        scale: 0.75,
        x: '-30%',
        y: '40%',
      },
    },
    componentConfigs: {
      teamBoard: {
        variants: {
          animate: {
            scale: 1.1,
            zIndex: 60,
          },
        },
      },
      defenseCards: {
        variants: {
          animate: {
            borderColor: `rgb(${SharksThemeColors.primary.join(' ')})`,
            scale: 1.1,
          },
        },
      },
    },
  },
  {
    id: uuid(),
    textComponent: (
      <p className="text-4xl">
        Sign one goalie to help your team save the puck from going in your goal.
      </p>
    ),
    mascotConfig: {
      ...mascotConfigs.sharkieLean,
      animate: {
        scale: 0.75,
        x: '-30%',
        y: '40%',
      },
    },
    componentConfigs: {
      teamBoard: {
        variants: {
          animate: {
            scale: 1.1,
            zIndex: 60,
          },
        },
      },
      goalieCard: {
        variants: {
          animate: {
            borderColor: `rgb(${SharksThemeColors.primary.join(' ')})`,
            scale: 1.1,
          },
        },
      },
    },
  },
  {
    id: uuid(),
    textComponent: (
      <p className="text-4xl">
        You can add a player by clicking on an empty player space.
      </p>
    ),
    mascotConfig: {
      ...mascotConfigs.sharkieLean,
      animate: {
        scale: 0.75,
        x: '-30%',
        y: '40%',
      },
    },
    componentConfigs: {
      teamBoard: {
        variants: {
          animate: {
            scale: 1.1,
            zIndex: 60,
          },
        },
      },
      forwardCards: {
        variants: {
          animate: {
            borderColor: `rgb(${SharksThemeColors.primary.join(' ')})`,
            scale: 1.1,
          },
        },
      },
      defenseCards: {
        variants: {
          animate: {
            borderColor: `rgb(${SharksThemeColors.primary.join(' ')})`,
            scale: 1.1,
          },
        },
      },
      goalieCard: {
        variants: {
          animate: {
            borderColor: `rgb(${SharksThemeColors.primary.join(' ')})`,
            scale: 1.1,
          },
        },
      },
    },
    slideEvent: {
      name: 'CLOSE_MODAL',
    },
  },
  {
    id: uuid(),
    textComponent: (
      <p className="text-4xl">
        When you click on a space, you can see all the players you can sign to
        that space.
      </p>
    ),
    mascotConfig: {
      ...mascotConfigs.sharkieSpeak,
      animate: {
        scale: 0.75,
        x: '30%',
        y: '-35%',
      },
    },
    slideEvent: {
      name: 'SHOW_MARKET',
      payload: { player },
    },
  },
  {
    id: uuid(),
    textComponent: (
      <p className="text-4xl">
        When you click on a player, you will learn more about them.
      </p>
    ),
    mascotConfig: {
      ...mascotConfigs.sharkieSpeak,
      animate: {
        scale: 0.75,
        x: '30%',
        y: '-35%',
      },
    },
    slideEvent: {
      name: 'SHOW_PLAYER_DETAILS',
      payload: { player },
    },
  },
  {
    id: uuid(),
    textComponent: (
      <p className="text-3xl">
        When you sign a player, their rank is added to your team rank and their
        contract value is subtracted from your spending budget.
      </p>
    ),
    mascotConfig: {
      ...mascotConfigs.sharkieSpeak,
      animate: {
        scale: 0.75,
        x: '30%',
        y: '-35%',
      },
    },
    slideEvent: {
      name: 'SHOW_CONFIRM_SIGN_PLAYER',
      payload: { player },
    },
  },
  {
    id: uuid(),
    textComponent: (
      <p className="text-3xl">
        When you are finished filling out your team, click on the scout hockey
        stick to add some replacement players.
      </p>
    ),
    mascotConfig: mascotConfigs.sharkieSpeak,
    slideEvent: {
      name: 'CLOSE_MODAL',
    },
  },
];

const finishedScoutingSlideConnfigs = [
  {
    message:
      'If you are done making changes to your team, click on the orange team hockey stick.',
    sharkie: 'speak',
    hasButtons: true,
  },
];
