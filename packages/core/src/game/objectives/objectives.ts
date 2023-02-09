export enum ObjectiveNames {
  LEARN_BUDGET = 'LEARN_BUDGET',
  FILL_TEAM = 'FILL_TEAM',
  PLAY_SEASON = 'PLAY_SEASON',
  SEASON_SCENARIO = 'SEASON_SCENARIO',
}

export type Objective = {
  name: ObjectiveNames;
  message: string;
  isUrgent: boolean;
  isComplete: boolean;
};

export const OBJECTIVES: Objective[] = [
  {
    name: ObjectiveNames.LEARN_BUDGET,
    message: 'Learn about your budget and adjust your savings.',
    isUrgent: false,
    isComplete: false,
  },
  {
    name: ObjectiveNames.FILL_TEAM,
    message: 'Fill your team by signing players.',
    isUrgent: false,
    isComplete: false,
  },
  {
    name: ObjectiveNames.PLAY_SEASON,
    message: 'Play the season!',
    isUrgent: false,
    isComplete: false,
  },
  {
    name: ObjectiveNames.SEASON_SCENARIO,
    message: 'Learn about your budget and adjust your savings.',
    isUrgent: false,
    isComplete: false,
  },
];
