import { cloneDeep, isEmpty } from 'lodash';
import { OpposingTeam } from '../../game/teams/opposing-team.type';
import { Player } from '../../game/teams/players';
import { StudentTeam } from '../../game/teams/student-team.type';
import { updateStudentTeamRank } from '../../game/teams/team-statistics';
import { initializeTeams } from '../../game/teams/utils/initialize-teams';
import { Student } from '../../student/student.interface';
import { GamePhase, GamePhases, getGamePhase } from './game-phases';
import { GameResult, getGameResult } from './game-result';
import { handleGameResult } from './handle-game-result';

export type SeasonAction =
  | {
      type: 'NEXT_GAME';
      payload: { student: Student };
    }
  | {
      type: 'NEXT_GAME_PHASE';
      payload: { cheerPoints: number };
    }
  | {
      type: 'NEXT_PHASE_MESSAGE';
    }
  | {
      type: 'INIT_SEASON';
      payload: {
        student: Student;
        opposingTeams: OpposingTeam[][];
        studentTeams: StudentTeam[];
      };
    }
  | {
      type: 'MARKET_ACTION';
      payload: {
        student: Student;
        injuredPlayer?: Player;
      };
    }
  | {
      type: 'SEASON_COMPLETE';
    };

export type SeasonState = {
  currentOpponent: OpposingTeam;
  currentOpponentIndex: number;
  gamePhase: GamePhase;
  gamePhaseIndex: number;
  phaseMessageIndex: number;
  gameResult: GameResult;
  opposingTeams: OpposingTeam[];
  studentTeam: StudentTeam;
  seasonComplete: boolean;
  injuredPlayer: Player;
};

export const seasonReducer = (
  state: SeasonState,
  action: SeasonAction
): SeasonState => {
  switch (action.type) {
    case 'NEXT_GAME': {
      const { student } = action.payload;
      const seasonGames = (student.seasons || [])[+student.level - 1] || [];
      const currentOpponentIndex = seasonGames.length;
      const currentOpponent = state.opposingTeams[currentOpponentIndex];
      console.log('curr opp:::: ', currentOpponent);
      const gamePhase = getGamePhase(0, state.studentTeam, currentOpponent);

      return {
        ...state,
        currentOpponent,
        currentOpponentIndex,
        gamePhase,
        gamePhaseIndex: 0,
        phaseMessageIndex: 0,
        gameResult: null,
      };
    }

    case 'NEXT_GAME_PHASE': {
      const prevGamePhase = state.gamePhase;
      const hasHighlight = !isEmpty(
        state.currentOpponent.videos?.gameHighlight
      );

      const gameComplete =
        (!hasHighlight && prevGamePhase.name === GamePhases.GAME_ON) ||
        prevGamePhase.name === GamePhases.GAME_HIGHLIGHT;

      let gameResult: GameResult;
      let updatedStudentTeam: StudentTeam;
      let updatedOpposingTeams: OpposingTeam[];
      if (gameComplete) {
        gameResult = getGameResult(
          state.studentTeam,
          state.currentOpponent,
          action.payload?.cheerPoints || 0
        );
        const { studentTeam, opposingTeams } = handleGameResult(
          state.studentTeam,
          state.opposingTeams,
          gameResult
        );
        updatedStudentTeam = studentTeam;
        updatedOpposingTeams = opposingTeams;
      }

      const gamePhaseIndex = state.gamePhaseIndex + 1;
      const gamePhase = getGamePhase(
        gamePhaseIndex,
        state.studentTeam,
        state.currentOpponent,
        gameResult
      );

      console.log('gamephase::::: ', gamePhase);

      return {
        ...state,
        studentTeam: updatedStudentTeam || state.studentTeam,
        opposingTeams: updatedOpposingTeams || state.opposingTeams,
        gameResult,
        gamePhase,
        gamePhaseIndex,
        phaseMessageIndex: 0,
      };
    }

    case 'NEXT_PHASE_MESSAGE': {
      return {
        ...state,
        phaseMessageIndex: state.phaseMessageIndex + 1,
      };
    }

    case 'INIT_SEASON': {
      const { student, opposingTeams, studentTeams } = action.payload;
      const { levelOpposingTeams, studentTeam } = initializeTeams(
        student,
        studentTeams,
        opposingTeams
      );

      const seasonGamesPlayed =
        (student.seasons || [])[+student.level - 1] || [];
      const seasonComplete =
        seasonGamesPlayed.length === levelOpposingTeams.length;

      return {
        gameResult: null,
        gamePhase: null,
        gamePhaseIndex: 0,
        phaseMessageIndex: 0,
        currentOpponent: null,
        currentOpponentIndex: 0,
        opposingTeams: levelOpposingTeams,
        studentTeam,
        seasonComplete,
        injuredPlayer: null,
      };
    }
    case 'MARKET_ACTION': {
      const { student } = action.payload;
      const clonedStudentTeam = cloneDeep(state.studentTeam);
      updateStudentTeamRank(student, clonedStudentTeam);
      const updates: Partial<SeasonState> = {
        studentTeam: clonedStudentTeam,
      };
      if (action.payload.hasOwnProperty('injuredPlayer')) {
        updates.injuredPlayer = action.payload.injuredPlayer;
        if (action.payload.injuredPlayer) {
          updates.gamePhase = {
            name: GamePhases.SEASON_SCENARIO,
            messages: ['OH NO! One of your players was injured'],
          };
          updates.phaseMessageIndex = 0;
        }
      }
      return {
        ...state,
        ...updates,
      };
    }
    case 'SEASON_COMPLETE': {
      return {
        ...state,
        seasonComplete: true,
      };
    }

    default: {
      return state;
    }
  }
};
