import { cloneDeep } from 'lodash';
import {
  getStandings,
  getRandomTeamRank,
  getRandomStat,
  getAllOpponents,
  studentTeams,
  getStudentTeam,
} from '@data/season/season';
import {
  GAME_BLOCK_ENDED,
  SET_SEASON_COMPLETE,
  GAME_ENDED,
  THROW_SCENARIO,
  SET_CURRENT_OPPONENT_INDEX,
  INITIALIZE_SEASON,
  SET_IN_TRANSITION,
} from './season.actions';

const allOpponents = getAllOpponents(1);

const initialState = {
  completedBlocks: [], // array of game blocks
  completedGames: [],
  gameBlocks: [
    allOpponents.slice(0, 4),
    allOpponents.slice(4, 8),
    allOpponents.slice(8, 12),
  ],
  currentBlockIndex: 0,
  currentOpponentIndex: 0,
  currentScenario: null,
  allOpponents,
  seasonTeam: studentTeams[0],
  standings: getStandings([...allOpponents, studentTeams[0]]),
  awards: [],
  inTransition: false,
  inSession: false,
};

const seasonReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_SEASON: {
      const student = action.payload;
      const level = +student.level;

      // if no seasons have been played yet, just return the initial state
      if (!student.seasons || !student.seasons.length) {
        return state;
      }

      // otherwise, clone the initial state and set properties from there
      const clonedState = cloneDeep(initialState);

      // get the opponents for the current level and set the game blocks
      clonedState.allOpponents = getAllOpponents(level);
      clonedState.gameBlocks = [
        clonedState.allOpponents.slice(0, 4),
        clonedState.allOpponents.slice(4, 8),
        clonedState.allOpponents.slice(8, 12),
      ];

      // set the students team for the current season
      clonedState.seasonTeam = getStudentTeam(level);

      // set awards and completed blocks
      clonedState.awards = student.awards || [];
      clonedState.completedBlocks = student.seasons;

      // set current block index based on the length of the level array in the seasons property
      clonedState.currentBlockIndex = student.seasons[level - 1]
        ? student.seasons[level - 1].length
        : 0;

      // if there are completed blocks in the current season, loop them and tally the stats
      const currentSeason = student.seasons[level - 1] || [];
      let wins = 0;
      let losses = 0;
      let points = 0;
      currentSeason.forEach((block) => {
        block.forEach((game) => {
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
          clonedState.allOpponents.forEach((team) => {
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
      });

      // set the stats and standings
      clonedState.seasonTeam.stats = { wins, losses, points };
      clonedState.standings = getStandings([
        ...clonedState.allOpponents,
        clonedState.seasonTeam,
      ]);

      // game is in transition if the length of the game blocks array is 3
      // and the length of the seasons array is equal to the current level
      clonedState.inTransition =
        student.seasons[level - 1] &&
        student.seasons[level - 1].length === 3 &&
        level === student.seasons.length;

      return clonedState;
    }
    case SET_IN_TRANSITION: {
      const clonedState = cloneDeep(state);
      clonedState.inTransition = action.payload;
      return clonedState;
    }
    case THROW_SCENARIO: {
      const clonedState = cloneDeep(state);
      const scenario = action.payload;
      clonedState.currentScenario = scenario;
      return clonedState;
    }
    case GAME_BLOCK_ENDED: {
      const student = action.payload;
      const clonedState = cloneDeep(state);

      clonedState.completedBlocks.push(state.completedGames);
      clonedState.currentBlockIndex = state.currentBlockIndex + 1;
      clonedState.currentOpponentIndex = 0;
      clonedState.currentScenario = null;
      clonedState.completedGames = [];

      // loop all teams and assign random team ranks
      clonedState.allOpponents.forEach((team) => {
        team.teamRank = getRandomTeamRank(+student.level);
      });
      return clonedState;
    }
    case GAME_ENDED: {
      const { gameResult, opponent } = action.payload;
      const clonedState = cloneDeep(state);

      clonedState.seasonTeam.stats.points += gameResult.points;

      if (gameResult.win) {
        clonedState.seasonTeam.stats.wins += 1;
        opponent.stats.losses += 1;
        if (gameResult.score[0] === 1 && gameResult.score[1] === 2) {
          opponent.stats.points += 1;
        }
      } else {
        clonedState.seasonTeam.stats.losses += 1;
        opponent.stats.wins += 1;
        opponent.stats.points += 2;
      }

      // loop all teams and assign random scores/team ranks
      clonedState.allOpponents.forEach((team) => {
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

      clonedState.completedBlocks.push(state.completedGames);
      clonedState.currentBlockIndex = state.currentBlockIndex + 1;
      clonedState.currentOpponentIndex = 0;
      clonedState.currentScenario = null;
      clonedState.completedGames = [];
      clonedState.awards[(+student.level || 1) - 1] =
        student.awards[(+student.level || 1) - 1];
      clonedState.inTransition = true;
      clonedState.inSession = true;

      return clonedState;
    }
    default:
      return state;
  }
};

export default seasonReducer;
