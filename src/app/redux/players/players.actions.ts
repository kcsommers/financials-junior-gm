export const UPDATE_SCOUT_PLAYER = 'UPDATE_SCOUT_PLAYER';

export const SCOUTING_COMPLETE = 'SCOUTING_COMPLETE';

export const SIGN_PLAYER = 'SIGN_PLAYER';

export const RELEASE_PLAYER = 'RELEASE_PLAYER';

export const TRADE_PLAYER = 'TRADE_PLAYER';

export const INJURE_PLAYER = 'INJURE_PLAYER';

export const SET_INITIAL_PLAYERS_STATE = 'SET_INITIAL_PLAYER_STATE';

export const scoutingComplete = (
  levelOne: any,
  levelTwo: any,
  levelThree: any
) => ({
  type: SCOUTING_COMPLETE,
  payload: { levelOne, levelTwo, levelThree },
});

export const setInitialPlayersState = (players: any, student: any) => ({
  type: SET_INITIAL_PLAYERS_STATE,
  payload: { players, student },
});

export const signPlayer = (player: any, prevAssignment: any, student: any) => ({
  type: SIGN_PLAYER,
  payload: { player, prevAssignment, student },
});

export const releasePlayer = (
  player: any,
  prevAssignment: any,
  student: any
) => ({
  type: RELEASE_PLAYER,
  payload: { player, prevAssignment, student },
});

export const tradePlayer = (
  releasedPlayer: any,
  signedPlayer: any,
  student: any
) => ({
  type: TRADE_PLAYER,
  payload: { releasedPlayer, signedPlayer, student },
});

export const injurePlayer = (
  injuredPlayer: any,
  previousAssignment: any,
  student: any
) => ({
  type: INJURE_PLAYER,
  payload: { injuredPlayer, previousAssignment, student },
});

export const updateScoutPlayer = (state: any) => ({
  type: UPDATE_SCOUT_PLAYER,
  payload: state,
});
