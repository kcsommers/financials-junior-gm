import Slide from '../../Slide';
import { SET_ANIMATION_STATE, TOGGLE_MODAL } from '@redux/actionTypes';
import { PlayerCard } from '@components';

const slideConfigs = [
  {
    message: 'Welcome to your team!',
    sharkie: 'speakInverse',
    hasButtons: false,
    timer: Slide.SLIDE_DURATION,
    y: '63%',
    x: '-63%',
    small: true,
    exitActions: [
      {
        type: SET_ANIMATION_STATE,
        payload: {
          page: 'team',
          animationStates: [
            {
              component: 'playerCard',
              state: {
                highlight: true,
              },
            },
          ],
        },
      },
    ],
  },
  {
    message: 'These are the players in your squad.',
    sharkie: 'speakInverse',
    hasButtons: false,
    timer: Slide.SLIDE_DURATION,
    small: true,
    y: '63%',
    x: '-63%',
  },
  {
    message: 'Tapping a player will reveal more about them.',
    sharkie: 'speakInverse',
    hasButtons: false,
    timer: Slide.SLIDE_DURATION,
    small: true,
    y: '63%',
    x: '-63%',
    exitActions: [
      {
        type: TOGGLE_MODAL,
        payload: {
          isOpen: true,
          template: <PlayerCard inModal={true} tutorialActive={true} />,
          tutorialActive: true,
        },
      },
      {
        type: SET_ANIMATION_STATE,
        payload: {
          page: 'team',
          animationStates: [
            {
              component: 'playerCard',
              state: {
                highlight: false,
              },
            },
          ],
        },
      },
    ],
  },
];

export const playersSlides = slideConfigs.map((c) => new Slide(c));
