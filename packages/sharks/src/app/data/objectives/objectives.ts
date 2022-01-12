export const Objectives = {
  LEARN_BUDGET: 'LEARN_BUDGET',

  FILL_TEAM: 'FILL_TEAM',

  PLAY_SEASON: 'PLAY_SEASON',

  SEASON_SCENARIO: 'SEASON_SCENARIO',
};

export class Objective {
  public isComplete = false;

  public id = Math.floor(Math.random() * 1000000);

  constructor(public objective, public type, public isUrgent = false) {
    this.objective = objective;
    this.isUrgent = isUrgent;
    this.type = type;
  }

  public setIsComplete(isComplete: boolean): void {
    this.isComplete = isComplete;
  }

  public setIsUrgent(isUrgent: boolean): void {
    this.isUrgent = isUrgent;
  }
}
