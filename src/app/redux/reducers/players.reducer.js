import {
  SCOUTING_COMPLETE,
  RELEASE_PLAYER,
  SIGN_PLAYER,
  TRADE_PLAYER,
  SET_INITIAL_PLAYERS_STATE,
  UPDATE_SCOUT_PLAYER,
  INJURE_PLAYER,
} from '../actionTypes';
import { cloneDeep } from 'lodash';
import {
  PlayerAssignments,
  PlayerPositions,
  isTeamPlayer,
  getPlayerPositon,
} from '@data/players/players';
import { getMoneyLevels } from '@utils';

const initialState = {
  marketPlayers: {
    forward: [],
    defender: [],
    goalie: [],
  },
  injuredPlayers: [],
  teamPlayers: null,
  scoutingState: {
    isComplete: false,
    scoutPlayers: {
      levelOne: null,
      levelTwo: null,
      levelThree: null,
      available: null,
    },
    offeredScoutPlayers: {
      forward: [],
      defender: [],
      goalie: [],
    },
  },
  initialized: false,
};

const playersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIAL_PLAYERS_STATE: {
      const { players, student } = action.payload;
      const moneyLevels = getMoneyLevels(student.level);
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
      const offeredScoutPlayers = {
        forward: [],
        defender: [],
        goalie: [],
      };
      const injuredPlayers = [];
      const teamPlayers = {};
      // make sure the players are for this level
      players.filter((p) => p.playerLevel === student.level);

      // loop players and place them in the appropriate cache
      players.forEach((p) => {
        if (p.playerAssignment === PlayerAssignments.MARKET) {
          if (p.playerPosition === PlayerPositions.FORWARD) {
            marketPlayers.forward.push(p);
          } else if (p.playerPosition === PlayerPositions.DEFENDER) {
            marketPlayers.defender.push(p);
          } else if (p.playerPosition === PlayerPositions.GOALIE) {
            marketPlayers.goalie.push(p);
          }
        } else if (p.playerAssignment === PlayerAssignments.SCOUT) {
          scoutPlayers.available.push(p);
        } else if (p.playerAssignment === PlayerAssignments.OFFERED_SCOUT) {
          if (+p.playerCost === moneyLevels[0].num) {
            scoutPlayers.levelOne.push(p);
          } else if (+p.playerCost === moneyLevels[1].num) {
            scoutPlayers.levelTwo.push(p);
          } else if (+p.playerCost === moneyLevels[2].num) {
            scoutPlayers.levelThree.push(p);
          }

          if (p.playerPosition === PlayerPositions.FORWARD) {
            offeredScoutPlayers.forward.push(p);
          } else if (p.playerPosition === PlayerPositions.DEFENDER) {
            offeredScoutPlayers.defender.push(p);
          } else if (p.playerPosition === PlayerPositions.GOALIE) {
            offeredScoutPlayers.goalie.push(p);
          }
        } else if (p.playerAssignment === PlayerAssignments.INJURED) {
          injuredPlayers.push(p);
        } else if (isTeamPlayer(p)) {
          teamPlayers[p.playerAssignment] = p;
        }
      });

      const scoutingComplete = Object.keys(offeredScoutPlayers).some(
        (k) => offeredScoutPlayers[k].length
      );

      return {
        initialized: true,
        marketPlayers,
        teamPlayers,
        scoutingState: {
          isComplete: scoutingComplete,
          scoutPlayers,
          offeredScoutPlayers,
        },
      };
    }
    case SIGN_PLAYER: {
      const clonedState = cloneDeep(state);
      const signedPlayer = action.payload.player;
      const assignment = action.payload.assignment;
      const student = action.payload.student;
      const moneyLevels = getMoneyLevels(student.level);
      const position = getPlayerPositon(assignment);

      const playerCache =
        position === PlayerPositions.BENCH
          ? clonedState.scoutingState.offeredScoutPlayers
          : clonedState.marketPlayers;

      playerCache[signedPlayer.playerPosition].splice(
        playerCache[signedPlayer.playerPosition].findIndex(
          (p) => p._id === signedPlayer._id
        ),
        1
      );

      if (position === PlayerPositions.BENCH) {
        let levelCache;
        if (+signedPlayer.playerCost === moneyLevels[0].num) {
          levelCache = clonedState.scoutingState.scoutPlayers.levelOne;
        } else if (+signedPlayer.playerCost === moneyLevels[1].num) {
          levelCache = clonedState.scoutingState.scoutPlayers.levelTwo;
        } else if (+signedPlayer.playerCost === moneyLevels[2].num) {
          levelCache = clonedState.scoutingState.scoutPlayers.levelThree;
        }

        levelCache.splice(
          levelCache.findIndex((p) => p._id === signedPlayer._id),
          1
        );
      }

      clonedState.teamPlayers[assignment] = signedPlayer;

      return clonedState;
    }
    case RELEASE_PLAYER: {
      const clonedState = cloneDeep(state);
      const releasedPlayer = action.payload.player;
      const prevAssignment = action.payload.prevAssignment;
      const student = action.payload.student;
      const moneyLevels = getMoneyLevels(student.level);

      const playerCache =
        releasedPlayer.playerAssignment === PlayerAssignments.OFFERED_SCOUT
          ? clonedState.scoutingState.offeredScoutPlayers
          : clonedState.marketPlayers;

      if (releasedPlayer.playerAssignment === PlayerAssignments.OFFERED_SCOUT) {
        if (+releasedPlayer.playerCost === moneyLevels[0].num) {
          clonedState.scoutingState.scoutPlayers.levelOne.push(releasedPlayer);
        } else if (+releasedPlayer.playerCost === moneyLevels[1].num) {
          clonedState.scoutingState.scoutPlayers.levelTwo.push(releasedPlayer);
        } else if (+releasedPlayer.playerCost === moneyLevels[2].num) {
          clonedState.scoutingState.scoutPlayers.levelThree.push(
            releasedPlayer
          );
        }
      }

      clonedState.teamPlayers[prevAssignment] = null;
      playerCache[releasedPlayer.playerPosition].push(releasedPlayer);
      return clonedState;
    }
    case TRADE_PLAYER: {
      const releasedPlayer = action.payload.releasedPlayer;
      const signedPlayer = action.payload.signedPlayer;
      const student = action.payload.student;
      const moneyLevels = getMoneyLevels(student.level);
      const clonedState = cloneDeep(state);

      console.log('RELEASed::: ', releasedPlayer);
      console.log('SIGNIed:::: ', signedPlayer);

      const playerCache =
        releasedPlayer.playerAssignment === PlayerAssignments.OFFERED_SCOUT
          ? clonedState.scoutingState.offeredScoutPlayers
          : clonedState.marketPlayers;

      playerCache[releasedPlayer.playerPosition].push(releasedPlayer);

      if (releasedPlayer.playerAssignment === PlayerAssignments.OFFERED_SCOUT) {
        if (+releasedPlayer.playerCost === moneyLevels[0].num) {
          clonedState.scoutingState.scoutPlayers.levelOne.push(releasedPlayer);
        } else if (+releasedPlayer.playerCost === moneyLevels[1].num) {
          clonedState.scoutingState.scoutPlayers.levelTwo.push(releasedPlayer);
        } else if (+releasedPlayer.playerCost === moneyLevels[2].num) {
          clonedState.scoutingState.scoutPlayers.levelThree.push(
            releasedPlayer
          );
        }
      }

      if (
        getPlayerPositon(signedPlayer.playerAssignment) ===
        PlayerPositions.BENCH
      ) {
        let levelCache;
        if (+signedPlayer.playerCost === moneyLevels[0].num) {
          levelCache = clonedState.scoutingState.scoutPlayers.levelOne;
        } else if (+signedPlayer.playerCost === moneyLevels[1].num) {
          levelCache = clonedState.scoutingState.scoutPlayers.levelTwo;
        } else if (+signedPlayer.playerCost === moneyLevels[2].num) {
          levelCache = clonedState.scoutingState.scoutPlayers.levelThree;
        }

        levelCache.splice(
          levelCache.findIndex((p) => p._id === signedPlayer._id),
          1
        );
      }
      clonedState.teamPlayers[signedPlayer.playerAssignment] = signedPlayer;

      return clonedState;
    }
    case UPDATE_SCOUT_PLAYER: {
      const clonedState = cloneDeep(state);
      const updatedLevels = Object.keys(action.payload);

      clonedState.scoutingState.scoutPlayers[updatedLevels[0]] =
        action.payload[updatedLevels[0]];
      clonedState.scoutingState.scoutPlayers[updatedLevels[1]] =
        action.payload[updatedLevels[1]];

      return clonedState;
    }
    case SCOUTING_COMPLETE: {
      const { levelOne, levelTwo, levelThree } = action.payload;
      const forwards = [];
      const defenders = [];
      const goalies = [];
      const clonedState = cloneDeep(state);
      const placeByPosition = (player) => {
        if (player.playerPosition === PlayerPositions.GOALIE) {
          goalies.push(player);
        } else if (player.playerPosition === PlayerPositions.FORWARD) {
          forwards.push(player);
        } else if (player.playerPosition === PlayerPositions.DEFENDER) {
          defenders.push(player);
        }
      };
      levelOne.forEach(placeByPosition);
      levelTwo.forEach(placeByPosition);
      levelThree.forEach(placeByPosition);

      clonedState.scoutingState.scoutPlayers.levelOne = levelOne;
      clonedState.scoutingState.scoutPlayers.levelTwo = levelTwo;
      clonedState.scoutingState.scoutPlayers.levelThree = levelThree;
      clonedState.scoutingState.offeredScoutPlayers.forward = forwards;
      clonedState.scoutingState.offeredScoutPlayers.defender = defenders;
      clonedState.scoutingState.offeredScoutPlayers.goalie = goalies;
      clonedState.scoutingState.isComplete = true;

      return clonedState;
    }
    case INJURE_PLAYER: {
      const clonedState = cloneDeep(state);
      clonedState.teamPlayers[action.payload.previousAssignment] = null;
      return clonedState;
    }
    default:
      return state;
  }
};

export default playersReducer;
