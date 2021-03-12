import Slide from '../../Slide';
import { SET_ANIMATION_STATE } from '@redux/actions';

const slideConfigs = [
  {
    message: 'Welcome to the Scouting page!',
    sharkie: 'play',
    accentText: 'Scouting',
    hasButtons: true,
  },
  {
    message:
      'Scouting is when a general manager studies new players to see how well they play.',
    sharkie: 'speak',
    accentText: 'Scouting',
    hasButtons: true,
  },
  {
    message:
      'Then the general manager can decide which players they want to sign to their team.',
    sharkie: 'speak',
    hasButtons: true,
  },
  {
    message: 'The general manager has to offer players money to sign them.',
    sharkie: 'speak',
    hasButtons: true,
  },
  {
    message:
      'If a general manager really likes a player, they can offer more money to sign them.',
    sharkie: 'speak',
    hasButtons: true,
  },
  {
    message:
      'If a general manager does not offer them enough money, the player can say no to the offer.',
    sharkie: 'speak',
    hasButtons: true,
  },
  {
    message:
      'A general manager has to decide which players fit their team best.',
    sharkie: 'speak',
    hasButtons: true,
  },
  {
    message: 'Every team is different and requires different types of players.',
    sharkie: 'speak',
    hasButtons: true,
  },
  {
    message:
      'A general manager has to make sure they offer each player the right amount of money.',
    sharkie: 'speak',
    hasButtons: true,
  },
  {
    message:
      "Now that you know a little more about scouting, let me show you how it's done.",
    sharkie: 'speak',
    hasButtons: true,
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
    message: 'These are all the new players.',
    sharkie: 'speak',
    small: true,
    hasButtons: true,
    slideAnimate: {
      y: '50%',
      x: '58%',
    },
  },
  {
    message: "They don't have a contract value yet.",
    sharkie: 'speak',
    small: true,
    hasButtons: true,
    slideAnimate: {
      y: '50%',
      x: '58%',
    },
  },
  {
    message:
      'You get to decide how much money you want to offer each player to play for your team.',
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
                transition: {
                  duration: 1,
                },
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
                transition: {
                  duration: 1,
                },
              },
            },
            {
              component: 'moneyLevel2',
              state: {
                scale: 1.2,
                borderColor: '#ffd782',
                transition: {
                  duration: 1,
                },
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
                transition: {
                  duration: 1,
                },
              },
            },
            {
              component: 'moneyLevel3',
              state: {
                scale: 1.2,
                borderColor: '#ffd782',
                transition: {
                  duration: 1,
                },
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
                transition: {
                  duration: 1,
                },
              },
            },
          ],
        },
      },
    ],
  },
  {
    message:
      'You can look at their rank and position to see how they would fit on your team.',
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
                borderColor: '#ffd782',
                transition: {
                  duration: 1,
                },
              },
            },
            {
              component: 'moneyLevel2',
              state: {
                borderColor: '#ffd782',
                transition: {
                  duration: 1,
                },
              },
            },
            {
              component: 'moneyLevel3',
              state: {
                borderColor: '#ffd782',
                transition: {
                  duration: 1,
                },
              },
            },
          ],
        },
      },
    ],
  },
  {
    message: 'Drag them into the level you choose.',
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
                opacity: 0.5,
                borderColor: '#4b4b4b',
                transition: {
                  duration: 1,
                },
              },
            },
            {
              component: 'moneyLevel2',
              state: {
                opacity: 0.5,
                borderColor: '#4b4b4b',
                transition: {
                  duration: 1,
                },
              },
            },
            {
              component: 'moneyLevel3',
              state: {
                opacity: 0.5,
                borderColor: '#4b4b4b',
                transition: {
                  duration: 1,
                },
              },
            },
          ],
        },
      },
    ],
  },
  {
    message: 'Once you are finished, you will be sent back to the Team page.',
    sharkie: 'lean',
    small: true,
    hasButtons: true,
    slideAnimate: {
      y: '50%',
      x: '-58%',
    },
  },
  {
    message: 'The players you pick will be available to add to your bench.',
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
    sharkie: 'lean',
    hasButtons: true,
    small: true,
    slideAnimate: {
      y: '75%',
      x: '50%',
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
                scale: 1,
              },
            },
          ],
        },
      },
    ],
  },
  {
    message: 'You can only scout players Once every season.',
    sharkie: 'speak',
    hasButtons: true,
    accentText: 'Once',
    slideAnimate: {
      y: '0%',
      x: '0%',
    },
  },
  {
    message:
      'Since there are only a few spots in a level, choose your players wisely.',
    sharkie: 'speak',
    hasButtons: true,
  },
  {
    message:
      'If you need more information about scouting, click on the ask S.J. Sharkie button and choose the question you are looking for.',
    sharkie: 'speak',
    hasButtons: true,
  },
  {
    message:
      'After you finish adding your players on the team page, click the Team hockey stick to get back to the home page.',
    sharkie: 'speak',
    hasButtons: true,
    accentText: 'Team',
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
          ].map((c) => ({
            component: c,
            state: {
              opacity: 1,
              zIndex: 0,
            },
          })),
        },
      },
    ],
  },
];

export const scoutSlides = slideConfigs.map((c) => new Slide(c));
