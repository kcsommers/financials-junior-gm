import Slide from '../../Slide';
import { SET_ANIMATION_STATE } from '@redux/actionTypes';

const slideConfigs = [
  {
    message:
      'Your team rank tells you how well your team will play against other teams.',
    sharkie: 'speak',
    hasButtons: false,
    timer: Slide.SLIDE_DURATION,
    slideAnimate: {
      y: '50%',
    },
  },
  {
    message:
      'The higher your rank is, the better chance you will have to win the season!',
    sharkie: 'speak',
    hasButtons: false,
    slideAnimate: {
      y: '50%',
    },
    timer: Slide.SLIDE_DURATION,
  },
  {
    message: 'You can sign new players to improve your team rank!',
    sharkie: 'speak',
    hasButtons: false,
    repeatIndex: 0,
    slideAnimate: {
      y: '50%',
    },
    timer: Slide.SLIDE_DURATION,
    exitActions: [
      {
        type: SET_ANIMATION_STATE,
        payload: {
          page: 'home',
          animationStates: [
            {
              component: 'teamRankCard',
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
              component: 'budgetCard',
              state: {
                scale: 1.5,
                y: '15%',
                opacity: 1,
                zIndex: 2,
                transition: { delay: 0.5, duration: 1 },
              },
            },
          ],
        },
      },
    ],
  },
];

export const teamRankSlides = slideConfigs.map((c) => new Slide(c));
