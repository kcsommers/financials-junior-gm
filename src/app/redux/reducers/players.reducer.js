import {
  SCOUTING_COMPLETE,
  RELEASE_PLAYER,
  SIGN_PLAYER,
  TRADE_PLAYER,
  SET_INITIAL_PLAYERS_STATE,
  UPDATE_SCOUT_PLAYER,
} from '../actionTypes';
import { cloneDeep } from 'lodash';
import { PlayerAssignments, PlayerPositions } from '@data';
import { isTeamPlayer } from '@utils';

const initialState = {
  marketPlayers: {
    forward: [],
    defender: [],
    goalie: [],
  },
  scoutPlayers: {
    levelOne: null,
    levelTwo: null,
    levelThree: null,
    available: null,
  },
  teamPlayers: null,
  scoutingState: {
    isComplete: false,
  },
};

const playersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIAL_PLAYERS_STATE: {
      const players = action.payload;
      const marketPlayers = {
        forward: [],
        defender: [],
        goalie: [],
      };
      const scoutPlayers = {
        levelOne: [],
        levelTwo: [],
        levelThree: [],
        available: [],
      };
      const teamPlayers = {};
      players.forEach((p) => {
        if (p.playerAssignment === PlayerAssignments.MARKET) {
          if (p.playerPosition === PlayerPositions.FORWARD) {
            marketPlayers.forward.push(p);
          } else if (p.playerPosition === PlayerPositions.DEFENSE) {
            marketPlayers.defender.push(p);
          } else if (p.playerPosition === PlayerPositions.GOALIE) {
            marketPlayers.goalie.push(p);
          }
        } else if (p.playerAssignment === PlayerAssignments.SCOUT) {
          scoutPlayers.available.push(p);
        } else if (isTeamPlayer(p)) {
          teamPlayers[p.playerAssignment] = p;
        }
      });

      return {
        marketPlayers,
        teamPlayers,
        scoutPlayers,
        scoutingState: {
          isComplete: false,
        },
      };
    }
    case SIGN_PLAYER: {
      const signedPlayer = action.payload.player;
      const assignment = action.payload.assignment;
      const marketCache = state.marketPlayers[signedPlayer.playerPosition];
      const clonedState = cloneDeep(state);

      marketCache.splice(
        marketCache.findIndex((p) => p.playerName === signedPlayer.name),
        1
      );
      clonedState.teamPlayers[assignment] = signedPlayer;

      return clonedState;
    }
    case RELEASE_PLAYER: {
      const releasedPlayer = action.payload.player;
      const clonedState = cloneDeep(state);
      const marketCache =
        clonedState.marketPlayers[releasedPlayer.playerPosition];

      releasedPlayer.playerAssignment = PlayerAssignments.MARKET;
      marketCache.push(releasedPlayer);

      return clonedState;
    }
    case TRADE_PLAYER: {
      const releasedPlayer = action.payload.releasedPlayer;
      const signedPlayer = action.payload.signedPlayer;
      const clonedState = cloneDeep(state);
      const marketCache =
        clonedState.marketPlayers[releasedPlayer.playerPosition];

      releasedPlayer.playerAssignment = signedPlayer.playerAssignment;
      signedPlayer.playerAssignment = PlayerAssignments.MARKET;
      clonedState.teamPlayers[releasedPlayer.playerPosition] = signedPlayer;
      marketCache.push(releasedPlayer);

      return clonedState;
    }
    case UPDATE_SCOUT_PLAYER: {
      const clonedState = cloneDeep(state);
      const updatedLevels = Object.keys(action.payload);

      clonedState.scoutPlayers[updatedLevels[0]] =
        action.payload[updatedLevels[0]];
      clonedState.scoutPlayers[updatedLevels[1]] =
        action.payload[updatedLevels[1]];

      return clonedState;
    }
    case SCOUTING_COMPLETE: {
      const { levelOne, levelTwo, levelThree } = action.payload;
      const forward = [];
      const defender = [];
      const goalie = [];
      const clonedState = cloneDeep(state);
      const placeByPosition = (player) => {
        if (player.playerPosition === PlayerPositions.GOALIE) {
          goalie.push(player);
        } else if (player.playerPosition === PlayerPositions.FORWARD) {
          forward.push(player);
        } else if (player.playerPosition === PlayerPositions.DEFENDER) {
          defender.push(player);
        }
      };
      levelOne.forEach(placeByPosition);
      levelTwo.forEach(placeByPosition);
      levelThree.forEach(placeByPosition);

      clonedState.scoutPlayers.levelOne = levelOne;
      clonedState.scoutPlayers.levelTwo = levelTwo;
      clonedState.scoutPlayers.levelThree = levelThree;
      clonedState.marketPlayers.forward = [
        ...forward,
        ...clonedState.marketPlayers.forward,
      ];
      clonedState.marketPlayers.defender = [
        ...defender,
        ...clonedState.marketPlayers.defender,
      ];
      clonedState.marketPlayers.goalie = [
        ...goalie,
        ...clonedState.marketPlayers.goalie,
      ];
      clonedState.scoutingState.isComplete = true;

      return clonedState;
    }
    default:
      return state;
  }
};

export default playersReducer;
