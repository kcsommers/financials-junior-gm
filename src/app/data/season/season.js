import bluebearsLg from '@images/icons/team-logos/bluebearsLg.svg';
import bluebearsSm from '@images/icons/team-logos/bluebearsSm.svg';
import redrabbitsLg from '@images/icons/team-logos/redrabbitsLg.svg';
import redrabbitsSm from '@images/icons/team-logos/redrabbitsSm.svg';
import pinkpanthersLg from '@images/icons/team-logos/pinkpanthersLg.svg';
import pinkpanthersSm from '@images/icons/team-logos/pinkpanthersSm.svg';
import yellowyaksLg from '@images/icons/team-logos/yellowyaksLg.svg';
import yellowyaksSm from '@images/icons/team-logos/yellowyaksSm.svg';
import greengiraffesLg from '@images/icons/team-logos/greengiraffesLg.svg';
import greengiraffesSm from '@images/icons/team-logos/greengiraffesSm.svg';
import goldengeckosLg from '@images/icons/team-logos/goldengeckosLg.svg';
import goldengeckosSm from '@images/icons/team-logos/goldengeckosSm.svg';
import graygrasshoppersLg from '@images/icons/team-logos/graygrasshoppersLg.svg';
import graygrasshoppersSm from '@images/icons/team-logos/graygrasshoppersSm.svg';
import orangeowlsLg from '@images/icons/team-logos/orangeowlsLg.svg';
import orangeowlsSm from '@images/icons/team-logos/orangeowlsSm.svg';
import silverspidersLg from '@images/icons/team-logos/silverspidersLg.svg';
import silverspidersSm from '@images/icons/team-logos/silverspidersSm.svg';
import whitewolvesLg from '@images/icons/team-logos/whitewolvesLg.svg';
import whitewolvesSm from '@images/icons/team-logos/whitewolvesSm.svg';
import pinkpandasLg from '@images/icons/team-logos/pinkpandasLg.svg';
import pinkpandasSm from '@images/icons/team-logos/pinkpandasSm.svg';
import blackbeaversLg from '@images/icons/team-logos/blackbeaversLg.svg';
import blackbeaversSm from '@images/icons/team-logos/blackbeaversSm.svg';
import { INJURE_PLAYER } from '@redux/actions';
import { PlayerAssignments } from '@data/players/players';
import { cloneDeep } from 'lodash';
import { initPlayersByLevel, updateStudentById } from './../../api-helper';

export const resetSeason = (level, student) => {
  return new Promise((resolve, reject) => {
    const clonedSeasons = cloneDeep(student.seasons);
    clonedSeasons[(level || 1) - 1] = [];

    updateStudentById(student._id, { seasons: clonedSeasons, level })
      .then((res) => {
        if (!res.success || !res.updatedStudent) {
          console.error(new Error('Unexpected error updating student season'));
          return;
        }

        initPlayersByLevel(level)
          .then((initializedStudentRes) => {
            const initializedStudent = initializedStudentRes.data;
            if (!initializedStudentRes.success || !initializedStudent) {
              console.error(new Error('Unexpected error initializing players'));
              return;
            }

            resolve(initializedStudent);
          })
          .catch((err) => reject(err));
      })
      .catch((err) => reject(err));
  });
};

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
      playerAssignment: PlayerAssignments.INJURED,
      player: null,
    },
    {
      message: 'OH NO! One of your players was injured',
      objective: '1. Replace the injured player',
      action: INJURE_PLAYER,
      getPlayer: getStartingPlayer,
      playerAssignment: PlayerAssignments.INJURED,
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
  if (!team) {
    return '';
  }

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
    logoLg: bluebearsLg,
    logoSm: bluebearsSm,
    name: 'Blue Bears',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#0F3999',
  },
  {
    teamRank: 50,
    logoLg: redrabbitsLg,
    logoSm: redrabbitsSm,
    name: 'Red Rabbits',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#DC384C',
  },
  {
    teamRank: 55,
    logoLg: pinkpanthersLg,
    logoSm: pinkpanthersSm,
    name: 'Purple Panthers',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#20124E',
  },
  {
    teamRank: 80,
    logoLg: whitewolvesLg,
    logoSm: whitewolvesSm,
    name: 'White Wolves',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#00FFDA',
  },
  {
    teamRank: 65,
    logoLg: greengiraffesLg,
    logoSm: greengiraffesSm,
    name: 'Green Giraffes',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#00EA3D',
  },
  {
    teamRank: 75,
    logoLg: pinkpandasLg,
    logoSm: pinkpandasSm,
    name: 'Pink Pandas',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#E1B7EA',
  },
  {
    teamRank: 65,
    logoLg: orangeowlsLg,
    logoSm: orangeowlsSm,
    name: 'Orange Owls',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: 'FFBC4F',
  },
  {
    teamRank: 70,
    logoLg: silverspidersLg,
    logoSm: silverspidersSm,
    name: 'Silver Spiders',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#CBCBCB',
  },
  {
    teamRank: 55,
    logoLg: goldengeckosLg,
    logoSm: goldengeckosSm,
    name: 'Golden Geckos',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#F9E535',
  },
  {
    teamRank: 70,
    logoLg: yellowyaksLg,
    logoSm: yellowyaksSm,
    name: 'Yellow Yaks',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '12th',
    color: '#F8EE90',
  },
  {
    teamRank: 75,
    logoLg: blackbeaversLg,
    logoSm: blackbeaversSm,
    name: 'Black Beavers',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '10th',
    color: '#3F3F3F',
  },
  {
    teamRank: 70,
    logoLg: graygrasshoppersLg,
    logoSm: graygrasshoppersSm,
    name: 'Gray Grasshoppers',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#CECECE',
  },
];
