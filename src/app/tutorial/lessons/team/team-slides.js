import Slide from '../../Slide';
import { SET_ANIMATION_STATE } from '../../../redux/tutorials/tutorials.actions';
import { TOGGLE_OVERLAY } from '../../../redux/overlay/overlay.actions';
import { SignPlayerOverlay, PlayerDetailsOverlay } from '@components';
import { ConfirmSignOverlay } from '../../../components/overlays/ConfirmSignOverlay';

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
    sharkie: 'lean',
    hasButtons: true,
    timer: 0,
    slideAnimate: {
      y: '63%',
      x: '-63%',
    },
    small: true,
    transparentBg: true,
  },
  {
    message: 'Sign three forwards to help your team score goals.  ',
    sharkie: 'lean',
    hasButtons: true,
    timer: 0,
    slideAnimate: {
      y: '63%',
      x: '-63%',
    },
    small: true,
    transparentBg: true,
  },
  {
    message:
      'Sign two defenses to help your team stop the other team from scoring goals.',
    sharkie: 'lean',
    hasButtons: true,
    timer: 0,
    small: true,
    slideAnimate: {
      y: '63%',
      x: '-63%',
    },
    transparentBg: true,
  },
  {
    message:
      'Sign one goalie to help your team save the puck from going in your goal.',
    sharkie: 'lean',
    hasButtons: true,
    timer: 0,
    small: true,
    slideAnimate: {
      y: '63%',
      x: '-63%',
    },
    transparentBg: true,
    exitActions: [
      {
        type: SET_ANIMATION_STATE,
        payload: {
          page: 'team',
          animationStates: [
            {
              component: 'playerCardEmpty',
              state: {
                borderColor: '#ffd782',
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
    timer: 0,
    small: true,
    slideAnimate: {
      y: '63%',
      x: '-63%',
      zIndex: 1000,
    },
    transparentBg: true,
    exitActions: [
      {
        type: SET_ANIMATION_STATE,
        payload: {
          page: 'team',
          animationStates: [
            {
              component: 'playerCardEmpty',
              state: {
                borderColor: '#f3901d',
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
    timer: 0,
    small: true,
    slideAnimate: {
      y: '-40%',
      x: '63%',
      zIndex: 1000,
    },
    transparentBg: true,
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
    timer: 0,
    small: true,
    slideAnimate: {
      y: '-40%',
      x: '63%',
      zIndex: 1000,
    },
    transparentBg: true,
    exitActions: [
      {
        type: TOGGLE_OVERLAY,
        payload: {
          isOpen: true,
          template: <ConfirmSignOverlay player={player} isDisabled={true} />,
          canClose: false,
        },
      },
    ],
  },
  {
    message:
      'When you sign a player, their rank is added to your team rank and their contract value is subtracted from your spending budget.',
    sharkie: 'lean',
    hasButtons: true,
    timer: 0,
    small: true,
    slideAnimate: {
      y: '21%',
      x: '-63%',
      zIndex: 1000,
    },
    transparentBg: true,
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
    sharkie: 'lean',
    hasButtons: true,
    timer: 0,
    small: true,
    slideAnimate: {
      y: '21%',
      x: '-63%',
      zIndex: 1000,
    },
    transparentBg: true,
  },
];

export const teamSlides = slideConfigs.map((c) => new Slide(c));
