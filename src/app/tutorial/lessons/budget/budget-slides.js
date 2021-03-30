import Slide from '../../Slide';
import { SET_ANIMATION_STATE } from '../../../redux/tutorials/tutorials.actions';

const slideConfigs = [
  {
    message: 'Welcome to your Budget!',
    sharkie: 'speak',
    timer: 0,
    hasButtons: true,
    accentText: 'Budget',
  },
  {
    message: 'In hockey, every team has some money to spend on players.',
    sharkie: 'speak',
    hasButtons: true,
    timer: 0,
  },
  {
    message:
      'You have to make a plan on how to spend your money. This plan is called a budget',
    sharkie: 'speak',
    hasButtons: true,
    timer: 0,
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
    timer: 0,
    hasButtons: true,
    slideAnimate: {
      y: '50%',
    },
  },
  {
    message: 'Your total budget is the money you have to make your budget.',
    sharkie: 'speak',
    hasButtons: true,
    timer: 0,
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
    timer: 0,
    hasButtons: true,
  },
  {
    message:
      'Your savings are used for emergencies like an injured player or to save up to sign a really good player.',
    sharkie: 'speak',
    accentText: 'savings',
    timer: 0,
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
    timer: 0,
    hasButtons: true,
    accentText: 'spending budget',
  },
  {
    message:
      'Move the yellow puck to the right, so you have $14 to spend on signing players.',
    sharkie: 'speak',
    timer: 0,
    hasButtons: true,
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
                zIndex: 1,
              },
            },
          ],
        },
      },
    ],
  },
  {
    message:
      'Good job! Now move the yellow puck to the left, so you have $3 in savings for signing extra players, in case you lose a few players.',
    sharkie: 'speak',
    timer: 0,
    hasButtons: true,
  },
  {
    message:
      'Awesome! Now move the puck to the left, so you have one extra dollar to save for the next season to add to your total budget. You should have $4 of savings.',
    sharkie: 'speak',
    timer: 0,
    hasButtons: true,
  },
  {
    message:
      'You just made your first budget! If you have any more questions about your budget, click on the call S.J. Sharkie button.',
    sharkie: 'speak',
    hasButtons: true,
    timer: 0,
  },
  {
    message:
      'Click on the blue budget hockey stick when you are done exploring the budget page.',
    sharkie: 'speak',
    hasButtons: true,
    timer: 0,
  },
];

export const budgetSlides = slideConfigs.map((c) => new Slide(c));
