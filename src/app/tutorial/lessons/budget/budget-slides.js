import Slide from '../../Slide';
import { SET_ANIMATION_STATE } from '@redux/actionTypes';

const slideConfigs = [
  {
    message: 'Hello again! Welcome to your Budget!',
    sharkie: 'speak',
    timer: Slide.SLIDE_DURATION,
    accentText: 'Budget',
  },
  {
    message: 'Teams get money from selling tickets to their fans!',
    sharkie: 'speak',
    timer: Slide.SLIDE_DURATION,
  },
  {
    message: 'This money is used to pay the players.',
    sharkie: 'speak',
    timer: Slide.SLIDE_DURATION,
  },
  {
    message: 'You have to create a plan on how to spend your money.',
    sharkie: 'speak',
    timer: Slide.SLIDE_DURATION,
  },
  {
    message: 'This plan is called a Budget.',
    sharkie: 'speak',
    timer: Slide.SLIDE_DURATION,
    accentText: 'Budget',
  },
  {
    message: 'So now do you know what a Budget is?',
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
                zIndex: 1,
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
    timer: Slide.SLIDE_DURATION,
    slideAnimate: {
      y: '50%',
    },
  },
  {
    message: 'This is the total amount of money you have to create a budget.',
    sharkie: 'speak',
    timer: Slide.SLIDE_DURATION,
  },
  {
    message: 'It is divided into two parts',
    sharkie: 'speak',
    timer: Slide.SLIDE_DURATION,
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
    message: 'Your Spending Budget',
    sharkie: 'speak',
    accentText: 'Spending Budget',
    timer: Slide.SLIDE_DURATION,
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
    message: 'And your Savings',
    sharkie: 'speak',
    timer: Slide.SLIDE_DURATION,
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
    message: 'Spending budget is what you use to sign players.',
    sharkie: 'speak',
    timer: Slide.SLIDE_DURATION,
    accentText: 'Spending budget',
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
    message: 'Savings is the money you put away for emergencies.',
    sharkie: 'speak',
    timer: Slide.SLIDE_DURATION,
    accentText: 'Savings',
  },
  {
    message: 'So why do we need Savings?',
    sharkie: 'speak',
    timer: Slide.SLIDE_DURATION,
    accentText: 'Savings',
  },
  {
    message: 'Imagine if you spent all your money on signing players.',
    sharkie: 'speak',
    timer: Slide.SLIDE_DURATION,
  },
  {
    message: 'If a player got hurt...',
    sharkie: 'speak',
    timer: Slide.SLIDE_DURATION,
  },
  {
    message: 'You would not have any money left to find a replacement.',
    sharkie: 'speak',
    timer: Slide.SLIDE_DURATION,
  },
  {
    message: 'But if you saved some money...',
    sharkie: 'speak',
    timer: Slide.SLIDE_DURATION,
  },
  {
    message: 'You could use your savings to find a replacement player.',
    sharkie: 'speak',
    timer: Slide.SLIDE_DURATION,
  },
  {
    message:
      'So its a good idea that for every 10 dollars of your total budget',
    sharkie: 'speak',
    timer: Slide.SLIDE_DURATION,
  },
  {
    message: 'Try to save a dollar or two.',
    sharkie: 'speak',
    timer: Slide.SLIDE_DURATION,
  },
  {
    message: "If you don't use any of your savings",
    sharkie: 'speak',
    timer: Slide.SLIDE_DURATION,
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
    message: 'Then you could add it to your total budget for the next season!',
    sharkie: 'speak',
    timer: Slide.SLIDE_DURATION,
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
          ],
        },
      },
    ],
  },
  {
    message: 'So do you know the two parts of your budget?',
    sharkie: 'speak',
    hasButtons: true,
    repeatIndex: 0,
  },
  {
    message: 'Cool!',
    sharkie: 'speak',
    timer: Slide.SLIDE_DURATION,
    exitActions: [
      {
        type: SET_ANIMATION_STATE,
        payload: {
          page: 'budget',
          animationStates: [
            {
              component: 'board',
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

export const budgetSlides = slideConfigs.map((c) => new Slide(c));
