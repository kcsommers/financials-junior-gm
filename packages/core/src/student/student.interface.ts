import { User } from '../auth/users/user.interface';
import { Player } from '../game/players/players';
import { ObjectiveNames } from '../game/objectives/objectives';
import { GamePage } from '../game/game-page.type';

export interface Student extends User {
  firstName: string;
  lastName: string;
  totalBudget: string | number;
  savingsBudget: string | number;
  timeSpent: string;
  fOne: Player;
  fTwo: Player;
  fThree: Player;
  dOne: Player;
  dTwo: Player;
  gOne: Player;
  benchOne: Player;
  benchTwo: Player;
  benchThree: Player;
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
