import Slide from '../Slide';

const slideConfigs = [
  {
    message: 'Signing new players to improve your team rank will cost money.',
    sharkie: 'speakInverse',
    hasButtons: false,
    timer: Slide.SLIDE_DURATION,
  },
  {
    message: 'This is the money that you have left to spend on your team.',
    sharkie: 'speakInverse',
    hasButtons: false,
    timer: Slide.SLIDE_DURATION,
  },
  {
    message:
      'Your goal is to build a winning team without running out of money.',
    sharkie: 'playInverse',
    hasButtons: false,
    repeatIndex: 0,
    timer: Slide.SLIDE_DURATION,
  },
];

export default slideConfigs.map((c) => new Slide(c));
