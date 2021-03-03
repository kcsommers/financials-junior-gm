import Slide from '../../Slide';

const slideConfigs = [
  {
    message:
      'Hello, my name is S.J. Sharkie. Welcome to our arena, the SAP Center!',
    sharkie: 'play',
    hasButtons: true,
  },
  {
    message:
      "I want to offer you the job to become the San Jose Jr.Sharks' new general manager.",
    sharkie: 'play',
    hasButtons: true,
  },
  {
    message: 'So what does a general manager do?',
    sharkie: 'play',
    hasButtons: true,
  },
  {
    message:
      'The general manager is in charge of spending money to sign players to play for their team.',
    sharkie: 'play',
    hasButtons: true,
  },
  {
    message:
      "You first need to make a plan on how to spend your team's money. This plan is called a Budget.",
    sharkie: 'play',
    hasButtons: true,
    accentText: 'Budget',
  },
  {
    message:
      'Click on the budget hockey stick to learn how to create a budget.',
    sharkie: 'play',
    hasButtons: true,
  },
];

export const homeSlides = slideConfigs.map((c) => new Slide(c));
