import Slide from '../../Slide';
import { SET_ANIMATION_STATE, TOGGLE_OVERLAY } from '@redux/actionTypes';

const slideConfigs = [
  {
    message: 'Welcome to your season!',
    sharkie: 'speakInverse',
    hasButtons: false,
    timer: Slide.SLIDE_DURATION,
    slideAnimate: {
      y: '63%',
      x: '-63%',
    },
    small: true,
    transparentBg: true,
  },
];

export const seasonSlides = slideConfigs.map((c) => new Slide(c));
