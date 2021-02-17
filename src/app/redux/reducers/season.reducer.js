import { allTeams } from '@data/season/season';

const initialState = {
  previousGameBlocks: [], // array of game blocks
  gameBlocks: [
    allTeams.slice(0, 4),
    allTeams.slice(4, 8),
    allTeams.slice(8, 12),
  ],
  gameBlockIndex: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
