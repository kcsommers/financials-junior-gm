export class Objective {
  isComplete = false;

  isUrgent = false;

  constructor(objective, isUrgent = false) {
    this.id = Math.floor(Math.random() * 1000000);
    this.objective = objective;
    this.isUrgent = isUrgent;
  }

  setIsComplete(isComplete) {
    this.isComplete = isComplete;
  }

  setIsUrgent(isUrgent) {
    this.isUrgent = isUrgent;
  }
}
