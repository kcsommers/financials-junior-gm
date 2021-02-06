import Slide from '../../Slide';
import { SET_ANIMATION_STATE } from '@redux/actionTypes';

const slideConfigs = [
  {
    message: 'Welcome to your team!',
    sharkie: 'speak',
    hasButtons: false,
    timer: Slide.SLIDE_DURATION,
    y: '50%',
    x: '-10%',
    exitActions: [
      {
        type: SET_ANIMATION_STATE,
        payload: {
          page: 'home',
          animationStates: [
            {
              component: 'playerCard',
              state: {
                highlight: true,
              },
            },
          ],
        },
      },
    ],
  },
  {
    message: 'These are the players in your squad.',
    sharkie: 'speak',
    hasButtons: false,
    timer: Slide.SLIDE_DURATION,
    y: '50%',
    x: '-10%',
  },
];

export const playersSlides = slideConfigs.map((c) => new Slide(c));
