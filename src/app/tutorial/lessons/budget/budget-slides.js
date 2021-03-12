import Slide from '../../Slide';
import { SET_ANIMATION_STATE } from '../../../redux/tutorials/tutorials.actions';

const slideConfigs = [
  {
    message: 'Hello again! Welcome to your Budget!',
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
    message: 'You have to create a plan on how to spend your money.',
    sharkie: 'speak',
    hasButtons: true,
    timer: 0,
  },
  {
    message: 'This plan is called a Budget.',
    sharkie: 'speak',
    accentText: 'Budget',
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
    message: 'This is your Total Budget.',
    sharkie: 'speak',
    accentText: 'Total Budget',
    timer: 0,
    hasButtons: true,
    slideAnimate: {
      y: '50%',
    },
  },
  {
    message: 'This is the total amount of money you have to create a budget.',
    sharkie: 'speak',
    hasButtons: true,
    timer: 0,
  },
  {
    message: 'It is divided into two parts.',
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
              component: 'total',
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
    message: 'The first part of your budget is your Spending budget.',
    sharkie: 'speak',
    accentText: 'Spending',
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
    message: 'The second part of your budget is your Savings.',
    sharkie: 'speak',
    timer: 0,
    hasButtons: true,
    accentText: 'Savings',
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
    message: 'Your spending money is what you use to sign players.',
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
    message: 'Your savings is the money you put away for emergencies.',
    sharkie: 'speak',
    timer: 0,
    hasButtons: true,
  },
  {
    message: 'So why do you need Savings?',
    sharkie: 'speak',
    timer: 0,
    hasButtons: true,
    accentText: 'Savings',
  },
  {
    message: 'Imagine if you spent all your money on signing players.',
    sharkie: 'speak',
    hasButtons: true,
    timer: 0,
  },
  {
    message: 'If a player got injured...',
    sharkie: 'speak',
    hasButtons: true,
    timer: 0,
  },
  {
    message: "You wouldn't have any money left to find a replacement player.",
    sharkie: 'speak',
    hasButtons: true,
    timer: 0,
  },
  {
    message: 'But if you saved some money...',
    sharkie: 'speak',
    hasButtons: true,
    timer: 0,
  },
  {
    message: 'You could use your savings to find a replacement player.',
    sharkie: 'speak',
    hasButtons: true,
    timer: 0,
  },
  {
    message:
      'It is a good idea that for every $10 dollars of your total budget, try to save a dollar or two.',
    sharkie: 'speak',
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
          ],
        },
      },
    ],
  },
  {
    message: 'You should try to have savings left over after every season.',
    sharkie: 'speak',
    hasButtons: true,
  },
  {
    message: 'This money gets carried over to the next season.',
    sharkie: 'speak',
    hasButtons: true,
  },
  {
    message:
      'If you do this, after a couple of seasons you will be able to save up to sign some really good players!',
    sharkie: 'speak',
    hasButtons: true,
  },
  {
    message:
      'If you have more questions about your budget, click on the ask S.J. Sharkie button and choose the question you are looking for.',
    sharkie: 'speak',
    hasButtons: true,
  },
  {
    message:
      'Once you are done exploring the budget page, click on the blue hockey stick in the right hand corner that says Budget.',
    sharkie: 'speak',
    hasButtons: true,
    accentText: 'Budget',
  },
  {
    message: 'It will take you back to the home screen.',
    sharkie: 'speak',
    hasButtons: true,
  },
];

export const budgetSlides = slideConfigs.map((c) => new Slide(c));
