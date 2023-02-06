import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getRandomTeamRank,
  getRandomStat,
  getStandings,
  getAllOpponents,
  getStudentTeam,
} from '@data/season/season-utils';

export interface ISeasonState {
  allOpponents: any;
  completedGames: any[];
  currentOpponentIndex: number;
  currentScenario: any;
  seasonTeam: any;
  standings: any;
  awards: any[];
  inTransition: boolean;
  inSession: boolean;
  seasonActive: boolean;
}

const _allOpponents = getAllOpponents(1);
const initialState: ISeasonState = {
  allOpponents: _allOpponents,
  completedGames: [],
  currentOpponentIndex: 0,
  currentScenario: null,
  seasonTeam: getStudentTeam(1),
  standings: getStandings([..._allOpponents, getStudentTeam(1)]),
  awards: [],
  inTransition: false,
  inSession: false,
  seasonActive: false,
};

const seasonStateSlice = createSlice({
  name: 'SEASON_STATE',
  initialState,
  reducers: {
    initializeSeason: (state, action: PayloadAction<any>) => {
      const student = action.payload;
      const level = Math.min(+student.level, 3);
      // if no seasons have been played yet, do nothing
      if (!student.seasons || !student.seasons.length) {
        return;
      }

      // set the completed games cache and current opponent index
      state.completedGames = student.seasons[level - 1] || [];
      state.currentOpponentIndex = state.completedGames.length;
      // set the opponents for the current level
      state.allOpponents = getAllOpponents(level);
      // set the students team for the current season
      state.seasonTeam = getStudentTeam(level);
      // set awards
      state.awards = student.awards || [];
      // if there are completed games in the current season, loop them and tally the stats
      let wins = 0;
      let losses = 0;
      let points = 0;
      state.completedGames.forEach((game) => {
        if (game.win) {
          wins += 1;
          points += 2;
        } else {
          losses += 1;
          if (game.score[0] === 1 && game.score[1] === 2) {
            points += 1;
          }
        }
        // loop all teams and assign random scores/team ranks
        state.allOpponents.forEach((team) => {
          team.teamRank = getRandomTeamRank(level);
          if (team.name !== game.opponent.name) {
            team.stats.points += getRandomStat(3);
            const wins = getRandomStat(2);
            const losses = wins === 0 ? 1 : 0;
            team.stats.wins += wins;
            team.stats.losses += losses;
          }
        });
      });

      // set the stats and standings
      state.seasonTeam.stats = { wins, losses, points };
      state.standings = getStandings([...state.allOpponents, state.seasonTeam]);
      // season is active if there are completed games in the current season
      state.seasonActive = !!state.completedGames.length;
      // game is in transition if all teams have been played
      // and the length of the seasons array is equal to the current level
      state.inTransition =
        student.seasons[level - 1] &&
        student.seasons[level - 1].length === state.allOpponents.length &&
        level === student.seasons.length;
    },

    setSeasonComplete: (state, action: PayloadAction<any>) => {
      const student = action.payload;
      state.currentOpponentIndex = 0;
      state.currentScenario = null;
      state.awards[+student.level - 1] = student.awards[+student.level - 1];
      state.inTransition = true;
      state.inSession = true;
      state.seasonActive = false;
    },

    setSeasonActive: (state, action: PayloadAction<any>) => {
      state.seasonActive = action.payload;
    },

    gameEnded: (
      state,
      action: PayloadAction<{
        gameResult: any;
        opponent: any;
        newOpponentIndex: any;
      }>
    ) => {
      const { gameResult, opponent, newOpponentIndex } = action.payload;

      // update student team points
      state.seasonTeam.stats.points += gameResult.points;

      // update stats and points
      if (gameResult.win) {
        state.seasonTeam.stats.wins += 1;
        opponent.stats.losses += 1;
        // if overtime win opponent still gets a point
        if (gameResult.score[0] === 1 && gameResult.score[1] === 2) {
          opponent.stats.points += 1;
        }
      } else {
        state.seasonTeam.stats.losses += 1;
        opponent.stats.wins += 1;
        opponent.stats.points += 2;
      }

      // loop all teams and assign random scores/team ranks
      state.allOpponents.forEach((team) => {
        if (team.name !== opponent.name) {
          team.stats.points += getRandomStat(3);
          const wins = getRandomStat(2);
          const losses = wins === 0 ? 1 : 0;
          team.stats.wins += wins;
          team.stats.losses += losses;
        }
      });

      // update standings
      state.standings = getStandings([...state.allOpponents, state.seasonTeam]);

      // push game result into completed games cache
      state.completedGames.push(gameResult);

      // update opponent index
      state.currentOpponentIndex = newOpponentIndex;
    },

    throwScenario: (state, action: PayloadAction<any>) => {
      state.currentScenario = action.payload;
    },

    removeScenario: (state) => {
      state.currentScenario = null;
    },

    setInTransition: (state, action: PayloadAction<any>) => {
      state.inTransition = action.payload;
    },
  },
});

export const seasonStateReducer = seasonStateSlice.reducer;
export const {
  initializeSeason,
  setInTransition,
  setSeasonActive,
  setSeasonComplete,
  removeScenario,
  throwScenario,
  gameEnded,
} = seasonStateSlice.actions;
