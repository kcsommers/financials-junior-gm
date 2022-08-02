import { cloneDeep } from 'lodash';
import {
  getRandomTeamRank,
  getRandomStat,
  getStandings,
  getAllOpponents,
  getStudentTeam,
} from '@data/season/season-utils';
import {
  SET_SEASON_COMPLETE,
  GAME_ENDED,
  THROW_SCENARIO,
  INITIALIZE_SEASON,
  SET_IN_TRANSITION,
  SET_SEASON_ACTIVE,
  REMOVE_SCENARIO,
  VIDEOS_LOADED,
} from './season.actions';

const allOpponents = getAllOpponents(1);

const initialState = {
  allOpponents,
  completedGames: [],
  currentOpponentIndex: 0,
  currentScenario: null,
  seasonTeam: getStudentTeam(1),
  standings: getStandings([...allOpponents, getStudentTeam(1)]),
  awards: [],
  inTransition: false,
  inSession: false,
  seasonActive: false,
  loadedVideos: {
    1: false,
    2: false,
    3: false
  }
};

const seasonReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_SEASON: {
      const student = action.payload;
      const level = Math.min(+student.level, 3);

      // if no seasons have been played yet, just return the initial state
      if (!student.seasons || !student.seasons.length) {
        return state;
      }

      // otherwise, clone the initial state and set properties from there
      const clonedState = cloneDeep(initialState);

      // set the completed games cache and current opponent index
      clonedState.completedGames = student.seasons[level - 1] || [];
      clonedState.currentOpponentIndex = clonedState.completedGames.length;

      // set the opponents for the current level
      clonedState.allOpponents = getAllOpponents(level);

      // set the students team for the current season
      clonedState.seasonTeam = getStudentTeam(level);

      // set awards
      clonedState.awards = student.awards || [];

      // if there are completed games in the current season, loop them and tally the stats
      let wins = 0;
      let losses = 0;
      let points = 0;
      clonedState.completedGames.forEach((game) => {
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

      // set the stats and standings
      clonedState.seasonTeam.stats = { wins, losses, points };
      clonedState.standings = getStandings([
        ...clonedState.allOpponents,
        clonedState.seasonTeam,
      ]);

      // season is active if there are completed games in the current season
      clonedState.seasonActive = clonedState.completedGames.length;

      // game is in transition if all teams have been played
      // and the length of the seasons array is equal to the current level
      clonedState.inTransition =
        student.seasons[level - 1] &&
        student.seasons[level - 1].length === clonedState.allOpponents.length &&
        level === student.seasons.length;

      return clonedState;
    }
    case SET_SEASON_ACTIVE: {
      const clonedState = cloneDeep(state);
      clonedState.seasonActive = action.payload;

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
    case REMOVE_SCENARIO: {
      const clonedState = cloneDeep(state);
      clonedState.currentScenario = null;

      return clonedState;
    }
    case GAME_ENDED: {
      const { gameResult, opponent, newOpponentIndex } = action.payload;
      const clonedState = cloneDeep(state);

      // update student team points
      clonedState.seasonTeam.stats.points += gameResult.points;

      // update stats and points
      if (gameResult.win) {
        clonedState.seasonTeam.stats.wins += 1;
        opponent.stats.losses += 1;
        // if overtime win opponent still gets a point
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

      // update standings
      clonedState.standings = getStandings([
        ...clonedState.allOpponents,
        clonedState.seasonTeam,
      ]);

      // push game result into completed games cache
      clonedState.completedGames.push(gameResult);

      // update opponent index
      clonedState.currentOpponentIndex = newOpponentIndex;

      return clonedState;
    }
    case SET_SEASON_COMPLETE: {
      const clonedState = cloneDeep(state);
      const student = action.payload;

      clonedState.currentOpponentIndex = 0;
      clonedState.currentScenario = null;
      clonedState.awards[+student.level - 1] =
        student.awards[+student.level - 1];
      clonedState.inTransition = true;
      clonedState.inSession = true;
      clonedState.seasonActive = false;

      return clonedState;
    }
    case VIDEOS_LOADED: {
      const clonedState = cloneDeep(state);
      const level = action.payload;
      clonedState.loadedVideos = {
        ...clonedState.loadedVideos,
        [level]: true
      }
      return clonedState;
    }
    default:
      return state;
  }
};

export default seasonReducer;
