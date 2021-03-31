import Slide from '../../Slide';
import {
  SignPlayerOverlay,
  PlayerDetailsOverlay,
  ConfirmSignOverlay,
} from '@components';
import { TOGGLE_OVERLAY, SET_ANIMATION_STATE } from '@redux/actions';
import { PlayerPositions } from '@data/players/players';

const player = {
  defensiveRank: '16',
  offensiveRank: '24',
  overallRank: '20',
  passRank: '20',
  playerAssignment: 'marketPlayer',
  playerCost: '2',
  playerLevel: '1',
  playerName: 'Janelle Kingsly ',
  playerPicture:
    'https://res.cloudinary.com/statrookie/image/upload/v1613543710/am-players/female-hispanic_buznke.svg',
  playerPosition: 'forward',
  sharkPlayer: 'FALSE',
};

const slideConfigs = [
  {
    message: 'Welcome to your team!',
    sharkie: 'speak',
    hasButtons: true,
    exitActions: [
      {
        type: SET_ANIMATION_STATE,
        payload: {
          page: 'team',
          animationStates: [
            {
              component: PlayerPositions.FORWARD,
              state: {
                borderColor: '#ffd782',
              },
            },
            {
              component: 'teamBoard',
              state: {
                zIndex: 1,
                scale: 1.1,
              },
            },
          ],
        },
      },
    ],
  },
  {
    message: 'Sign three forwards to help your team score goals.',
    sharkie: 'lean',
    hasButtons: true,
    slideAnimate: {
      y: '63%',
      x: '-63%',
    },
    small: true,
    exitActions: [
      {
        type: SET_ANIMATION_STATE,
        payload: {
          page: 'team',
          animationStates: [
            {
              component: PlayerPositions.FORWARD,
              state: {
                borderColor: '#f3901d',
              },
            },
            {
              component: PlayerPositions.DEFENSE,
              state: {
                borderColor: '#ffd782',
              },
            },
          ],
        },
      },
    ],
  },
  {
    message:
      'Sign two defenses to help your team stop the other team from scoring goals.',
    sharkie: 'lean',
    hasButtons: true,
    small: true,
    slideAnimate: {
      y: '63%',
      x: '-63%',
    },
    exitActions: [
      {
        type: SET_ANIMATION_STATE,
        payload: {
          page: 'team',
          animationStates: [
            {
              component: PlayerPositions.DEFENSE,
              state: {
                borderColor: '#f3901d',
              },
            },
            {
              component: PlayerPositions.GOALIE,
              state: {
                borderColor: '#ffd782',
              },
            },
          ],
        },
      },
    ],
  },
  {
    message:
      'Sign one goalie to help your team save the puck from going in your goal.',
    sharkie: 'lean',
    hasButtons: true,
    small: true,
    slideAnimate: {
      y: '63%',
      x: '-63%',
    },
    exitActions: [
      {
        type: SET_ANIMATION_STATE,
        payload: {
          page: 'team',
          animationStates: [
            {
              component: PlayerPositions.FORWARD,
              state: {
                borderColor: '#ffd782',
                scale: 1.1,
              },
            },
            {
              component: PlayerPositions.DEFENSE,
              state: {
                borderColor: '#ffd782',
                scale: 1.1,
              },
            },
            {
              component: PlayerPositions.GOALIE,
              state: {
                scale: 1.1,
              },
            },
          ],
        },
      },
    ],
  },
  {
    message: 'You can add a player by clicking on an empty player space.',
    sharkie: 'lean',
    hasButtons: true,
    small: true,
    slideAnimate: {
      y: '63%',
      x: '-63%',
      zIndex: 1000,
    },
    exitActions: [
      {
        type: SET_ANIMATION_STATE,
        payload: {
          page: 'team',
          animationStates: [
            {
              component: PlayerPositions.FORWARD,
              state: {
                borderColor: '#f3901d',
                scale: 1,
              },
            },
            {
              component: PlayerPositions.DEFENSE,
              state: {
                borderColor: '#f3901d',
                scale: 1,
              },
            },
            {
              component: PlayerPositions.GOALIE,
              state: {
                borderColor: '#f3901d',
                scale: 1,
              },
            },
            {
              component: 'teamBoard',
              state: {
                zIndex: 0,
                scale: 1,
              },
            },
          ],
        },
      },
      {
        type: TOGGLE_OVERLAY,
        payload: {
          isOpen: true,
          template: (
            <SignPlayerOverlay
              assignment='fOne'
              isDisabled={true}
            ></SignPlayerOverlay>
          ),
          canClose: false,
        },
      },
    ],
  },
  {
    message:
      'When you click on a space, you can see all the players you can sign to that space.',
    sharkie: 'speak',
    hasButtons: true,
    small: true,
    slideAnimate: {
      y: '-40%',
      x: '63%',
      zIndex: 1000,
    },
    exitActions: [
      {
        type: TOGGLE_OVERLAY,
        payload: {
          isOpen: true,
          template: <PlayerDetailsOverlay player={player} isDisabled={true} />,
          canClose: false,
        },
      },
    ],
  },
  {
    message: 'When you click on a player, you will learn more about them.',
    sharkie: 'speak',
    hasButtons: true,
    small: true,
    slideAnimate: {
      y: '-40%',
      x: '63%',
      zIndex: 1000,
    },
    exitActions: [
      {
        type: TOGGLE_OVERLAY,
        payload: {
          isOpen: true,
          template: (
            <ConfirmSignOverlay
              player={player}
              isDisabled={true}
              tutorialState={{ teamRank: 20, budget: 13, changes: [2, 20] }}
            />
          ),
          canClose: false,
        },
      },
    ],
  },
  {
    message:
      'When you sign a player, their rank is added to your team rank and their contract value is subtracted from your spending budget.',
    sharkie: 'speak',
    hasButtons: true,
    small: true,
    slideAnimate: {
      y: '-40%',
      x: '63%',
      zIndex: 1000,
    },
    exitActions: [
      {
        type: TOGGLE_OVERLAY,
        payload: {
          isOpen: false,
          template: null,
        },
      },
    ],
  },
  {
    message:
      'When you are finished filling out your team, click on the scout hockey stick to add some replacement players. ',
    sharkie: 'speak',
    hasButtons: true,
    slideAnimate: {
      y: '0',
      x: '0',
      zIndex: 1000,
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

export const teamSlides = slideConfigs.map((c) => new Slide(c));
export const finishedScoutingSlides = finishedScoutingSlideConnfigs.map(
  (c) => new Slide(c)
);
