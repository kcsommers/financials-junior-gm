import Slide from '../../Slide';
import { SET_ANIMATION_STATE } from '@redux/actions';

const slideConfigs = [
  {
    message: 'Welcome to the Scouting page!',
    sharkie: 'play',
    hasButtons: true,
    slideAnimate: {
      y: '0%',
      x: '0%',
    },
    exitActions: [
      {
        type: SET_ANIMATION_STATE,
        payload: {
          page: 'scout',
          animationStates: [
            {
              component: 'availablePlayersBoard',
              state: {
                scale: 1.2,
                zIndex: 1,
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
      'These are the players you will sign if you ever need to replace a starting player on your team.',
    sharkie: 'speak',
    hasButtons: true,
    small: true,
    slideAnimate: {
      y: '50%',
      x: '58%',
    },
    previousActions: [
      {
        type: SET_ANIMATION_STATE,
        payload: {
          page: 'scout',
          animationStates: [
            {
              component: 'availablePlayersBoard',
              state: {
                scale: 1,
                zIndex: 0,
                borderColor: '#4b4b4b',
              },
            },
          ],
        },
      },
    ],
  },
  {
    message:
      "They don't have a contract value yet. So you have to decide how much you want to offer these players.",
    sharkie: 'speak',
    small: true,
    hasButtons: true,
    slideAnimate: {
      y: '50%',
      x: '58%',
    },
    exitActions: [
      {
        type: SET_ANIMATION_STATE,
        payload: {
          page: 'scout',
          animationStates: [
            {
              component: 'availablePlayersBoard',
              state: {
                scale: 1,
                opacity: 0.5,
                borderColor: '#4b4b4b',
              },
            },
            {
              component: 'offeredPlayersBoard',
              state: {
                zIndex: 1,
              },
            },
            {
              component: 'moneyLevel1',
              state: {
                scale: 1.2,
                zIndex: 1,
                borderColor: '#ffd782',
              },
            },
            {
              component: 'moneyLevel2',
              state: {
                zIndex: 1,
              },
            },
            {
              component: 'moneyLevel3',
              state: {
                zIndex: 1,
              },
            },
          ],
        },
      },
    ],
  },
  {
    message: 'There are 3 levels of contract values.',
    sharkie: 'lean',
    small: true,
    hasButtons: true,
    slideAnimate: {
      y: '50%',
      x: '-58%',
    },
    exitActions: [
      {
        type: SET_ANIMATION_STATE,
        payload: {
          page: 'scout',
          animationStates: [
            {
              component: 'moneyLevel1',
              state: {
                scale: 1,
                borderColor: '#4b4b4b',
              },
            },
            {
              component: 'moneyLevel2',
              state: {
                scale: 1.2,
                borderColor: '#ffd782',
              },
            },
          ],
        },
      },
    ],
    previousActions: [
      {
        type: SET_ANIMATION_STATE,
        payload: {
          page: 'scout',
          animationStates: [
            {
              component: 'availablePlayersBoard',
              state: {
                scale: 1.2,
                opacity: 1,
                borderColor: '#ffd782',
              },
            },
            {
              component: 'moneyLevel1',
              state: {
                scale: 1,
                borderColor: '#4b4b4b',
              },
            },
          ],
        },
      },
    ],
  },
  {
    message: 'Each level has a different dollar amount.',
    sharkie: 'lean',
    small: true,
    hasButtons: true,
    slideAnimate: {
      y: '50%',
      x: '-58%',
    },
    exitActions: [
      {
        type: SET_ANIMATION_STATE,
        payload: {
          page: 'scout',
          animationStates: [
            {
              component: 'moneyLevel2',
              state: {
                scale: 1,
                borderColor: '#4b4b4b',
              },
            },
            {
              component: 'moneyLevel3',
              state: {
                scale: 1.2,
                borderColor: '#ffd782',
              },
            },
          ],
        },
      },
    ],
    previousActions: [
      {
        type: SET_ANIMATION_STATE,
        payload: {
          page: 'scout',
          animationStates: [
            {
              component: 'moneyLevel1',
              state: {
                scale: 1.2,
                borderColor: '#ffd782',
              },
            },
            {
              component: 'moneyLevel2',
              state: {
                scale: 1,
                borderColor: '#4b4b4b',
              },
            },
          ],
        },
      },
    ],
  },
  {
    message:
      'Players will be offered the dollar amount of the level they are placed in.',
    sharkie: 'lean',
    hasButtons: true,
    small: true,
    slideAnimate: {
      y: '50%',
      x: '-58%',
    },
    exitActions: [
      {
        type: SET_ANIMATION_STATE,
        payload: {
          page: 'scout',
          animationStates: [
            {
              component: 'moneyLevel3',
              state: {
                scale: 1,
                borderColor: '#4b4b4b',
              },
            },
          ],
        },
      },
    ],
    previousActions: [
      {
        type: SET_ANIMATION_STATE,
        payload: {
          page: 'scout',
          animationStates: [
            {
              component: 'moneyLevel2',
              state: {
                scale: 1.2,
                borderColor: '#ffd782',
              },
            },
            {
              component: 'moneyLevel3',
              state: {
                scale: 1,
                borderColor: '#4b4b4b',
              },
            },
          ],
        },
      },
    ],
  },
  {
    message:
      'Drag them into the level you choose and be sure to fill all six spots.',
    sharkie: 'lean',
    hasButtons: true,
    small: true,
    slideAnimate: {
      y: '50%',
      x: '-58%',
    },
    exitActions: [
      {
        type: SET_ANIMATION_STATE,
        payload: {
          page: 'scout',
          animationStates: [
            {
              component: 'moneyLevel1',
              state: {
                opacity: 0.5,
                borderColor: '#4b4b4b',
              },
            },
            {
              component: 'moneyLevel2',
              state: {
                opacity: 0.5,
                borderColor: '#4b4b4b',
              },
            },
            {
              component: 'moneyLevel3',
              state: {
                opacity: 0.5,
                borderColor: '#4b4b4b',
              },
            },
          ],
        },
      },
    ],
    previousActions: [
      {
        type: SET_ANIMATION_STATE,
        payload: {
          page: 'scout',
          animationStates: [
            {
              component: 'moneyLevel3',
              state: {
                scale: 1.2,
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
      'You can only scout players once every season, so pick the players who fit your team the best.',
    sharkie: 'speakInverse',
    hasButtons: true,
    slideAnimate: {
      y: '0%',
      x: '0%',
    },
    previousActions: [
      {
        type: SET_ANIMATION_STATE,
        payload: {
          page: 'scout',
          animationStates: [
            {
              component: 'moneyLevel1',
              state: {
                opacity: 1,
                borderColor: '#ffd782',
              },
            },
            {
              component: 'moneyLevel2',
              state: {
                opacity: 1,
                borderColor: '#ffd782',
              },
            },
            {
              component: 'moneyLevel3',
              state: {
                opacity: 1,
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
      'If you need help deciding which players to pick or want to know how to sign these players, click on the call S.J. Sharkie button.',
    sharkie: 'speakInverse',
    hasButtons: true,
    slideAnimate: {
      y: '0%',
      x: '0%',
    },
    exitActions: [
      {
        type: SET_ANIMATION_STATE,
        payload: {
          page: 'scout',
          animationStates: [
            {
              component: 'finishedBtn',
              state: {
                scale: 1.2,
                zIndex: 1,
              },
            },
          ],
        },
      },
    ],
  },
  {
    message: 'Click here when you are finished.',
    sharkie: 'speakInverse',
    hasButtons: true,
    slideAnimate: {
      y: '-10%',
      x: '10%',
    },
    exitActions: [
      {
        type: SET_ANIMATION_STATE,
        payload: {
          page: 'scout',
          animationStates: [
            'availablePlayersBoard',
            'offeredPlayersBoard',
            'moneyLevel1',
            'moneyLevel2',
            'moneyLevel3',
            'finishedBtn',
          ].map((c) => ({
            component: c,
            state: {
              opacity: 1,
              zIndex: 0,
              scale: 1,
            },
          })),
        },
      },
    ],
    previousActions: [
      {
        type: SET_ANIMATION_STATE,
        payload: {
          page: 'scout',
          animationStates: [
            {
              component: 'finishedBtn',
              state: {
                scale: 1,
              },
            },
          ],
        },
      },
    ],
  },
];

export const scoutSlides = slideConfigs.map((c) => new Slide(c));
