import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlayerAssignments, PlayerPositions } from '@data/players/players';
import { getMoneyLevels } from '@utils';
import {
  isTeamPlayer,
  getTeamRank,
  getMoneySpent,
  isStarter,
} from '@data/players/players-utils';

interface IPlayersState {
  marketPlayers: {
    forward: any[];
    defense: any[];
    goalie: any[];
  };
  injuredPlayers: any[];
  teamPlayers: any;
  scoutingState: {
    isComplete: boolean;
    scoutPlayers: {
      levelOne: any;
      levelTwo: any;
      levelThree: any;
      available: any;
    };
    offeredScoutPlayers: {
      forward: any[];
      defense: any[];
      goalie: any[];
    };
  };
  initialized: boolean;
  teamRank: number;
  moneySpent: number;
}

const initialState: IPlayersState = {
  marketPlayers: {
    forward: [],
    defense: [],
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
      defense: [],
      goalie: [],
    },
  },
  initialized: false,
  teamRank: 0,
  moneySpent: 0,
};

const playersStateSlice = createSlice({
  name: 'PLAYERS_STATE',
  initialState,
  reducers: {
    setInitialPlayersState: (
      state,
      action: PayloadAction<{ players: any[]; student: any }>
    ) => {
      const { players, student } = action.payload;
      const moneyLevels = getMoneyLevels(+student.level);
      const offeredScoutPlayers = {
        forward: [],
        defense: [],
        goalie: [],
      };
      const teamPlayers = {};
      // make sure the players are for this level
      players.filter((p) => +p.playerLevel === +student.level);
      // loop players and place them in the appropriate cache
      players.forEach((p) => {
        if (p.playerAssignment === PlayerAssignments.MARKET) {
          if (p.playerPosition === PlayerPositions.FORWARD) {
            state.marketPlayers.forward.push(p);
          } else if (
            p.playerPosition === PlayerPositions.DEFENSE ||
            p.playerPosition === 'defender'
          ) {
            state.marketPlayers.defense.push(p);
          } else if (p.playerPosition === PlayerPositions.GOALIE) {
            state.marketPlayers.goalie.push(p);
          }
        } else if (p.playerAssignment === PlayerAssignments.SCOUT) {
          state.scoutingState.scoutPlayers.available.push(p);
        } else if (p.playerAssignment === PlayerAssignments.OFFERED_SCOUT) {
          if (+p.playerCost === moneyLevels[0].num) {
            state.scoutingState.scoutPlayers.levelOne.push(p);
          } else if (+p.playerCost === moneyLevels[1].num) {
            state.scoutingState.scoutPlayers.levelTwo.push(p);
          } else if (+p.playerCost === moneyLevels[2].num) {
            state.scoutingState.scoutPlayers.levelThree.push(p);
          }

          if (p.playerPosition === PlayerPositions.FORWARD) {
            state.scoutingState.offeredScoutPlayers.forward.push(p);
          } else if (p.playerPosition === PlayerPositions.DEFENSE) {
            state.scoutingState.offeredScoutPlayers.defense.push(p);
          } else if (p.playerPosition === PlayerPositions.GOALIE) {
            state.scoutingState.offeredScoutPlayers.goalie.push(p);
          }
        } else if (p.playerAssignment === PlayerAssignments.UNAVAILABLE) {
          state.injuredPlayers.push(p);
        } else if (isTeamPlayer(p)) {
          teamPlayers[p.playerAssignment] = p;
        }
      });

      const _team = [
        ...Object.keys(teamPlayers).map((a) => teamPlayers[a]),
        ...state.injuredPlayers,
      ];
      state.initialized = true;
      state.scoutingState.isComplete = Object.keys(offeredScoutPlayers).some(
        (k) => offeredScoutPlayers[k].length
      );
      state.moneySpent = getMoneySpent(_team, student.totalBudget);
      state.teamRank = getTeamRank(
        _team.filter((p) => isStarter(p)),
        +student.level
      );
    },
    scoutingComplete: (
      state,
      action: PayloadAction<{ levelOne: any; levelTwo: any; levelThree: any }>
    ) => {
      const { levelOne, levelTwo, levelThree } = action.payload;
      const forwards: any[] = [];
      const defense: any[] = [];
      const goalies: any[] = [];
      const placeByPosition = (player) => {
        if (player.playerPosition === PlayerPositions.GOALIE) {
          goalies.push(player);
        } else if (player.playerPosition === PlayerPositions.FORWARD) {
          forwards.push(player);
        } else if (player.playerPosition === PlayerPositions.DEFENSE) {
          defense.push(player);
        }
      };
      levelOne.forEach(placeByPosition);
      levelTwo.forEach(placeByPosition);
      levelThree.forEach(placeByPosition);

      state.scoutingState.scoutPlayers.levelOne = levelOne;
      state.scoutingState.scoutPlayers.levelTwo = levelTwo;
      state.scoutingState.scoutPlayers.levelThree = levelThree;
      state.scoutingState.offeredScoutPlayers.forward = forwards;
      state.scoutingState.offeredScoutPlayers.defense = defense;
      state.scoutingState.offeredScoutPlayers.goalie = goalies;
      state.scoutingState.isComplete = true;
    },
    signPlayer: (
      state,
      action: PayloadAction<{ player: any; prevAssignment: any; student: any }>
    ) => {
      const signedPlayer = action.payload.player;
      const prevAssignment = action.payload.prevAssignment;
      const student = action.payload.student;
      const moneyLevels = getMoneyLevels(+student.level);

      let playerCache = state.marketPlayers;
      if (prevAssignment === PlayerAssignments.OFFERED_SCOUT) {
        playerCache = state.scoutingState.offeredScoutPlayers;
        let levelCache;
        if (+signedPlayer.playerCost === moneyLevels[0].num) {
          levelCache = state.scoutingState.scoutPlayers.levelOne;
        } else if (+signedPlayer.playerCost === moneyLevels[1].num) {
          levelCache = state.scoutingState.scoutPlayers.levelTwo;
        } else if (+signedPlayer.playerCost === moneyLevels[2].num) {
          levelCache = state.scoutingState.scoutPlayers.levelThree;
        }
        levelCache.splice(
          levelCache.findIndex((p) => p._id === signedPlayer._id),
          1
        );
      }

      if (playerCache[signedPlayer.playerPosition]) {
        playerCache[signedPlayer.playerPosition].splice(
          playerCache[signedPlayer.playerPosition].findIndex(
            (p) => p._id === signedPlayer._id
          ),
          1
        );
      }

      state.teamPlayers[signedPlayer.playerAssignment] = signedPlayer;
      const team = [
        ...Object.keys(state.teamPlayers).map((a) => state.teamPlayers[a]),
        ...state.injuredPlayers,
      ];
      state.moneySpent = getMoneySpent(team, student.totalBudget);
      state.teamRank = getTeamRank(
        team.filter((p) => isStarter(p)),
        +student.level
      );
    },
    releasePlayer: (
      state,
      action: PayloadAction<{ player; prevAssignment; student }>
    ) => {
      const releasedPlayer = action.payload.player;
      const prevAssignment = action.payload.prevAssignment;
      const student = action.payload.student;
      const moneyLevels = getMoneyLevels(+student.level);

      const playerCache =
        releasedPlayer.playerAssignment === PlayerAssignments.OFFERED_SCOUT
          ? state.scoutingState.offeredScoutPlayers
          : state.marketPlayers;

      if (releasedPlayer.playerAssignment === PlayerAssignments.OFFERED_SCOUT) {
        if (+releasedPlayer.playerCost === moneyLevels[0].num) {
          state.scoutingState.scoutPlayers.levelOne.push(releasedPlayer);
        } else if (+releasedPlayer.playerCost === moneyLevels[1].num) {
          state.scoutingState.scoutPlayers.levelTwo.push(releasedPlayer);
        } else if (+releasedPlayer.playerCost === moneyLevels[2].num) {
          state.scoutingState.scoutPlayers.levelThree.push(releasedPlayer);
        }
      }

      state.teamPlayers[prevAssignment] = null;
      if (playerCache[releasedPlayer.playerPosition]) {
        playerCache[releasedPlayer.playerPosition].push(releasedPlayer);
      }

      const team = [
        ...Object.keys(state.teamPlayers).map((a) => state.teamPlayers[a]),
        ...state.injuredPlayers,
      ];
      state.moneySpent = getMoneySpent(team, student.totalBudget);
      state.teamRank = getTeamRank(
        team.filter((p) => isStarter(p)),
        +student.level
      );
    },
    tradePlayer: (
      state,
      action: PayloadAction<{
        releasedPlayer: any;
        signedPlayer: any;
        student: any;
      }>
    ) => {
      /** traded players do not go back in the market */
      const releasedPlayer = action.payload.releasedPlayer;
      const signedPlayer = action.payload.signedPlayer;
      const student = action.payload.student;
      const moneyLevels = getMoneyLevels(+student.level);

      // remove the signed player from the market
      state.marketPlayers[signedPlayer.playerPosition] = state.marketPlayers[
        signedPlayer.playerPosition
      ].filter((p) => p._id !== signedPlayer._id);

      // if released player is a scout player, put them back in the scout cache
      if (releasedPlayer.playerAssignment === PlayerAssignments.OFFERED_SCOUT) {
        state.scoutingState.offeredScoutPlayers[
          releasedPlayer.playerPosition
        ].push(releasedPlayer);
      }
      // also put them back at the appropriate money level
      if (releasedPlayer.playerAssignment === PlayerAssignments.OFFERED_SCOUT) {
        if (+releasedPlayer.playerCost === moneyLevels[0].num) {
          state.scoutingState.scoutPlayers.levelOne.push(releasedPlayer);
        } else if (+releasedPlayer.playerCost === moneyLevels[1].num) {
          state.scoutingState.scoutPlayers.levelTwo.push(releasedPlayer);
        } else if (+releasedPlayer.playerCost === moneyLevels[2].num) {
          state.scoutingState.scoutPlayers.levelThree.push(releasedPlayer);
        }
      }

      // if a scout player was signed, remove them from the scout cache
      if (signedPlayer.playerAssignment === PlayerAssignments.OFFERED_SCOUT) {
        let levelCache;
        if (+signedPlayer.playerCost === moneyLevels[0].num) {
          levelCache = state.scoutingState.scoutPlayers.levelOne;
        } else if (+signedPlayer.playerCost === moneyLevels[1].num) {
          levelCache = state.scoutingState.scoutPlayers.levelTwo;
        } else if (+signedPlayer.playerCost === moneyLevels[2].num) {
          levelCache = state.scoutingState.scoutPlayers.levelThree;
        }

        levelCache.splice(
          levelCache.findIndex((p) => p._id === signedPlayer._id),
          1
        );
      }
      // set the signed player on the team
      state.teamPlayers[signedPlayer.playerAssignment] = signedPlayer;

      const team = [
        ...Object.keys(state.teamPlayers).map((a) => state.teamPlayers[a]),
        ...state.injuredPlayers,
      ];
      state.moneySpent = getMoneySpent(team, student.totalBudget);
      state.teamRank = getTeamRank(
        team.filter((p) => isStarter(p)),
        +student.level
      );
    },
    injurePlayer: (
      state,
      action: PayloadAction<{ injuredPlayer; previousAssignment; student }>
    ) => {
      const { previousAssignment, injuredPlayer, student } = action.payload;
      state.teamPlayers[previousAssignment] = null;
      state.injuredPlayers.push(injuredPlayer);

      const team = [
        ...Object.keys(state.teamPlayers).map((a) => state.teamPlayers[a]),
        ...state.injuredPlayers,
      ];
      state.moneySpent = getMoneySpent(team, student.totalBudget);
      state.teamRank = getTeamRank(
        team.filter((p) => isStarter(p)),
        +student.level
      );
    },
    updateScoutPlayer: (state, action: PayloadAction<any>) => {
      const updatedLevels = Object.keys(action.payload);
      state.scoutingState.scoutPlayers[updatedLevels[0]] =
        action.payload[updatedLevels[0]];
      state.scoutingState.scoutPlayers[updatedLevels[1]] =
        action.payload[updatedLevels[1]];
    },
  },
});

export const playersStateReducer = playersStateSlice.reducer;
export const {
  setInitialPlayersState,
  scoutingComplete,
  signPlayer,
  tradePlayer,
  injurePlayer,
  releasePlayer,
  updateScoutPlayer,
} = playersStateSlice.actions;
