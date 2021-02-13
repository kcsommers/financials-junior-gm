import { PlayerAssignments, PlayerPositions } from './data';

export const getPlayerProps = () => [
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

export const getMoneySpent = (student) => {
  if (!student) {
    return 0;
  }

  return getPlayerProps().reduce((total, p) => {
    const player = student[p];
    if (player) {
      total += player.playerCost;
    }
    return total;
  }, 0);
};

export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getDollarString = (num) => {
  if (!num) {
    return '$0';
  }
  if (num % 1 === 0) {
    return `$${num}`;
  }
  return `$${num.toFixed(2)}`;
};

export const getMoneyLevels = (level) => {
  switch (level) {
    case 1:
      return {
        0: {
          short: '$2',
          long: 'two dollar',
          num: 2,
        },
        1: {
          short: '$1',
          long: 'one dollar',
          num: 1,
        },
        2: {
          short: '50\u00a2',
          long: 'fifty cent',
          num: 0.5,
        },
      };
    case 2:
      return {
        0: {
          short: '$2',
          long: 'two dollar',
          num: 2,
        },
        1: {
          short: '$1',
          long: 'one dollar',
          num: 1,
        },
        2: {
          short: '50\u00a2',
          long: 'fifty cent',
          num: 0.5,
        },
      };
    case 3:
      return {
        0: {
          short: '$2',
          long: 'two dollar',
          num: 2,
        },
        1: {
          short: '$1',
          long: 'one dollar',
          num: 1,
        },
        2: {
          short: '50\u00a2',
          long: 'fifty cent',
          num: 0.5,
        },
      };
  }
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
      return PlayerPositions.DEFENSE;
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
