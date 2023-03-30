import { TutorialSlide } from '@statrookie/core/src/tutorial/tutorial-slide';
import { v4 as uuid } from 'uuid';
import { mascotConfigs } from '../mascot-configs';

export const homeSlides: TutorialSlide[] = [
  {
    id: uuid(),
    textComponent: (
      <p className="text-4xl">
        Hello, my name is S.J. Sharkie. Welcome to our arena, the SAP Center!
      </p>
    ),
    mascotConfig: mascotConfigs.sharkiePlay,
  },
  {
    id: uuid(),
    textComponent: (
      <p className="text-4xl">
        I want to offer you the job to become the{' '}
        <span className="text-secondary-2">San Jose Jr. Sharks'</span> new
        general manager.
      </p>
    ),
    mascotConfig: mascotConfigs.sharkiePlay,
  },
  {
    id: uuid(),
    textComponent: (
      <p className="text-4xl">So what does a general manager do?</p>
    ),
    mascotConfig: mascotConfigs.sharkiePlay,
  },
  {
    id: uuid(),
    textComponent: (
      <p className="text-4xl">
        The general manager is in charge of spending money to sign players to
        play for their team.
      </p>
    ),
    mascotConfig: mascotConfigs.sharkiePlay,
  },
  {
    id: uuid(),
    textComponent: (
      <p className="text-4xl">
        You first need to make a plan on how to spend your team's money. This
        plan is called a <span className="text-secondary-2">Budget</span>.
      </p>
    ),
    mascotConfig: mascotConfigs.sharkiePlay,
  },
  {
    id: uuid(),
    textComponent: (
      <p className="text-4xl">
        Click on the <span className="text-secondary-2">Budget</span> hockey
        stick to learn how to create a budget.
      </p>
    ),
    mascotConfig: mascotConfigs.sharkiePlay,
  },
];

export const teamTransitionSlides: TutorialSlide[] = [
  {
    id: uuid(),
    textComponent: (
      <p className="text-4xl">
        You have learned about how to plan your budget!
      </p>
    ),
    mascotConfig: mascotConfigs.sharkieSpeak,
  },
  {
    id: uuid(),
    textComponent: (
      <p className="text-4xl">
        Click on the <span className="text-secondary-2">Team</span> hockey stick
        to learn how to spend the money in your budget to sign players.
      </p>
    ),
    mascotConfig: mascotConfigs.sharkieSpeak,
  },
];

export const seasonTransitionSlides = [
  {
    id: uuid(),
    textComponent: (
      <p className="text-4xl">
        Great! You have now built a team, and you are ready for the season.
      </p>
    ),
    mascotConfig: mascotConfigs.sharkieSpeak,
  },
  {
    id: uuid(),
    textComponent: (
      <p className="text-4xl">
        Click on the Season hockey stick to start competing!
      </p>
    ),
    mascotConfig: mascotConfigs.sharkieSpeak,
  },
];
