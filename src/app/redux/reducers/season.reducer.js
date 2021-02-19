import { cloneDeep } from 'lodash';
import {
  getStandings,
  getRandomTeamRank,
  getRandomStat,
  getAllOpponents,
} from '@data/season/season';
import {
  GAME_BLOCK_ENDED,
  SET_SEASON_COMPLETE,
  GAME_ENDED,
  THROW_SCENARIO,
  SET_CURRENT_OPPONENT_INDEX,
} from './../actionTypes';

const initialTeams = [
  {
    name: 'Jr. Sharks',
    stats: { wins: 0, losses: 0, points: 0 },
  },
  {
    name: 'Barricudas',
    stats: { wins: 0, losses: 0, points: 0 },
  },
];

const allOpponents = getAllOpponents();
const gameBlocks = [
  allOpponents.slice(0, 4),
  allOpponents.slice(4, 8),
  allOpponents.slice(8, 12),
];

const initialState = {
  completedBlocks: [], // array of game blocks
  completedGames: [],
  gameBlocks: gameBlocks,
  currentBlockIndex: 0,
  currentOpponentIndex: 0,
  currentScenario: null,
  allOpponents: allOpponents,
  seasonTeam: initialTeams[0],
  standings: getStandings([...allOpponents, initialTeams[0]]),
  awards: [],
};

const seasonReducer = (state = initialState, action) => {
  switch (action.type) {
    case THROW_SCENARIO: {
      const clonedState = cloneDeep(state);
      const scenario = action.payload;
      clonedState.currentScenario = scenario;
      return clonedState;
    }
    case GAME_BLOCK_ENDED: {
      const clonedState = cloneDeep(state);

      clonedState.completedBlocks.push(state.completedGames);
      clonedState.currentBlockIndex = state.currentBlockIndex + 1;
      clonedState.currentScenario = null;
      clonedState.completedGames = [];
      return clonedState;
    }
    case GAME_ENDED: {
      const { gameResult, opponent } = action.payload;
      const clonedState = cloneDeep(state);

      clonedState.seasonTeam.stats.points += gameResult.points;

      if (gameResult.win) {
        clonedState.seasonTeam.stats.wins += 1;
        opponent.stats.losses += 1;
      } else {
        clonedState.seasonTeam.stats.losses += 1;
        opponent.stats.wins += 1;
      }

      // loop all teams and assign random scores/team ranks
      clonedState.allOpponents.forEach((team) => {
        team.teamRank = getRandomTeamRank();
        if (team.name !== opponent.name) {
          team.stats.points += getRandomStat(3);
          const wins = getRandomStat(2);
          const losses = wins === 0 ? 1 : 0;
          team.stats.wins += wins;
          team.stats.losses += losses;
        }
      });

      clonedState.standings = getStandings([
        ...clonedState.allOpponents,
        clonedState.seasonTeam,
      ]);

      clonedState.completedGames.push(gameResult);
      return clonedState;
    }
    case SET_CURRENT_OPPONENT_INDEX: {
      const clonedState = cloneDeep(state);
      clonedState.currentOpponentIndex = action.payload;
      return clonedState;
    }
    case SET_SEASON_COMPLETE: {
      const clonedState = cloneDeep(state);
      const student = action.payload;
      const awards = [];
      const studentTeamIndex = state.standings.findIndex(
        (t) => t.name === state.seasonTeam.name
      );
      awards.push(studentTeamIndex < 3); // top 3
      awards.push(studentTeamIndex === 0); // first place
      awards.push(student.savingsBudget > 0); // has savings

      clonedState.completedBlocks.push(state.completedGames);
      clonedState.completedGames = [];
      clonedState.awards.push(awards);
      clonedState.currentBlockIndex = 0;
      clonedState.currentScenario = null;
      clonedState.currentOpponentIndex = 0;
      clonedState.allOpponents = getAllOpponents();
      clonedState.seasonTeam = initialTeams[0];
      clonedState.standings = getStandings([
        ...clonedState.allOpponents,
        initialTeams[0],
      ]);
      return clonedState;
    }
    default:
      return state;
  }
};

export default seasonReducer;
