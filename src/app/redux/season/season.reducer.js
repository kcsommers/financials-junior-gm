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
      const { seasons, awards, level = 1 } = action.payload;

      console.log('INIT SEASON:::: ', action.payload);
      if (!seasons || !seasons.length) {
        return state;
      }

      const clonedState = cloneDeep(state);
      clonedState.currentScenario = null;
      clonedState.allOpponents = getAllOpponents(+level);

      clonedState.gameBlocks = [
        clonedState.allOpponents.slice(0, 4),
        clonedState.allOpponents.slice(4, 8),
        clonedState.allOpponents.slice(8, 12),
      ];

      clonedState.seasonTeam = studentTeams[level - 1];
      clonedState.awards = awards || [];
      clonedState.completedBlocks = seasons;
      clonedState.completedGames = [];
      clonedState.currentOpponentIndex = 0;

      clonedState.inTransition =
        seasons[level - 1] &&
        seasons[level - 1].length === 3 &&
        +level === seasons.length;

      const currentSeason = seasons[level - 1];
      if (!currentSeason) {
        clonedState.standings = getStandings([
          ...clonedState.allOpponents,
          clonedState.seasonTeam,
        ]);
        return clonedState;
      }
      clonedState.currentBlockIndex = seasons[level - 1].length;
      if (clonedState.currentBlockIndex === 0) {
        clonedState.standings = getStandings([
          ...clonedState.allOpponents,
          clonedState.seasonTeam,
        ]);
        return clonedState;
      }

      let wins = 0;
      let losses = 0;
      let points = 0;
      currentSeason.forEach((block) => {
        block.forEach((game) => {
          if (game.win) {
            wins += 1;
            if (game.score[0] === 2 && game.score[1] === 1) {
              points += 1;
            } else {
              points += 2;
            }
          } else {
            losses += 1;
          }

          // loop all teams and assign random scores/team ranks
          clonedState.allOpponents.forEach((team) => {
            team.teamRank = getRandomTeamRank(+level);
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

      clonedState.seasonTeam = getStudentTeam(level);
      clonedState.seasonTeam.stats = { wins, losses, points };
      clonedState.standings = getStandings([
        ...clonedState.allOpponents,
        clonedState.seasonTeam,
      ]);

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
      const clonedState = cloneDeep(state);

      clonedState.completedBlocks.push(state.completedGames);
      clonedState.currentBlockIndex = state.currentBlockIndex + 1;
      clonedState.currentOpponentIndex = 0;
      clonedState.currentScenario = null;
      clonedState.completedGames = [];
      return clonedState;
    }
    case GAME_ENDED: {
      const { gameResult, opponent, level } = action.payload;
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
        team.teamRank = getRandomTeamRank(level);
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
