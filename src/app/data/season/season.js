import redRabbits from '@images/icons/red-rabbits.svg';
import purplePanthers from '@images/icons/purple-panthers.svg';
import whiteWolves from '@images/icons/white-wolves.svg';
import blueBearsLogoLg from '@images/icons/blue-bears-logo-big.svg';
import blueBearsLogoSm from '../../../assets/images/icons/blue-bears-logo.svg';
import { INJURE_PLAYER } from '@redux/actionTypes';
import { PlayerAssignments } from '@data/players/players';

const getSecondHighestPlayer = (team) => {
  return Object.keys(teams)
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
  return team[props][i];
};

export const scenarios = {
  1: [
    {
      message: 'OH NO! One of your players was injured',
      action: INJURE_PLAYER,
      getPlayer: getSecondHighestPlayer,
    },
    {
      message: 'OH NO! One of your players was injured',
      action: INJURE_PLAYER,
      getPlayer: getStartingPlayer,
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
      'GET LOUD! The Jr Sharks Won!',
      'The Jr Sharks won in overtime!',
      'OH NO! The Jr Sharks lost :(',
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

export const allTeams = [
  {
    teamRank: 65,
    logoLg: blueBearsLogoLg,
    logoSm: whiteWolves,
    name: 'Green Giraffes',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
  },
  {
    teamRank: 30,
    logoLg: blueBearsLogoLg,
    logoSm: whiteWolves,
    name: 'Pink Pandas',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
  },
  {
    teamRank: 80,
    logoLg: blueBearsLogoLg,
    logoSm: whiteWolves,
    name: 'Orange Owls',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
  },
  {
    teamRank: 54,
    logoLg: blueBearsLogoLg,
    logoSm: whiteWolves,
    name: 'Silver Spiders',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
  },
  {
    teamRank: 42,
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
    standings: '6th',
  },
  {
    teamRank: 58,
    logoLg: blueBearsLogoLg,
    logoSm: whiteWolves,
    name: 'Black Beavers',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
  },
  {
    teamRank: 65,
    logoLg: blueBearsLogoLg,
    logoSm: whiteWolves,
    name: 'Gray Grasshoppers',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
  },
  {
    teamRank: 88,
    logoLg: blueBearsLogoLg,
    logoSm: whiteWolves,
    name: 'Blue Bears',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '12th',
  },
  {
    teamRank: 40,
    logoLg: blueBearsLogoLg,
    logoSm: whiteWolves,
    name: 'Red Rabbits',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '12th',
  },
  {
    teamRank: 35,
    logoLg: blueBearsLogoLg,
    logoSm: whiteWolves,
    name: 'Purple Panthers',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '10th',
  },
  {
    teamRank: 25,
    logoLg: blueBearsLogoLg,
    logoSm: whiteWolves,
    name: 'White Wolves',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
  },
];
