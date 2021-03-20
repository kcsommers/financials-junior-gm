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
import condorsLogo from '@images/icons/team-logos/ahl/bakersfieldcondorsLG.png';
import wolvesLogo from '@images/icons/team-logos/ahl/chicagowolvesLG.png';
import eaglesLogo from '@images/icons/team-logos/ahl/coloradoeaglesLG.png';
import silverKnightsLogo from '@images/icons/team-logos/ahl/hendersonsilverknightsLG.png';
import iowaWildLogo from '@images/icons/team-logos/ahl/iowawildLG.png';
import mooseLogo from '@images/icons/team-logos/ahl/manitobamooseLG.png';
import reignLogo from '@images/icons/team-logos/ahl/ontarioreignLG.png';
import iceHogsLogo from '@images/icons/team-logos/ahl/rockfordicehogsLG.png';
import gullsLogo from '@images/icons/team-logos/ahl/sandiegogullsLG.png';
import heatLogo from '@images/icons/team-logos/ahl/stocktonheatLG.png';
import texasStarsLogo from '@images/icons/team-logos/ahl/texasstarsLG.png';
import roadRunnersLogo from '@images/icons/team-logos/ahl/tucsonroadrunnersLG.png';
import ducksLogo from '@images/icons/team-logos/nhl/anaheimducksLG.png';
import coyotesLogo from '@images/icons/team-logos/nhl/arizonacoyotesLG.png';
import flamesLogo from '@images/icons/team-logos/nhl/calgaryflamesLG.png';
import avalancheLogo from '@images/icons/team-logos/nhl/coloradoavalancheLG.png';
import dallasStarsLogo from '@images/icons/team-logos/nhl/dallasstarsLG.png';
import oilersLogo from '@images/icons/team-logos/nhl/edmontonoilersLG.png';
import kingsLogo from '@images/icons/team-logos/nhl/losangeleskingsLG.png';
import minnesotaWildLogo from '@images/icons/team-logos/nhl/minnesotawildLG.png';
import bluesLogo from '@images/icons/team-logos/nhl/stlouisbluesLG.png';
import canucksLogo from '@images/icons/team-logos/nhl/vancouvercanucksLG.png';
import goldenKnightsLogo from '@images/icons/team-logos/nhl/vegasgoldenknightsLG.png';
import jetsLogo from '@images/icons/team-logos/nhl/winnipegjetsLG.png';

import { INJURE_PLAYER } from '@redux/actions';
import { PlayerAssignments, TeamAssignments } from '@data/players/players';

export const possibleScores = [
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
    logo: condorsLogo,
    name: 'Bakersfield Condors',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#FA4C06',
  },
  {
    teamRank: 294,
    logo: gullsLogo,
    name: 'San Diego Gulls',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#F47937',
  },
  {
    teamRank: 275,
    logo: heatLogo,
    name: 'Stockton Heat',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#D01E2D',
  },
  {
    teamRank: 280,
    logo: eaglesLogo,
    name: 'Colorado Eagles',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#FCD659',
  },
  {
    teamRank: 265,
    logo: reignLogo,
    name: 'Ontario Reign',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#221E20',
  },
  {
    teamRank: 275,
    logo: silverKnightsLogo,
    name: 'Henderson Silver Knights',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#C1C5C7',
  },
  {
    teamRank: 265,
    logo: roadRunnersLogo,
    name: 'Tucson Roadrunners',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#900028',
  },
  {
    teamRank: 270,
    logo: texasStarsLogo,
    name: 'Texas Stars',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#045F34',
  },
  {
    teamRank: 255,
    logo: iowaWildLogo,
    name: 'Iowa Wild',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#004730',
  },
  {
    teamRank: 270,
    logo: mooseLogo,
    name: 'Manitoba Moose',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '12th',
    color: '#0E2749',
  },
  {
    teamRank: 275,
    logo: iceHogsLogo,
    name: 'Rockford Icehogs',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '10th',
    color: '#AA272E',
  },
  {
    teamRank: 270,
    logo: wolvesLogo,
    name: 'Chicago Wolves',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#929283',
  },
];

export const levelThreeOpponents = [
  {
    teamRank: 425,
    logo: ducksLogo,
    name: 'Anaheim Ducks',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#BC9C64',
  },
  {
    teamRank: 490,
    logo: coyotesLogo,
    name: 'Arizona Coyotes',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#900028',
  },
  {
    teamRank: 455,
    logo: flamesLogo,
    name: 'Calgary Flames',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#DD0024',
  },
  {
    teamRank: 480,
    logo: oilersLogo,
    name: 'Edmonton Oilers',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#002147',
  },
  {
    teamRank: 465,
    logo: kingsLogo,
    name: 'Los Angeles Kings',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#231F20',
  },
  {
    teamRank: 475,
    logo: canucksLogo,
    name: 'Vancouver Canucks',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#002D56',
  },
  {
    teamRank: 465,
    logo: goldenKnightsLogo,
    name: 'Vegas Golden Knights',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#8D744A',
  },
  {
    teamRank: 470,
    logo: dallasStarsLogo,
    name: 'Dallas Stars',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#124733',
  },
  {
    teamRank: 455,
    logo: avalancheLogo,
    name: 'Colorado Avalanche',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#6E263C',
  },
  {
    teamRank: 470,
    logo: jetsLogo,
    name: 'Winnipeg Jets',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '12th',
    color: '#081F3F',
  },
  {
    teamRank: 475,
    logo: minnesotaWildLogo,
    name: 'Minnesota Wild',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '10th',
    color: '#124733',
  },
  {
    teamRank: 470,
    logo: bluesLogo,
    name: 'St. Louis Blues',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#002F86',
  },
];
