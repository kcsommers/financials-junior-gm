import { IPlayer } from '../../players';

export interface IStudent {
  firstName: string;
  lastName: string;
  totalBudget: string;
  savingsBudget: string;
  timeSpent: string;
  fOne: IPlayer;
  fTwo: IPlayer;
  fThree: IPlayer;
  dOne: IPlayer;
  dTwo: IPlayer;
  gOne: IPlayer;
  benchOne: IPlayer;
  benchTwo: IPlayer;
  benchThree: IPlayer;
  rollOverBudget: number;
  tutorial: boolean;
  level: string;
  // seasons: {
  //   type: Array;
  // };
  // players: {
  //   type: [Schema];
  // };
  // tutorials: {
  //   home: Boolean;
  //   budget: Boolean;
  //   scout: Boolean;
  //   team: Boolean;
  //   season: Boolean;
  // };
  // gameBlock: {
  //   type: String;
  //   default: '0';
  // };
  // awards: {
  //   type: Array;
  //   default: [];
  // };
  // objectives: {
  //   type: Object;
  //   default: {};
  // };
}
