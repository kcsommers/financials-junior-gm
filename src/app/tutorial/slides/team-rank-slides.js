import Slide from '../Slide';
import { SET_ANIMATION_STATE } from './../../redux/actionTypes';

const slideConfigs = [
  {
    message:
      'Your team rank tells you how well your team will play against other teams.',
    sharkie: 'speak',
    hasButtons: false,
    timer: Slide.SLIDE_DURATION,
    y: '50%',
  },
  {
    message:
      'The higher your rank is, the better chance you will have to win the season!',
    sharkie: 'speak',
    hasButtons: false,
    y: '50%',
    timer: Slide.SLIDE_DURATION,
  },
  {
    message: 'You can sign new players to improve you team rank!',
    sharkie: 'speak',
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
              component: 'teamRank',
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
            {
              component: 'moneyLeft',
              state: {
                scale: 1.5,
                zIndex: 102,
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

export default slideConfigs.map((c) => new Slide(c));
