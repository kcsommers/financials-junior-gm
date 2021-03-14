import bluebearsLogo from '@images/icons/team-logos/bluebearsLg.svg';
import redrabbitsLogo from '@images/icons/team-logos/redrabbitsLg.svg';
import pinkpanthersLogo from '@images/icons/team-logos/pinkpanthersLg.svg';
import yellowyaksLogo from '@images/icons/team-logos/yellowyaksLg.svg';
import greengiraffesLogo from '@images/icons/team-logos/greengiraffesLg.svg';
import goldengeckosLogo from '@images/icons/team-logos/goldengeckosLg.svg';
import graygrasshoppersLogo from '@images/icons/team-logos/graygrasshoppersLg.svg';
import orangeowlsLogo from '@images/icons/team-logos/orangeowlsLg.svg';
import silverspidersLogo from '@images/icons/team-logos/silverspidersLg.svg';
import whitewolvesLogo from '@images/icons/team-logos/whitewolvesLg.svg';
import pinkpandasLogo from '@images/icons/team-logos/pinkpandasLg.svg';
import blackbeaversLogo from '@images/icons/team-logos/blackbeaversLg.svg';
import jrSharksLogo from '@images/icons/jr-sharks-logo-lg.svg';
import sjbarracudalogo from '@images/icons/sjbarracuda-logo.svg';
import sjsharkslogo from '@images/icons/sjsharkslogo.svg';
import { INJURE_PLAYER } from '@redux/actions';
import { PlayerAssignments, TeamAssignments } from '@data/players/players';
import { cloneDeep } from 'lodash';
import { initPlayersByLevel, updateStudentById } from './../../api-helper';

