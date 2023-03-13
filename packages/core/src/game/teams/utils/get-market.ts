import { Market } from '../market';
import { Player, PlayerAssignments, PlayerPositions } from '../players';

export const getMarket = (players: Player[]): Market => {
  const market: Market = {
    forwards: [],
    defense: [],
    goalies: [],
    scout: {
      levelOne: [],
      levelTwo: [],
      levelThree: [],
      available: [],
    },
    offeredScout: {
      forwards: [],
      defense: [],
      goalies: [],
    },
  };

  (players || []).forEach((player) => {
    if (player.playerAssignment === PlayerAssignments.MARKET) {
      if (player.playerPosition === PlayerPositions.FORWARD) {
        market.forwards.push(player);
      } else if (
        player.playerPosition === PlayerPositions.DEFENSE ||
        player.playerPosition === 'defender'
      ) {
        market.defense.push(player);
      } else if (player.playerPosition === PlayerPositions.GOALIE) {
        market.goalies.push(player);
      }
    } else if (player.playerAssignment === PlayerAssignments.SCOUT) {
      market.scout.available.push(player);
    } else if (player.playerAssignment === PlayerAssignments.OFFERED_SCOUT) {
      if (player.playerPosition === PlayerPositions.FORWARD) {
        market.offeredScout.forwards.push(player);
      } else if (player.playerPosition === PlayerPositions.DEFENSE) {
        market.offeredScout.defense.push(player);
      } else if (player.playerPosition === PlayerPositions.GOALIE) {
        market.offeredScout.goalies.push(player);
      }
    }
  });

  return market;
};
