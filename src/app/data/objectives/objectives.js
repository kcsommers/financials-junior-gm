export const Objectives = {
  LEARN_BUDGET: 'LEARN_BUDGET',

  FILL_TEAM: 'FILL_TEAM',

  PLAY_SEASON: 'PLAY_SEASON',

  SEASON_SCENARIO: 'SEASON_SCENARIO',
};

export class Objective {
  isComplete = false;

  constructor(objective, type, isUrgent = false) {
    this.id = Math.floor(Math.random() * 1000000);
    this.objective = objective;
    this.isUrgent = isUrgent;
    this.type = type;
  }

  setIsComplete(isComplete) {
    this.isComplete = isComplete;
  }

  setIsUrgent(isUrgent) {
    this.isUrgent = isUrgent;
  }
}
