import whiteWolves from '@images/icons/team-logos/white-wolves.svg';
import purplePanthers from '@images/icons/team-logos/purple-panthers.svg'
import redRabbits from '@images/icons/team-logos/red-rabbits.svg'
import bluebears from '@images/icons/team-logos/blue-bears.svg'
import blueBearsLogoLg from '@images/icons/team-logos/blue-bears-logo-big.svg';
import { INJURE_PLAYER } from '@redux/actionTypes';
import { PlayerAssignments } from '@data/players/players';
import { cloneDeep } from 'lodash';

export const getGameResult = (student, opponent) => {
  const rankDiff = student.teamRank - opponent.teamRank;
  if (rankDiff > 5) {
    return {
      score: [Math.min(Math.ceil(rankDiff / 10), 5), 0],
      messageIndex: 0,
      opponent: opponent.name,
      points: 2,
      win: true,
    };
  } else if (
    (Math.abs(rankDiff) > 0 && Math.abs(rankDiff) <= 5) ||
    rankDiff === 0
  ) {
    return {
      score: [2, 1],
      messageIndex: 1,
      opponent: opponent.name,
      points: 1,
      win: true,
    };
  } else {
    return {
      score: [0, Math.min(Math.ceil(Math.abs(rankDiff / 10)), 5)],
      messageIndex: 2,
      opponent: opponent.name,
      points: 0,
      win: false,
    };
  }
};

const getSecondHighestPlayer = (team) => {
  return Object.keys(team)
    .map((p) => team[p])
    .sort((a, b) => +b.overallRank - +a.overallRank)[1];
};

const getStartingPlayer = (team) => {
  const props = [
    PlayerAssignments.F_ONE,
    PlayerAssignments.F_TWO,
    PlayerAssignments.F_THREE,
    PlayerAssignments.G_ONE,
    PlayerAssignments.D_ONE,
    PlayerAssignments.D_TWO,
  ];
  const i = Math.floor(Math.random() * props.length);
  return team[props[i]];
};

export const scenarios = {
  1: [
    {
      message: 'OH NO! One of your players was injured',
      objective: '1. Replace the injured player',
      action: INJURE_PLAYER,
      getPlayer: getSecondHighestPlayer,
      playerAssignment: PlayerAssignments.MARKET,
      player: null,
    },
    {
      message: 'OH NO! One of your players was injured',
      objective: '1. Replace the injured player',
      action: INJURE_PLAYER,
      getPlayer: getStartingPlayer,
      playerAssignment: PlayerAssignments.MARKET,
      player: null,
    },
  ],
};

export const GamePhases = {
  READY: 'READY',
  UP_NEXT: 'UP_NEXT',
  WARMING_UP: 'WARMING_UP',
  GAME_ON: 'GAME_ON',
  GAME_OVER: 'GAME_OVER',
  TRANSITION: 'TRANSITION',
};

export const gamePhases = [
  {
    phase: GamePhases.READY,
    messages: ['Your team is ready to play'],
  },
  {
    phase: GamePhases.UP_NEXT,
    messages: ['Coming up next', ''],
    messageTimer: 2000,
  },
  {
    phase: GamePhases.WARMING_UP,
    messages: ['The players are warming up'],
    timer: 5000,
  },
  {
    phase: GamePhases.GAME_ON,
    messages: ['The game is being played'],
    timer: 5000,
  },
  {
    phase: GamePhases.GAME_OVER,
    timer: 5000,
    messages: [
      'GET LOUD! The Jr. Sharks Won!',
      'CLOSE! The Jr. Sharks won in overtime!',
      'OH NO! The Jr. Sharks lost :(',
    ],
  },
  {
    phase: GamePhases.TRANSITION,
    messages: [
      'The next game starts in 3',
      'The next game starts in 2',
      'The next game starts in 1',
    ],
    messageTimer: 1000,
  },
];

export const getRandomTeamRank = () => {
  return Math.max(Math.floor(Math.random() * 90), 50);
};

export const getRandomStat = (mult) => {
  return Math.floor(Math.random() * mult);
};

export const getStandings = (teams) => {
  return teams.sort((a, b) => b.stats.points - a.stats.points);
};

export const getStanding = (team, standings) => {
  const standing = (
    standings.findIndex((t) => t.name === team.name) + 1
  ).toString();
  if (standing.endsWith('1') && standing !== '11') {
    return `${standing}st`;
  }
  if (standing.endsWith('2') && standing !== '12') {
    return `${standing}nd`;
  }
  if (standing.endsWith('3') && standing !== '13') {
    return `${standing}rd`;
  }
  return `${standing}th`;
};

export const getAllOpponents = (level) => {
  const clonedTeams = cloneDeep(allOpponents);
  return clonedTeams.map((t) => {
    t.teamRank = getRandomTeamRank();
    return t;
  });
};

export const allOpponents = [
  {
    teamRank: 35,
    logoLg: blueBearsLogoLg,
    logoSm: whiteWolves,
    name: 'Blue Bears',
    stats: { wins: 0, losses: 0, points: 0 },
<<<<<<< HEAD
    standings: '12th',
=======
    standings: '6th',
    color: '#3bfff9',
>>>>>>> eab39d99cf9c79fe81738d02d0d3e715ab1c55c6
  },
  {
    teamRank: 50,
    logoLg: blueBearsLogoLg,
    logoSm: whiteWolves,
    name: 'Red Rabbits',
    stats: { wins: 0, losses: 0, points: 0 },
<<<<<<< HEAD
    standings: '12th',
=======
    standings: '6th',
    color: '#f83bff',
>>>>>>> eab39d99cf9c79fe81738d02d0d3e715ab1c55c6
  },
  {
    teamRank: 55,
    logoLg: blueBearsLogoLg,
    logoSm: whiteWolves,
    name: 'Purple Panthers',
    stats: { wins: 0, losses: 0, points: 0 },
<<<<<<< HEAD
    standings: '10th',
=======
    standings: '6th',
    color: '#ffb75a',
>>>>>>> eab39d99cf9c79fe81738d02d0d3e715ab1c55c6
  },
  {
    teamRank: 80,
    logoLg: blueBearsLogoLg,
    logoSm: whiteWolves,
    name: 'White Wolves',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#3bfff9',
  },
  {
    teamRank: 65,
    logoLg: blueBearsLogoLg,
    logoSm: whiteWolves,
    name: 'Green Giraffes',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#f83bff',
  },
  {
    teamRank: 75,
    logoLg: blueBearsLogoLg,
    logoSm: whiteWolves,
    name: 'Pink Pandas',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#ffb75a',
  },
  {
    teamRank: 65,
    logoLg: blueBearsLogoLg,
    logoSm: whiteWolves,
    name: 'Orange Owls',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
  },
  {
    teamRank: 70,
    logoLg: blueBearsLogoLg,
    logoSm: whiteWolves,
    name: 'Silver Spiders',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
  },
  {
    teamRank: 55,
    logoLg: blueBearsLogoLg,
    logoSm: whiteWolves,
    name: 'Golden Geckos',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
  },
  {
    teamRank: 70,
    logoLg: blueBearsLogoLg,
    logoSm: whiteWolves,
    name: 'Yellow Yaks',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '12th',
    color: '#ff3b3b',
  },
  {
    teamRank: 75,
    logoLg: blueBearsLogoLg,
    logoSm: whiteWolves,
    name: 'Black Beavers',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '10th',
    color: '#f83bff',
  },
  {
    teamRank: 70,
    logoLg: blueBearsLogoLg,
    logoSm: whiteWolves,
    name: 'Gray Grasshoppers',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#3bfff9',
  },
  
];
