import { Player } from './players';

export type Market = {
  forwards: Player[];
  defense: Player[];
  goalies: Player[];
  scout: {
    levelOne: Player[];
    levelTwo: Player[];
    levelThree: Player[];
    available: Player[];
  };
  offeredScout: {
    forwards: Player[];
    defense: Player[];
    goalies: Player[];
  };
};
