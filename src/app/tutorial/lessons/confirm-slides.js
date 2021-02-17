import Slide from '../Slide';
import { SET_ANIMATION_STATE } from '@redux/actionTypes';

const confirmActions = {
  home: [
    {
      type: SET_ANIMATION_STATE,
      payload: {
        page: 'home',
        animationStates: [
          {
            component: 'objectivesBoard',
            state: {
              scale: 1.5,
              y: '15%',
              opacity: 1,
              zIndex: 1001,
              transition: { duration: 1 },
            },
          },
        ],
      },
    },
  ],
};

export const getConfirmSlides = (page) => {
  return [
    {
      message: 'Hey there! Would you like to watch a tutoria!?',
      sharkie: 'speak',
      hasButtons: true,
      canCancel: true,
      exitActions: confirmActions[page],
    },
  ].map((c) => new Slide(c));
};
