import Slide from '../../Slide';
import { SET_ANIMATION_STATE } from '@redux/actionTypes';

const slideConfigs = [
  {
    message: 'Okay for your final objective, you will Scout new players!',
    sharkie: 'play',
    accentText: 'Scout',
    timer: Slide.SLIDE_DURATION,
  },
  {
    message: 'But what does Scouting mean?',
    sharkie: 'speak',
    accentText: 'Scouting',
    timer: Slide.SLIDE_DURATION,
  },
  {
    message:
      'Scouting is when a manager studies new players to see how well they play!',
    sharkie: 'speak',
    accentText: 'Scouting',
    timer: Slide.SLIDE_DURATION,
  },
  {
    message:
      'Then the manager can decide which players they want to sign to their team!',
    sharkie: 'speak',
    timer: Slide.SLIDE_DURATION,
  },
  {
    message: 'To sign them the manager has to offer them money.',
    sharkie: 'speak',
    timer: Slide.SLIDE_DURATION,
  },
  {
    message:
      'If a manager really likes a player, they can offer them more money to sign them!',
    sharkie: 'speak',
    timer: Slide.SLIDE_DURATION,
  },
  {
    message:
      'But if a manager does not offer them enough money, then the player can say no.',
    sharkie: 'speak',
    timer: Slide.SLIDE_DURATION,
  },
  {
    message:
      'So when Scouting, a manager has to be careful in deciding which players they like...',
    sharkie: 'speak',
    accentText: 'Scouting',
    timer: Slide.SLIDE_DURATION,
  },
  {
    message: 'And how much money to give them to join their team!',
    sharkie: 'speak',
    timer: Slide.SLIDE_DURATION,
  },
  {
    message: 'Do you understand what Scouting is?',
    sharkie: 'speak',
    accentText: 'Scouting',
    timer: 0,
    hasButtons: true,
    repeatIndex: 0,
  },
  {
    message: 'Cool! Let me show you how its done!',
    sharkie: 'speak',
    timer: Slide.SLIDE_DURATION,
    exitActions: [
      {
        type: SET_ANIMATION_STATE,
        payload: {
          page: 'scout',
          animationStates: [
            {
              component: 'newPlayersBoard',
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
    message: 'These are all the new players!',
    sharkie: 'speak',
    small: true,
    timer: Slide.SLIDE_DURATION,
    slideAnimate: {
      y: '50%',
      x: '58%',
    },
  },
  {
    message: "They don't have a contract value yet!",
    sharkie: 'speak',
    small: true,
    timer: Slide.SLIDE_DURATION,
    slideAnimate: {
      y: '50%',
      x: '58%',
    },
  },
  {
    message:
      'You have to decide how much money you want to offer them in their contract.',
    sharkie: 'speak',
    small: true,
    timer: Slide.SLIDE_DURATION,
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
              component: 'newPlayersBoard',
              state: {
                scale: 1,
                opacity: 0.5,
                borderColor: '#4b4b4b',
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
    message: 'There are 3 levels.',
    sharkie: 'speakInverse',
    small: true,
    timer: Slide.SLIDE_DURATION,
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
    message: 'Each level has a different dollar value!',
    sharkie: 'speakInverse',
    small: true,
    timer: Slide.SLIDE_DURATION,
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
      'Players will be offered the dollar value in the level they are placed in.',
    sharkie: 'speakInverse',
    small: true,
    timer: Slide.SLIDE_DURATION,
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
      'You can look at their rank to see how good they are for your team!',
    sharkie: 'speakInverse',
    small: true,
    timer: Slide.SLIDE_DURATION,
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
    message: 'And drag them into the level you choose.',
    sharkie: 'speakInverse',
    small: true,
    timer: Slide.SLIDE_DURATION,
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
    message:
      'Once you are finished you can pick the players you want to sign on the sign page.',
    sharkie: 'speakInverse',
    small: true,
    timer: Slide.SLIDE_DURATION,
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
    message: 'Click here when you are finished!',
    sharkie: 'speakInverse',
    small: true,
    timer: Slide.SLIDE_DURATION,
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
    message: 'Since there are only a few spots in a level...',
    sharkie: 'presentInverse',
    timer: Slide.SLIDE_DURATION,
    slideAnimate: {
      y: '0%',
      x: '0%',
    },
  },
  {
    message: 'Choose your players wisely!',
    sharkie: 'presentInverse',
    timer: Slide.SLIDE_DURATION,
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
            'newPlayersBoard',
            'moneyLevel1',
            'moneyLevel2',
            'moneyLevel3',
          ].map((c) => ({
            component: c,
            state: {
              opacity: 1,
            },
          })),
        },
      },
    ],
  },
];

export const scoutSlides = slideConfigs.map((c) => new Slide(c));
