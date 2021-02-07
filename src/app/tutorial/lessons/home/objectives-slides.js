import Slide from '../../Slide';
import { SET_ANIMATION_STATE } from '@redux/actionTypes';

const slideConfigs = [
  {
    message: 'This is the objectives board!',
    sharkie: 'play',
    hasButtons: false,
    timer: Slide.SLIDE_DURATION + 1000,
    y: '60%',
    bubbleDelay: 500,
  },
  {
    message:
      'Each objective will tell you what you need to do to take care of your team',
    sharkie: 'play',
    hasButtons: false,
    timer: Slide.SLIDE_DURATION,
    y: '60%',
  },
  {
    message: 'Got it?',
    sharkie: 'play',
    hasButtons: true,
    repeatIndex: 0,
    timer: 0,
    y: '60%',
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
                opacity: [null, 0.5],
                transition: {
                  delay: 0,
                  duration: 1,
                  times: [0, 1],
                  zIndex: {
                    delay: 1,
                  },
                },
              },
            },
            {
              component: 'teamRank',
              state: {
                scale: 1.5,
                zIndex: 1001,
                y: '15%',
                opacity: 1,
                transition: { delay: 0.5, duration: 1 },
              },
            },
          ],
        },
      },
    ],
  },
];

export const objectivesSlides = slideConfigs.map((c) => new Slide(c));
