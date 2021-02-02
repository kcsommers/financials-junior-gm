import Slide from '../Slide';
import { SET_ANIMATION_STATE } from './../../redux/actionTypes';

const slideConfigs = [
  {
    message: 'This is the objectives board!',
    sharkie: 'play',
    hasButtons: false,
    timer: Slide.SLIDE_DURATION + 1000,
    y: '60%',
    bubbleDelay: 500,
    actions: [
      {
        type: SET_ANIMATION_STATE,
        payload: {
          page: 'home',
          component: 'objectivesBoard',
          state: {
            scale: 1.5,
            zIndex: 1,
            y: '15%',
            opacity: 1,
            transition: { delay: 0.5, duration: 1 },
          },
        },
      },
    ],
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
    onCompleteAction: {
      type: SET_ANIMATION_STATE,
      payload: {
        page: 'home',
        component: 'objectivesBoard',
        state: {
          scale: 1,
          zIndex: 0,
          y: '0%',
          opacity: 1,
          transition: { duration: 1, zIndex: { delay: 1 } },
        },
      },
    },
  },
];

export default slideConfigs.map((c) => new Slide(c));
