import Slide from '../../Slide';
import { SET_ANIMATION_STATE, TOGGLE_OVERLAY } from '@redux/actions';
import { PlayerDetailsOverlay } from '@components';

const slideConfigs = [
  {
    message: 'Welcome to your team!',
    sharkie: 'speakInverse',
    hasButtons: true,
    timer: 0,
    slideAnimate: {
      y: '63%',
      x: '-63%',
    },
    small: true,
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
  {
    message: 'These are the players in your squad.',
    sharkie: 'speakInverse',
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
    message: 'Tapping a player will reveal more about them.',
    sharkie: 'speakInverse',
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
        type: TOGGLE_OVERLAY,
        payload: {
          isOpen: true,
          template: (
            <PlayerDetailsOverlay
              player={{
                playerName: 'Emily Burch',
                playerPosition: 'defender',
                offensiveRank: 2,
                passRank: 3,
                defensiveRank: 10,
                overallRank: 15,
                sharkPlayer: 'FALSE',
                playerCost: '1.5',
                playerAssignment: 'dOne',
                imageName: '',
                playerLevel: 1,
              }}
            />
          ),
          canClose: false,
        },
      },
      {
        type: SET_ANIMATION_STATE,
        payload: {
          page: 'team',
          animationStates: [
            {
              component: 'playerCard',
              state: {
                borderColor: 'rgba(0,0,0,0)',
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
      'Each player has a rank, which is how good they are in their position.',
    sharkie: 'speakInverse',
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
    message: 'The rank depends on three things...',
    sharkie: 'speakInverse',
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
    message:
      'Their offense score, which is how good they are at scoring goals.',
    sharkie: 'speakInverse',
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
    message:
      'Their passing score, which is how good they are at helping others score.',
    sharkie: 'speakInverse',
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
    message:
      'And their defense score, or how good they are at blocking goals from the other team.',
    sharkie: 'speakInverse',
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
    message: 'Each player also has a contract value.',
    sharkie: 'speakInverse',
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
    message:
      'The contract value is the money they are paid to play for your team.',
    sharkie: 'speakInverse',
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
    message:
      'Players with a higher rank will usually have a higher contract value!',
    sharkie: 'speakInverse',
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
    message: 'You can decide to release a player from the team',
    sharkie: 'speakInverse',
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
    sharkie: 'speakInverse',
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
    message:
      'You can also trade players for others with the same contract value!',
    sharkie: 'speak',
    hasButtons: true,
    timer: 0,
    small: true,
    slideAnimate: {
      y: '91%',
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
];

export const teamSlides = slideConfigs.map((c) => new Slide(c));
