import Slide from '../../Slide';
import { SET_ANIMATION_STATE } from '@redux/actionTypes';

const slideConfigs = [
  {
    message: 'Signing new players to improve your team rank will cost money.',
    sharkie: 'speakInverse',
    hasButtons: false,
    slideAnimate: {
      y: '50%',
    },
    timer: Slide.SLIDE_DURATION,
  },
  {
    message: 'This is the money that you have left to spend on your team.',
    sharkie: 'speakInverse',
    hasButtons: false,
    slideAnimate: {
      y: '50%',
    },
    timer: Slide.SLIDE_DURATION,
  },
  {
    message:
      'Your goal is to build a winning team without running out of money.',
    sharkie: 'playInverse',
    hasButtons: false,
    repeatIndex: 0,
    slideAnimate: {
      y: '50%',
    },
    timer: Slide.SLIDE_DURATION,
  },
  {
    message: 'Got it?',
    sharkie: 'playInverse',
    hasButtons: true,
    repeatIndex: 0,
    timer: 0,
    slideAnimate: {
      y: '50%',
    },
    exitActions: [
      {
        type: SET_ANIMATION_STATE,
        payload: {
          page: 'home',
          animationStates: [
            {
              component: 'budgetCard',
              state: {
                scale: 1,
                y: '0%',
                opacity: 0.6,
                transition: {
                  delay: 0,
                  duration: 1,
                },
              },
            },
            {
              component: 'teamStick',
              state: {
                scale: [1, 1, 1, 1.2],
                y: ['-200%', '0%', '0%', '-33%'],
                x: ['0%', '0%', '0%', '5%'],
                times: [0, 0.5, 1.5, 2],
                opacity: 1,
                zIndex: 1002,
                transition: {
                  delay: 0.5,
                  duration: 2,
                },
              },
            },
          ],
        },
      },
    ],
  },
];

export const moneyLeftSlides = slideConfigs.map((c) => new Slide(c));
