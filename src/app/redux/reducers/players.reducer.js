import { SET_SIGNABLE_PLAYERS, REMOVE_SIGNABLE_PLAYER } from '../actionTypes';
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
    case REMOVE_SIGNABLE_PLAYER: {
      const player = action.payload;

      console.log('PLAYER:::: ', player);

      const cache = state.signablePlayers[player.playerPosition];
      cache.splice(
        cache.findIndex((p) => p.playerName === player.name),
        1
      );
      return cloneDeep(state);
    }
    default:
      return state;
  }
};

export default playersReducer;
