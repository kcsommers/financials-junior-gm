import Slide from '../Slide';

const confirmActions = {};

export const getConfirmSlides = (page) => {
  return [
    {
      message: 'Hey there! Would you like to watch a tutorial?',
      sharkie: 'speak',
      hasButtons: true,
      canCancel: true,
      exitActions: confirmActions[page],
    },
  ].map((c) => new Slide(c));
};
