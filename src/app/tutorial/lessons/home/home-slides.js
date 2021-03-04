import Slide from '../../Slide';

const introSlideConfigs = [
  {
    message:
      'Hello, my name is S.J. Sharkie. Welcome to our arena, the SAP Center!',
    sharkie: 'play',
    hasButtons: true,
  },
  {
    message:
      "I want to offer you the job to become the San Jose Jr. Sharks' new general manager.",
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
      'Click on the Budget hockey stick to learn how to create a budget.',
    sharkie: 'play',
    hasButtons: true,
    accentText: 'Budget',
  },
];

const transitionSlidesTeamConfigs = [
  {
    message: 'You have learned about how to plan your budget!',
    sharkie: 'speak',
    hasButtons: true,
  },
  {
    message:
      'Click on the Team hockey stick to learn how to spend the money in your budget to sign players.',
    sharkie: 'speak',
    hasButtons: true,
    accentText: 'Team',
  },
];

const transitionSlidesSeasonConfigs = [
  {
    message:
      'Great! You have now built a team, and you are ready for the season.',
    sharkie: 'speak',
    hasButtons: true,
  },
  {
    message: 'Click on the Season hockey stick to start competing!',
    sharkie: 'speak',
    hasButtons: true,
    accentText: 'Season',
  },
];

export const introSlides = introSlideConfigs.map((c) => new Slide(c));
export const transitionSlidesTeam = transitionSlidesTeamConfigs.map(
  (c) => new Slide(c)
);
export const transitionSlidesSeason = transitionSlidesSeasonConfigs.map(
  (c) => new Slide(c)
);
