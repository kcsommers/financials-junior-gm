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
  // There are six players in your team
  {
    message: 'There are six players on your team!',
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
              component: 'playerCard',
              state: {
                borderColor: '#ffd782',
                scale: 1.2,
              },
            },
          ],
        },
      },
    ],
  },
  // three forwards, 2 defense and one goalie
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
  // you can add a player by tapping on an empty spot
  {
    message: 'You can add a player by tapping on an empty player slot.',
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
    exitActions: [
      {
        type: SET_ANIMATION_STATE,
        payload: {
          page: 'team',
          animationStates: [
            {
              component: 'playerCard',
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
    message: 'Tap a player to learn more about them!',
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
      'Each player has a rank which tells you how good they are in their position',
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
    message: 'The rank depends on three things...',
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
      'Their offense score, which is how good they are at scoring goals.',
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
      'And their defense score, or how good they are at blocking shots from the other team.',
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
      'Players with a higher rank will usually have a higher contract value!',
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
    message: 'You can choose to sign this player for their contract value!',
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
      'This will remove the money in their contract value from your budget',
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
    message: 'And add their rank to your team rank!',
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
    message: "Once you've signed a player, tapping them gives you two choices",
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
    message: 'You can decide to release a player from the team',
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
    message: 'This will add the money of their contract back to your budget!',
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
    message:
      'You can also trade players for others with the same contract value!',
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
      'Your team also has a bench where you can add upto three extra players!',
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
    message: 'You can add players of any position to the bench',
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
    message: 'To be able to use your bench you need to scout players first!',
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
    message: 'Try filling out your team by signing players!',
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
    message: 'Then tap the scout button to learn about scouting!',
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
  //your team also has a bench where you can add upto three extra players
  //you can add players of any position to the bench
  //to be able to fill oout your bench you need to scout players first!
  //click the scout button to fil out your bench.
];

export const teamSlides = slideConfigs.map((c) => new Slide(c));
