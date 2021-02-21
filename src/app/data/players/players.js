export const playerProps = [
  'fOne',
  'fTwo',
  'fThree',
  'dOne',
  'dTwo',
  'gOne',
  'benchOne',
  'benchTwo',
  'benchThree',
];

export const PlayerAssignments = {
  MARKET: 'marketPlayer',

  SCOUT: 'scoutPlayer',

  OFFERED_SCOUT: 'offeredScoutPlayer',

  INJURED: null,

  F_ONE: 'fOne',

  F_TWO: 'fTwo',

  F_THREE: 'fThree',

  D_ONE: 'dOne',

  D_TWO: 'dTwo',

  G_ONE: 'gOne',

  BENCH_ONE: 'benchOne',

  BENCH_TWO: 'benchTwo',

  BENCH_THREE: 'benchThree',
};

export const PlayerPositions = {
  FORWARD: 'forward',

  DEFENDER: 'defender',

  GOALIE: 'goalie',

  BENCH: 'bench',
};

export const TeamAssignments = {
  offense: ['fOne', 'fTwo', 'fThree'],
  defense: ['dOne', 'dTwo'],
  goalie: ['gOne'],
  bench: ['benchOne', 'benchTwo', 'benchThree'],
};

export const getAvailableSlots = (props, team) => {
  if (!team) {
    return props.length;
  }
  return props.reduce((total, p) => {
    if (!team[p]) {
      total++;
    }
    return total;
  }, 0);
};

export const isTeamPlayer = (player) => {
  if (!player) {
    return false;
  }
  return [
    PlayerAssignments.F_ONE,
    PlayerAssignments.F_TWO,
    PlayerAssignments.F_THREE,
    PlayerAssignments.D_ONE,
    PlayerAssignments.D_TWO,
    PlayerAssignments.G_ONE,
    PlayerAssignments.BENCH_ONE,
    PlayerAssignments.BENCH_TWO,
    PlayerAssignments.BENCH_THREE,
  ].includes(player.playerAssignment);
};

export const getPlayerPositon = (assignment) => {
  switch (assignment) {
    case PlayerAssignments.F_ONE:
    case PlayerAssignments.F_TWO:
    case PlayerAssignments.F_THREE: {
      return PlayerPositions.FORWARD;
    }
    case PlayerAssignments.D_ONE:
    case PlayerAssignments.D_TWO: {
      return PlayerPositions.DEFENDER;
    }
    case PlayerAssignments.G_ONE: {
      return PlayerPositions.GOALIE;
    }
    case PlayerAssignments.BENCH_ONE:
    case PlayerAssignments.BENCH_TWO:
    case PlayerAssignments.BENCH_THREE: {
      return PlayerPositions.BENCH;
    }
    default: {
      return null;
    }
  }
};

export const releasePlayer = (player, cache) => {};

export const signPlayer = (player, cache) => {};

export const trandPlayers = (
  signedPlayer,
  releasedPlayer,
  signedCache,
  releasedCache
) => {};
