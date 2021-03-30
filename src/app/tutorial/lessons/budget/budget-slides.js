import Slide from '../../Slide';
import { SET_ADVANCE_LISTENER, SET_ANIMATION_STATE } from '@redux/actions';

const slideConfigs = [
  {
    message: 'Welcome to your Budget!',
    sharkie: 'speak',
    hasButtons: true,
    accentText: 'Budget',
  },
  {
    message: 'In hockey, every team has some money to spend on players.',
    sharkie: 'speak',
    hasButtons: true,
  },
  {
    message:
      'You have to make a plan on how to spend your money. This plan is called a budget',
    sharkie: 'speak',
    hasButtons: true,
    exitActions: [
      {
        type: SET_ANIMATION_STATE,
        payload: {
          page: 'budget',
          animationStates: [
            {
              component: 'equationBoard',
              state: {
                scale: 1.1,
                zIndex: 1000,
              },
            },
            {
              component: 'total',
              state: {
                scale: 1.2,
                color: '#ffd782',
              },
            },
          ],
        },
      },
    ],
  },
  {
    message: 'This is your total budget.',
    sharkie: 'speak',
    accentText: 'total budget',
    hasButtons: true,
    slideAnimate: {
      y: '50%',
    },
  },
  {
    message: 'Your total budget is the money you have to make your budget.',
    sharkie: 'speak',
    hasButtons: true,
    exitActions: [
      {
        type: SET_ANIMATION_STATE,
        payload: {
          page: 'budget',
          animationStates: [
            {
              component: 'total',
              state: {
                scale: 1,
                color: '#fff',
              },
            },
            {
              component: 'savings',
              state: {
                scale: 1.2,
                color: '#ffd782',
              },
            },
          ],
        },
      },
    ],
  },
  {
    message: 'This is your savings.',
    sharkie: 'speak',
    accentText: 'savings',
    hasButtons: true,
  },
  {
    message:
      'Your savings are used for emergencies like an injured player or to save up to sign a really good player.',
    sharkie: 'speak',
    accentText: 'savings',
    hasButtons: true,
    exitActions: [
      {
        type: SET_ANIMATION_STATE,
        payload: {
          page: 'budget',
          animationStates: [
            {
              component: 'savings',
              state: {
                scale: 1,
                color: '#fff',
              },
            },
            {
              component: 'spending',
              state: {
                scale: 1.2,
                color: '#ffd782',
              },
            },
          ],
        },
      },
    ],
  },
  {
    message:
      "What's left is your spending budget. It is the money you have to sign players.",
    sharkie: 'speak',
    hasButtons: true,
    accentText: 'spending budget',
    exitActions: [
      {
        type: SET_ANIMATION_STATE,
        payload: {
          page: 'budget',
          animationStates: [
            {
              component: 'spending',
              state: {
                scale: 1,
                color: '#fff',
              },
            },
            {
              component: 'equationBoard',
              state: {
                scale: 1,
              },
            },
            {
              component: 'slider',
              state: {
                scale: 1.1,
                zIndex: 1,
              },
            },
          ],
        },
      },
      {
        type: SET_ADVANCE_LISTENER,
        payload: (sliderValue) => {
          return sliderValue === 1;
        },
      },
    ],
  },
  {
    message:
      'Move the yellow puck to the right, so you have $14 to spend on signing players.',
    sharkie: 'speakInverse',
    small: true,
    slideAnimate: {
      y: '0%',
      x: '-58%',
    },
    exitActions: [
      {
        type: SET_ANIMATION_STATE,
        payload: {
          page: 'budget',
          animationStates: [
            {
              component: 'savingsIndicator',
              state: {
                opacity: [0.5, 0.5, 1],
                times: [0, 2.75, 3],
                transition: {
                  duration: 3,
                },
              },
            },
          ],
        },
      },
      {
        type: SET_ADVANCE_LISTENER,
        payload: (sliderValue) => {
          return sliderValue === 3;
        },
      },
    ],
  },
  {
    message:
      'Good job! Now move the yellow puck to the left so you have $3 in savings for signing extra players, in case you lose a few players.',
    sharkie: 'speakInverse',
    small: true,
    slideAnimate: {
      y: '0%',
      x: '-58%',
    },
    exitActions: [
      {
        type: SET_ANIMATION_STATE,
        payload: {
          page: 'budget',
          animationStates: [
            {
              component: 'savingsIndicator',
              state: {
                opacity: [0.5, 0.5, 1],
                times: [0, 2.75, 3],
                transition: {
                  duration: 3,
                },
              },
            },
          ],
        },
      },
      {
        type: SET_ADVANCE_LISTENER,
        payload: (sliderValue) => {
          return sliderValue === 4;
        },
      },
    ],
  },
  {
    message:
      'Awesome! Now move the puck to the left so you have one extra dollar to save for the next season to add to your total budget. You should have $4 of savings.',
    sharkie: 'speakInverse',
    small: true,
    slideAnimate: {
      y: '0%',
      x: '-58%',
    },
    exitActions: [
      {
        type: SET_ANIMATION_STATE,
        payload: {
          page: 'budget',
          animationStates: [
            {
              component: 'equationBoard',
              state: {
                opacity: 0.5,
              },
            },
            {
              component: 'slider',
              state: {
                scale: 1,
                opacity: 0.5,
              },
            },
          ],
        },
      },
    ],
  },
  {
    message:
      'You just made your first budget! If you have any more questions about your budget, click on the call S.J. Sharkie button.',
    sharkie: 'speak',
    hasButtons: true,
    slideAnimate: {
      y: '0%',
      x: '0%',
    },
  },
  {
    message:
      'Click on the blue budget hockey stick when you are done exploring the budget page.',
    sharkie: 'speak',
    hasButtons: true,
    exitActions: [
      {
        type: SET_ANIMATION_STATE,
        payload: {
          page: 'budget',
          animationStates: [
            {
              component: 'equationBoard',
              state: {
                opacity: 1,
                zIndex: 0,
              },
            },
            {
              component: 'slider',
              state: {
                opacity: 1,
              },
            },
          ],
        },
      },
    ],
  },
];

export const budgetSlides = slideConfigs.map((c) => new Slide(c));
