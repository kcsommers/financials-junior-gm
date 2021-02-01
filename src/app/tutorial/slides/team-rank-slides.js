import Slide from '../Slide';

const slideConfigs = [
  {
    message:
      'Your team rank tells you how well your team will play against other teams.',
    sharkie: 'speak',
    hasButtons: false,
    timer: Slide.SLIDE_DURATION,
  },
  {
    message:
      'The higher your rank is, the better chance you will have to win the season!',
    sharkie: 'speak',
    hasButtons: false,
    timer: Slide.SLIDE_DURATION,
  },
  {
    message: 'You can sign new players to improve you team rank!',
    sharkie: 'speak',
    hasButtons: false,
    repeatIndex: 0,
    timer: Slide.SLIDE_DURATION,
  },
];

export default slideConfigs.map((c) => new Slide(c));
