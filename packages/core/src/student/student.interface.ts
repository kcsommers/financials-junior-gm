import { User } from '../auth/users/user.interface';
import { Player } from '../game/teams/players';
import { ObjectiveNames } from '../game/objectives/objectives';
import { GamePage } from '../game/game-page.type';

export interface Student extends User {
  firstName: string;
  lastName: string;
  totalBudget: string | number;
  savingsBudget: string | number;
  timeSpent: string;
  fOne: string;
  fTwo: string;
  fThree: string;
  dOne: string;
  dTwo: string;
  gOne: string;
  benchOne: string;
  benchTwo: string;
  benchThree: string;
  rollOverBudget: number | number;
  tutorial: boolean;
  level: string;
  wonGame: boolean;
  // seasons: {
  //   type: Array;
  // };
  players: Player[];
  pagesVisited: GamePage[];
  tutorials: {
    home: boolean;
    budget: boolean;
    scout: boolean;
    team: boolean;
    season: boolean;
  };
  // gameBlock: {
  //   type: String;
  //   default: '0';
  // };
  // awards: {
  //   type: Array;
  //   default: [];
  // };
  objectives: { [key in ObjectiveNames]: boolean };
}
