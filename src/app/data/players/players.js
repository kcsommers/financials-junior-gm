export const PlayerAssignments = {
  MARKET: 'marketPlayer',

  SCOUT: 'scoutPlayer',

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
