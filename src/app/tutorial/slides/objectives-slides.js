import Slide from '../Slide';

const slideConfigs = [
  {
    message: 'This is the objectives board!',
    sharkie: 'play',
    hasButtons: false,
    timer: Slide.SLIDE_DURATION,
    y: '60%',
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
  },
];

export default slideConfigs.map((c) => new Slide(c));
