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
    message: 'There are six players on your team.',
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
    message: '3 forwards, 2 defense and a goalie',
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
                borderWidth: '4px',
                scale: 1.1,
              },
            },
          ],
        },
      },
    ],
  },
  {
    message: 'You can add a player by clicking on an empty player slot.',
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
                borderWidth: '3px',
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
  //tap a player to learn more about them.
  //get rid of spaces on your team.
  {
    message: 'These are the players you can sign to this slot!',
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
  },
  {
    message: 'Click a player to learn more about them!',
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
    message: 'Each player has a rank which tells you how good the player is.',
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
  {
    message: 'For defense and forwards, the rank depends on three things...',
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
  {
    message: 'Their offense score, which is how good they are at scoring.',
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
  {
    message:
      'Their passing score, which is how good they are at helping others score.',
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
  {
    message:
      'Finally their defensive score, which is how good they are at stopping the puck.',
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
  {
    message:
      "A goalie's rank depends on how they stop the puck from going into the goal. This is called a save.",
    sharkie: 'lean',
    hasButtons: true,
    timer: 0,
    small: true,
    transparentBg: true,
  },
  {
    message: 'Each player also has a contract value.',
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
  {
    message:
      'The contract value is the money they are paid to play for your team.',
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
  {
    message:
      'Players with a higher rank will usually have a higher contract value.',
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
  {
    message: 'You can choose to sign this player for their contract value.',
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
  {
    message:
      'This will remove the money of their contract value from your budget.',
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
  {
    message: 'Their rank will then be added to your team rank.',
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
  {
    message: 'You can see these changes above!',
    sharkie: 'lean',
    hasButtons: true,
    timer: 0,
    small: true,
    slideAnimate: {
      y: '61%',
      x: '-63%',
      zIndex: 1000,
    },
    transparentBg: true,
    exitActions: [
      {
        type: TOGGLE_OVERLAY,
        payload: {
          isOpen: false,
          template: <ConfirmSignOverlay player={player} isDisabled={true} />,
          canClose: false,
        },
      },
    ],
  },
  {
    message:
      "Once you've signed a player, clicking on them gives you two choices.",
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
          isOpen: true,
          template: <PlayerDetailsOverlay player={player} isDisabled={true} />,
          canClose: false,
        },
      },
    ],
  },
  {
    message: 'You can decide to release the player from the team.',
    sharkie: 'lean',
    hasButtons: true,
    timer: 0,
    small: true,
    slideAnimate: {
      y: '91%',
      x: '-63%',
      zIndex: 1000,
    },
    transparentBg: true,
  },
  {
    message: 'This will add the money of their contract back to your budget.',
    sharkie: 'lean',
    hasButtons: true,
    timer: 0,
    small: true,
    slideAnimate: {
      y: '81%',
      x: '-63%',
      zIndex: 1000,
    },
    transparentBg: true,
  },
  {
    message: 'Or you can trade a player for other available players.',
    sharkie: 'speak',
    hasButtons: true,
    timer: 0,
    small: true,
    slideAnimate: {
      y: '81%',
      x: '50%',
      zIndex: 1000,
    },
    transparentBg: true,
    exitActions: [
      {
        type: TOGGLE_OVERLAY,
        payload: {
          isOpen: false,
          template: null,
          canClose: true,
        },
      },
    ],
  },
  {
    message:
      'Your team also has a bench where you can add up to three extra players.',
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
  {
    message: 'You can add players of any position to the bench.',
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
  {
    message: 'In order to use your bench, you need to scout players.',
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
  {
    message: 'Try filling out your team by signing players.',
    sharkie: 'speak',
    hasButtons: true,
    timer: 0,
    small: true,
    slideAnimate: {
      y: '21%',
      x: '63%',
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
              component: 'scoutStick',
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
    message: 'Then click the scout button to learn about scouting.',
    sharkie: 'speak',
    hasButtons: true,
    timer: 0,
    small: true,
    slideAnimate: {
      y: '91%',
      x: '63%',
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
              component: 'scoutStick',
              state: {
                scale: 1,
              },
            },
          ],
        },
      },
    ],
  },
  {
    message:
      'If you ever need help with building your team, click the ask S.J. Sharkie button and choose the questions you need answered.',
    sharkie: 'speak',
    hasButtons: true,
    timer: 0,
    small: true,
    slideAnimate: {
      y: '91%',
      x: '63%',
      zIndex: 1000,
    },
    transparentBg: true,
  },
];

export const teamSlides = slideConfigs.map((c) => new Slide(c));
