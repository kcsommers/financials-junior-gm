import { cloneDeep } from 'lodash';
import {
  getStandings,
  getRandomTeamRank,
  getRandomStat,
  getAllTeams,
} from '@data/season/season';
import {
  GAME_BLOCK_ENDED,
  SET_SEASON_COMPLETE,
  GAME_ENDED,
  THROW_SCENARIO,
} from './../actionTypes';

const initialTeams = [
  {
    name: 'Jr Sharks',
    stats: { wins: 0, losses: 0, points: 0 },
  },
  {
    name: 'Barricudas',
    stats: { wins: 0, losses: 0, points: 0 },
  },
];

const allTeams = getAllTeams();

const initialState = {
  completedBlocks: [], // array of game blocks
  completedGames: [],
  gameBlocks: [
    allTeams.slice(0, 4),
    allTeams.slice(4, 8),
    allTeams.slice(8, 12),
  ],
  currentBlockIndex: 0,
  currentScenario: null,
  allTeams: allTeams,
  seasonTeam: initialTeams[0],
  standings: getStandings([...allTeams, initialTeams[0]]),
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
      clonedState.seasonTeam.stats.points += gameResult.score[0];
      opponent.stats.points += gameResult.score[1];
      if (gameResult.score[0] > gameResult.score[1]) {
        clonedState.seasonTeam.stats.wins += 1;
        opponent.stats.losses += 1;
      } else {
        clonedState.seasonTeam.stats.losses += 1;
        opponent.stats.wins += 1;
      }

      // loop all teams and assign random scores/team ranks
      clonedState.allTeams.forEach((team) => {
        team.teamRank = getRandomTeamRank();
        if (team.name !== opponent.name) {
          team.stats.points += getRandomStat(5);
          const wins = getRandomStat(2);
          const losses = wins === 0 ? 1 : 0;
          team.stats.wins += wins;
          team.stats.losses += losses;
        }
      });

      clonedState.standings = getStandings([
        ...clonedState.allTeams,
        clonedState.seasonTeam,
      ]);

      clonedState.completedGames.push(gameResult);
      return clonedState;
    }
    case SET_SEASON_COMPLETE: {
      const clonedState = cloneDeep(state);
      const student = action.payload;
      const awards = [];
      const studentTeamIndex = state.standings.findIndex(
        (t) => t.name === state.seasonTeam.name
      );
      awards.push(student.savingsBudget > 0); // has savings
      awards.push(studentTeamIndex < 3); // top 3
      awards.push(studentTeamIndex === 0); // first place

      clonedState.completedBlocks.push(state.completedGames);
      clonedState.completedGames = [];
      clonedState.awards.push(awards);
      clonedState.currentBlockIndex = 0;
      clonedState.currentScenario = null;
      return clonedState;
    }
    default:
      return state;
  }
};

export default seasonReducer;
