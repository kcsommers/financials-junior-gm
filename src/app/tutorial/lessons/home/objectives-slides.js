import Slide from '../../Slide';
import { SET_ANIMATION_STATE } from '@redux/actions';

const slideConfigs = [
  {
    message: 'This is the objectives board!',
    sharkie: 'play',
    hasButtons: true,
    timer: 0,
    slideAnimate: {
      y: '60%',
    },
    bubbleDelay: 500,
  },
  {
    message:
      'Each objective will tell you what you need to do to take care of your team',
    sharkie: 'play',
    hasButtons: true,
    timer: 0,
    slideAnimate: {
      y: '60%',
    },
  },
  {
    message: 'Got it?',
    sharkie: 'play',
    hasButtons: true,
    repeatIndex: 0,
    timer: 0,
    slideAnimate: {
      y: '60%',
    },
    exitActions: [
      {
        type: SET_ANIMATION_STATE,
        payload: {
          page: 'home',
          animationStates: [
            {
              component: 'objectivesBoard',
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
              component: 'teamRankCard',
              state: {
                scale: 1.5,
                y: '15%',
                opacity: 1,
                transition: { delay: 0.5, duration: 1 },
                zIndex: 1002,
              },
            },
          ],
        },
      },
    ],
  },
];

export const objectivesSlides = slideConfigs.map((c) => new Slide(c));
