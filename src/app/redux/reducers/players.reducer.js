import { SET_SIGNABLE_PLAYERS, PLAYER_SIGNED } from '../actionTypes';
import { cloneDeep } from 'lodash';

const initialState = {
  signablePlayers: {
    forward: [],
    defender: [],
    goalie: [],
  },
  scoutingComplete: false,
};

const playersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SIGNABLE_PLAYERS: {
      const forward = [];
      const defender = [];
      const goalie = [];

      action.payload.forEach((player) => {
        if (player.playerPosition === 'goalie') {
          goalie.push(player);
        } else if (player.playerPosition === 'forward') {
          forward.push(player);
        } else if (player.playerPosition === 'defender') {
          defender.push(player);
        }
      });

      return {
        ...state,
        scoutingComplete: true,
        signablePlayers: {
          forward,
          defender,
          goalie,
        },
      };
    }
    case PLAYER_SIGNED: {
      const signedPlayer = action.paylod;
      const cache = state.signablePlayers[signedPlayer.playerPosition];
      cache.splice(
        cache.findIndex((p) => p.playerName === signedPlayer.name),
        1
      );
      return cloneDeep(state);
    }
    default:
      return state;
  }
};

export default playersReducer;