export const resetSeason = (newLevel, prevLevel, student) => {
  return new Promise((resolve, reject) => {
    const clonedSeasons = cloneDeep(student.seasons);
    clonedSeasons[newLevel - 1] = [];

    const studentUpdates = {
      seasons: clonedSeasons,
      level: newLevel,
      objectives: {},
    };

    if (newLevel > prevLevel) {
      studentUpdates.rollOverBudget = 0;
    }

    updateStudentById(student._id, studentUpdates)
      .then((res) => {
        if (!res.success || !res.updatedStudent) {
          console.error(new Error('Unexpected error updating student season'));
          return;
        }

        initPlayersByLevel(newLevel)
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

export const getGameResult = (studentTeamRank, opponent) => {
  const possibleScores = [
    [
      [5, 0],
      [5, 1],
      [5, 2],
      [5, 3],
      [4, 0],
      [4, 1],
      [4, 2],
      [3, 0],
      [3, 1],
      [6, 2],
      [6, 3],
      [6, 4],
      [7, 2],
      [7, 3],
      [7, 4],
    ],
    [
      [1, 0],
      [2, 1],
      [3, 0],
      [3, 1],
      [4, 0],
      [4, 1],
      [4, 2],
      [5, 0],
      [5, 1],
      [5, 2],
      [5, 3],
      [6, 1],
      [6, 2],
      [6, 3],
      [6, 4],
      [7, 3],
      [7, 4],
      [7, 5],
    ],
    [
      [1, 0],
      [2, 0],
      [2, 1],
      [3, 0],
      [3, 1],
      [3, 2],
      [4, 0],
      [4, 1],
      [4, 2],
      [4, 3],
      [5, 1],
      [5, 2],
      [5, 3],
      [5, 4],
      [6, 2],
      [6, 3],
      [6, 4],
      [6, 5],
      [7, 3],
      [7, 4],
      [7, 5],
    ],
    [
      [1, 0],
      [2, 1],
      [3, 2],
      [4, 3],
      [5, 4],
    ],
  ];

  const rankDiff = Math.abs(studentTeamRank - opponent.teamRank);

  let scoresIndex;
  if (rankDiff > 50) {
    scoresIndex = 0;
  } else if (rankDiff > 20 && rankDiff <= 50) {
    scoresIndex = 1;
  } else if (rankDiff > 5 && rankDiff <= 20) {
    scoresIndex = 2;
  } else {
    scoresIndex = 3;
  }

  const score =
    possibleScores[scoresIndex][
      Math.floor(Math.random() * possibleScores[scoresIndex].length)
    ];

  let messageIndex;
  let win;
  let points;
  if (studentTeamRank >= opponent.teamRank) {
    win = true;
    points = 2;
    messageIndex = scoresIndex === 3 ? 1 : 0;
  } else {
    win = false;
    points = scoresIndex === 3 ? 1 : 0;
    messageIndex = scoresIndex === 3 ? 2 : 3;
    const oppScore = score[0];
    const studentScore = score[1];
    score[0] = studentScore;
    score[1] = oppScore;
  }

  return {
    score,
    messageIndex,
    points,
    win,
    opponent: opponent.name,
  };
};

const getSecondHighestPlayer = (team) => {
  return Object.keys(team)
    .filter((p) => !TeamAssignments.bench.includes(p))
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
      objective: 'Replace the injured player',
      action: INJURE_PLAYER,
      getPlayer: getSecondHighestPlayer,
      playerAssignment: PlayerAssignments.UNAVAILABLE,
      player: null,
      gameButtonLabel: 'Click the puck to sign a new player!',
      gameButtonAction: (team, history) => history.push('/team'),
    },
    {
      message: 'OH NO! One of your players was injured',
      objective: 'Replace the injured player',
      action: INJURE_PLAYER,
      getPlayer: getStartingPlayer,
      playerAssignment: PlayerAssignments.UNAVAILABLE,
      player: null,
      gameButtonLabel: 'Click the puck to sign a new player!',
      gameButtonAction: (team, history) => history.push('/team'),
    },
  ],
  2: [
    {
      message: 'OH NO! One of your players was injured',
      objective: 'Replace the injured player',
      action: INJURE_PLAYER,
      getPlayer: getSecondHighestPlayer,
      playerAssignment: PlayerAssignments.UNAVAILABLE,
      player: null,
      gameButtonLabel: 'Click the puck to sign a new player!',
      gameButtonAction: (team, history) => history.push('/team'),
    },
    {
      message: 'OH NO! One of your players was injured',
      objective: 'Replace the injured player',
      action: INJURE_PLAYER,
      getPlayer: getStartingPlayer,
      playerAssignment: PlayerAssignments.UNAVAILABLE,
      player: null,
      gameButtonLabel: 'Click the puck to sign a new player!',
      gameButtonAction: (team, history) => history.push('/team'),
    },
  ],
  3: [
    {
      message: 'OH NO! One of your players was injured',
      objective: 'Replace the injured player',
      action: INJURE_PLAYER,
      getPlayer: getSecondHighestPlayer,
      playerAssignment: PlayerAssignments.UNAVAILABLE,
      player: null,
      gameButtonLabel: 'Click the puck to sign a new player!',
      gameButtonAction: (team, history) => history.push('/team'),
    },
    {
      message: 'OH NO! One of your players was injured',
      objective: 'Replace the injured player',
      action: INJURE_PLAYER,
      getPlayer: getStartingPlayer,
      playerAssignment: PlayerAssignments.UNAVAILABLE,
      player: null,
      gameButtonLabel: 'Click the puck to sign a new player!',
      gameButtonAction: (team, history) => history.push('/team'),
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

export const gamePhases = (level) => [
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
      `GET LOUD! The ${studentTeams[level - 1].name} Won!`,
      `CLOSE! The ${studentTeams[level - 1].name} won in overtime!`,
      `CLOSE! The ${studentTeams[level - 1].name} lost in overtime!`,
      `OH NO! The ${studentTeams[level - 1].name} lost :(`,
    ],
  },
  {
    phase: GamePhases.TRANSITION,
    messages: [
      'The next game starts in 5',
      'The next game starts in 4',
      'The next game starts in 3',
      'The next game starts in 2',
      'The next game starts in 1',
    ],
    messageTimer: 1000,
  },
];

export const getRandomTeamRank = (level) => {
  if (level === 1) {
    return Math.floor(Math.random() * (95 - 70) + 70);
  }

  if (level === 2) {
    return Math.floor(Math.random() * (295 - 240) + 240);
  }

  if (level === 3) {
    return Math.floor(Math.random() * (490 - 425) + 425);
  }
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
  let opponents = levelOneOpponents;
  if (level === 2) {
    opponents = levelTwoOpponents;
  } else if (level === 3) {
    opponents = levelThreeOpponents;
  }

  const clonedTeams = cloneDeep(opponents);
  return clonedTeams.map((t) => {
    t.teamRank = getRandomTeamRank(level);
    return t;
  });
};

export const studentTeams = [
  {
    name: 'Jr. Sharks',
    nameFull: 'San Jose Jr. Sharks',
    stats: { wins: 0, losses: 0, points: 0 },
    logo: jrSharksLogo,
  },
  {
    name: 'Barracuda',
    nameFull: 'San Jose Barracuda',
    stats: { wins: 0, losses: 0, points: 0 },
    logo: sjbarracudalogo,
  },
  {
    name: 'Sharks',
    nameFull: 'San Jose Sharks',
    stats: { wins: 0, losses: 0, points: 0 },
    logo: sjsharkslogo,
  },
];

export const getStudentTeam = (level) => {
  return studentTeams[level - 1];
};

export const levelOneOpponents = [
  {
    teamRank: 35,
    logo: bluebearsLogo,
    name: 'Blue Bears',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#0F3999',
  },
  {
    teamRank: 50,
    logo: redrabbitsLogo,
    name: 'Red Rabbits',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#DC384C',
  },
  {
    teamRank: 55,
    logo: pinkpanthersLogo,
    name: 'Purple Panthers',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#20124E',
  },
  {
    teamRank: 80,
    logo: whitewolvesLogo,
    name: 'White Wolves',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#00FFDA',
  },
  {
    teamRank: 65,
    logo: greengiraffesLogo,
    name: 'Green Giraffes',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#00EA3D',
  },
  {
    teamRank: 75,
    logo: pinkpandasLogo,
    name: 'Pink Pandas',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#E1B7EA',
  },
  {
    teamRank: 65,
    logo: orangeowlsLogo,
    name: 'Orange Owls',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: 'FFBC4F',
  },
  {
    teamRank: 70,
    logo: silverspidersLogo,
    name: 'Silver Spiders',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#CBCBCB',
  },
  {
    teamRank: 55,
    logo: goldengeckosLogo,
    name: 'Golden Geckos',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#F9E535',
  },
  {
    teamRank: 70,
    logo: yellowyaksLogo,
    name: 'Yellow Yaks',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '12th',
    color: '#F8EE90',
  },
  {
    teamRank: 75,
    logo: blackbeaversLogo,
    name: 'Black Beavers',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '10th',
    color: '#3F3F3F',
  },
  {
    teamRank: 70,
    logo: graygrasshoppersLogo,
    name: 'Gray Grasshoppers',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#CECECE',
  },
];

export const levelTwoOpponents = [
  {
    teamRank: 241,
    name: 'Bakersfield Condors',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#4b4b4b',
  },
  {
    teamRank: 294,
    name: 'Sand Diego Gulls',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#4b4b4b',
  },
  {
    teamRank: 275,
    name: 'Stockton Heat',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#4b4b4b',
  },
  {
    teamRank: 280,
    name: 'Colorado Eagles',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#4b4b4b',
  },
  {
    teamRank: 265,
    name: 'Ontario Reign',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#4b4b4b',
  },
  {
    teamRank: 275,
    name: 'Henderson Silver Knights',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#4b4b4b',
  },
  {
    teamRank: 265,
    name: 'Tucson Roadrunners',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#4b4b4b',
  },
  {
    teamRank: 270,
    name: 'Texas Stars',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#4b4b4b',
  },
  {
    teamRank: 255,
    name: 'Iowa Wild',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#4b4b4b',
  },
  {
    teamRank: 270,
    name: 'Manitoba Moose',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '12th',
    color: '#4b4b4b',
  },
  {
    teamRank: 275,
    name: 'Rockford Icehogs',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '10th',
    color: '#4b4b4b',
  },
  {
    teamRank: 270,
    name: 'Chicago Wolves',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#4b4b4b',
  },
];

export const levelThreeOpponents = [
  {
    teamRank: 425,
    name: 'Anaheim Ducks',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#4b4b4b',
  },
  {
    teamRank: 490,
    name: 'Arizona Coyotes',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#4b4b4b',
  },
  {
    teamRank: 455,
    name: 'Calgary Flames',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#4b4b4b',
  },
  {
    teamRank: 480,
    name: 'Edmonton Oilers',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#4b4b4b',
  },
  {
    teamRank: 465,
    name: 'Los Angeles Kings',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#4b4b4b',
  },
  {
    teamRank: 475,
    name: 'Vancouver Canucks',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#4b4b4b',
  },
  {
    teamRank: 465,
    name: 'Vegas Golden Knights',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#4b4b4b',
  },
  {
    teamRank: 470,
    name: 'Dallas Stars',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#4b4b4b',
  },
  {
    teamRank: 455,
    name: 'Colorado Avalanche',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#4b4b4b',
  },
  {
    teamRank: 470,
    name: 'Winnipeg Jets',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '12th',
    color: '#4b4b4b',
  },
  {
    teamRank: 475,
    name: 'Minnesota Wild',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '10th',
    color: '#4b4b4b',
  },
  {
    teamRank: 470,
    name: 'St. Louis Blues',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#4b4b4b',
  },
];
