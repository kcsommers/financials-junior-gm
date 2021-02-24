import Slide from '../../Slide';
import { SET_ANIMATION_STATE } from '@redux/actions';

const slideConfigs = [
  {
    message:
      'Well done! Your team was in the top 3 of your season!',
    sharkie: 'speak',
    hasButtons: true,
    timer: 0,
    transparentBg: false,
  },
  {
    message:
      "Since you did a great job and you've been given a promotion!",
    sharkie: 'speak',
    hasButtons: true,
    timer: 0,
    transparentBg: false,
  },
  {
    message:
      "You will now be the general manager of the San Jose Barracuda!",
    sharkie: 'speak',
    accentText: '',
    hasButtons: true,
    timer: 0,
    transparentBg: false,
  },
  {
    message:
      "The Barracudas play in a higher league",
    sharkie: 'speak',
    hasButtons: true,
    timer: 0,
    transparentBg: false,
  },
  {
    message:
      "This means that you have a larger budget to start the season with!",
    sharkie: 'speak',
    accentText: '$100',
    hasButtons: true,
    timer: 0,
    transparentBg: false,
  },
  {
    message:
      "There are also new players you can sign with higher ranks",
    sharkie: 'speak',
    hasButtons: true,
    timer: 0,
    transparentBg: false,
  },
  {
    message:
      "But remember, higher ranked players usually have higher contract values...",
    sharkie: 'speak',
    hasButtons: true,
    timer: 0,
    transparentBg: false,
  },
  {
    message:
      "So you still have to be careful about managing your budget..",
    sharkie: 'speak',
    hasButtons: true,
    timer: 0,
    transparentBg: false,
  },
  {
    message:
      "by having Savings for when there are emergencies..",
    sharkie: 'speak',
    hasButtons: true,
    timer: 0,
    transparentBg: false,
  },

  {
    message:
      "We are confident that you can win the season with the Barracudas!",
    sharkie: 'speak',
    hasButtons: true,
    timer: 0,
    transparentBg: false,
  },
  {
    message:
      "Good Luck!",
    sharkie: 'speak',
    hasButtons: true,
    timer: 0,
    transparentBg: false,
  },
];

export const levelTwoSlides = slideConfigs.map((c) => new Slide(c));
