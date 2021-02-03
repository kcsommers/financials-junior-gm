import Slide from '../Slide';
import { SET_ANIMATION_STATE } from './../../redux/actionTypes';

const slideConfigs = [
  {
    message: 'Signing new players to improve your team rank will cost money.',
    sharkie: 'speakInverse',
    hasButtons: false,
    y: '50%',
    timer: Slide.SLIDE_DURATION,
  },
  {
    message: 'This is the money that you have left to spend on your team.',
    sharkie: 'speakInverse',
    hasButtons: false,
    y: '50%',
    timer: Slide.SLIDE_DURATION,
  },
  {
    message:
      'Your goal is to build a winning team without running out of money.',
    sharkie: 'playInverse',
    hasButtons: false,
    repeatIndex: 0,
    y: '50%',
    timer: Slide.SLIDE_DURATION,
    exitActions: [
      {
        type: SET_ANIMATION_STATE,
        payload: {
          page: 'home',
          animationStates: [
            {
              component: 'moneyLeft',
              state: {
                scale: 1,
                zIndex: 0,
                y: '0%',
                opacity: [null, 0.75, 1],
                transition: {
                  delay: 0,
                  duration: 1,
                  times: [0, 0.1, 1],
                },
              },
            },
          ],
        },
      },
    ],
  },
];

export default slideConfigs.map((c) => new Slide(c));
