import { GameResult } from '@statrookie/core/src/game/season/game-result';
import { User } from '../auth/users/user.interface';
import { GamePage } from '../game/game-page.type';
import { ObjectiveNames } from '../game/objectives/objectives';
import { SeasonAwards } from '../game/season/season-awards';
import { Player } from '../game/teams/players';

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
  rollOverBudget: number;
  tutorial: boolean;
  level: string | number;
  wonGame: boolean;
  seasons: GameResult[][];
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
  awards: SeasonAwards[];
  objectives: { [key in ObjectiveNames]?: boolean };
}
