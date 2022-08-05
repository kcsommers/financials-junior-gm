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

const BASE_URL = 'https://drive.google.com/uc?export=download&id=';

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

export const GamePhases = {
  READY: 'READY',
  UP_NEXT: 'UP_NEXT',
  WARMING_UP: 'WARMING_UP',
  GAME_ON: 'GAME_ON',
  GAME_OVER: 'GAME_OVER',
  GAME_HIGHLIGHT: 'GAME_HIGHLIGHT',
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
    videos: {
      gameOn: `${BASE_URL}1oPh4X6k_bY5M8rYYFvklzvXwtkQEXmFp`,
    },
  },
  {
    teamRank: 50,
    logo: redrabbitsLogo,
    name: 'Red Rabbits',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#DC384C',
    videos: {
      gameOn: `${BASE_URL}1dd2pjPatwHz4mIwFetxeF56rKZ02Axt_`,
    },
  },
  {
    teamRank: 55,
    logo: pinkpanthersLogo,
    name: 'Purple Panthers',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#20124E',
    videos: {
      gameOn: `${BASE_URL}1G_Ioyiet_9cbi5Rpds4hnNkhwyxp7-5y`,
    },
  },
  {
    teamRank: 80,
    logo: whitewolvesLogo,
    name: 'White Wolves',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#00FFDA',
    videos: {
      gameOn: `${BASE_URL}1wPBJ2lZJo5K6Ywba7FoudL9Ey188BnBL`,
    },
  },
  {
    teamRank: 65,
    logo: greengiraffesLogo,
    name: 'Green Giraffes',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#00EA3D',
    videos: {
      gameOn: `${BASE_URL}1oPh4X6k_bY5M8rYYFvklzvXwtkQEXmFp`,
    },
  },
  {
    teamRank: 75,
    logo: pinkpandasLogo,
    name: 'Pink Pandas',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#E1B7EA',
    videos: {
      gameOn: `${BASE_URL}1dd2pjPatwHz4mIwFetxeF56rKZ02Axt_`,
    },
  },
  {
    teamRank: 65,
    logo: orangeowlsLogo,
    name: 'Orange Owls',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#FFBC4F',
    videos: {
      gameOn: `${BASE_URL}1G_Ioyiet_9cbi5Rpds4hnNkhwyxp7-5y`,
    },
  },
  {
    teamRank: 70,
    logo: silverspidersLogo,
    name: 'Silver Spiders',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#CBCBCB',
    videos: {
      gameOn: `${BASE_URL}1wPBJ2lZJo5K6Ywba7FoudL9Ey188BnBL`,
    },
  },
  {
    teamRank: 55,
    logo: goldengeckosLogo,
    name: 'Golden Geckos',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#F9E535',
    videos: {
      gameOn: `${BASE_URL}1oPh4X6k_bY5M8rYYFvklzvXwtkQEXmFp`,
    },
  },
  {
    teamRank: 70,
    logo: yellowyaksLogo,
    name: 'Yellow Yaks',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '12th',
    color: '#F8EE90',
    videos: {
      gameOn: `${BASE_URL}1dd2pjPatwHz4mIwFetxeF56rKZ02Axt_`,
    },
  },
  {
    teamRank: 75,
    logo: blackbeaversLogo,
    name: 'Black Beavers',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '10th',
    color: '#3F3F3F',
    videos: {
      gameOn: `${BASE_URL}1G_Ioyiet_9cbi5Rpds4hnNkhwyxp7-5y`,
    },
  },
  {
    teamRank: 70,
    logo: graygrasshoppersLogo,
    name: 'Gray Grasshoppers',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#CECECE',
    videos: {
      gameOn: `${BASE_URL}1wPBJ2lZJo5K6Ywba7FoudL9Ey188BnBL`,
    },
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
    videos: {
      gameOn:
        'https://www.dropbox.com/s/hdi6y7joiccy5v9/blichy%20goal%202%20against%20bakersfield.mp4?raw=1',
    },
  },
  {
    teamRank: 294,
    logo: gullsLogo,
    name: 'San Diego Gulls',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#F47937',
    videos: {
      gameOn:
        'https://www.dropbox.com/s/5ikl0phcprh2aej/blichy%20goal%20against%20bakersfield.mp4?raw=1',
    },
  },
  {
    teamRank: 275,
    logo: heatLogo,
    name: 'Stockton Heat',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#D01E2D',
    videos: {
      gameOn:
        'https://www.dropbox.com/s/74lggon9oy4q00c/reedy%20goal%20against%20stockton.mp4?raw=1',
    },
  },
  {
    teamRank: 280,
    logo: eaglesLogo,
    name: 'Colorado Eagles',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#FCD659',
    videos: {
      gameOn:
        'https://www.dropbox.com/s/o3xjalf45ag66hs/Gregor%20goal%20against%20Colorado.mp4?raw=1',
    },
  },
  {
    teamRank: 265,
    logo: reignLogo,
    name: 'Ontario Reign',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#221E20',
    videos: {
      gameOn:
        'https://www.dropbox.com/s/hv5butczqfn5wtn/Leonard%20goal%20against%20Colorado.mp4?raw=1',
    },
  },
  {
    teamRank: 275,
    logo: silverKnightsLogo,
    name: 'Henderson Silver Knights',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#C1C5C7',
    videos: {
      gameOn:
        'https://www.dropbox.com/s/vjiggj8wnq7u2pe/Meloche%20goal%20against%20Colorado.mp4?raw=1',
    },
  },
  {
    teamRank: 265,
    logo: roadRunnersLogo,
    name: 'Tucson Roadrunners',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#900028',
    videos: {
      gameOn:
        'https://www.dropbox.com/s/o83k48zsln7gn7v/Merkley%20goal%20against%20Colorado.mp4?raw=1',
    },
  },
  {
    teamRank: 270,
    logo: texasStarsLogo,
    name: 'Texas Stars',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#045F34',
    videos: {
      gameOn:
        'https://www.dropbox.com/s/dt23j4yq2w82mql/Reedy%20goal%20against%20bakersfield.mp4?raw=1',
    },
  },
  {
    teamRank: 255,
    logo: iowaWildLogo,
    name: 'Iowa Wild',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#004730',
    videos: {
      gameOn:
        'https://www.dropbox.com/s/c7195lmj0a8wv94/save%20against%20bakersfield%201.mp4?raw=1',
    },
  },
  {
    teamRank: 270,
    logo: mooseLogo,
    name: 'Manitoba Moose',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '12th',
    color: '#0E2749',
    videos: {
      gameOn:
        'https://www.dropbox.com/s/ij6kiv1l9mbgexd/save%20against%20stockton%202.mp4?raw=1',
    },
  },
  {
    teamRank: 275,
    logo: iceHogsLogo,
    name: 'Rockford Icehogs',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '10th',
    color: '#AA272E',
    videos: {
      gameOn:
        'https://www.dropbox.com/s/6jy409p6qwui9rw/save%20against%20stockton%203.mp4?raw=1',
    },
  },
  {
    teamRank: 270,
    logo: wolvesLogo,
    name: 'Chicago Wolves',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#929283',
    videos: {
      gameOn:
        'https://www.dropbox.com/s/4k95ctegfqtirrm/save%20against%20stockton%204.mp4?raw=1',
    },
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
    videos: {
      gameOn: `${BASE_URL}1oPh4X6k_bY5M8rYYFvklzvXwtkQEXmFp`,
      gameOver: {
        loss: `${BASE_URL}16eGdmNdbxWXYh6PsZ_XEDC14wK-Ac87P`,
        win: `${BASE_URL}18V-3NoSaKkBhfnXfDI_Az2lefB4Xh7C4`,
      },
    },
  },
  {
    teamRank: 490,
    logo: coyotesLogo,
    name: 'Arizona Coyotes',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#900028',
    videos: {
      gameOn: `${BASE_URL}1dd2pjPatwHz4mIwFetxeF56rKZ02Axt_`,
      gameOver: {
        win: `${BASE_URL}1frVTBwuhDPEpRKd9gK2WF0xFMAWEdlDS`,
        loss: `${BASE_URL}1nv6s08mnibCkMOGHQyG-zxZT-R5vFc_E`,
      },
    },
  },
  {
    teamRank: 455,
    logo: flamesLogo,
    name: 'Calgary Flames',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#DD0024',
    videos: {
      gameOn: `${BASE_URL}1G_Ioyiet_9cbi5Rpds4hnNkhwyxp7-5y`,
      gameOver: {
        loss: `${BASE_URL}1DdV-IXh_tbDz_JotqQuC7NveLoe2zfnt`,
        win: `${BASE_URL}1iAU9azLhply4wFojyCguhMCdiDrqGw73`,
      },
    },
  },
  {
    teamRank: 480,
    logo: oilersLogo,
    name: 'Edmonton Oilers',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#002147',
    videos: {
      gameOn: `${BASE_URL}1wPBJ2lZJo5K6Ywba7FoudL9Ey188BnBL`,
      gameOver: {
        loss: `${BASE_URL}1C40cdlpPEahpTHnJt11AFgjPjKMoyvB4`,
        win: `${BASE_URL}1tbmsIS19EVH9YAUGbF39nJjRcmVl_-Rr`,
      },
    },
  },
  {
    teamRank: 465,
    logo: kingsLogo,
    name: 'Los Angeles Kings',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#231F20',
    videos: {
      gameOn: `${BASE_URL}1oPh4X6k_bY5M8rYYFvklzvXwtkQEXmFp`,
      gameOver: {
        loss: `${BASE_URL}154_Yjpz8zr93rJlnfAjuSwXgvAUyM3MX`,
        win: `${BASE_URL}1SaKMEvxj7UTnQSXUMp4uCz9bYYt4LGM-`,
      },
    },
  },
  {
    teamRank: 475,
    logo: canucksLogo,
    name: 'Vancouver Canucks',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#002D56',
    videos: {
      gameOn: `${BASE_URL}1dd2pjPatwHz4mIwFetxeF56rKZ02Axt_`,
      gameOver: {
        win: `${BASE_URL}16qHCeq_NyQ2hK94k9JyDL_Py4IyjaWw1`,
        loss: `${BASE_URL}1F2mjDyzKbln95tQaevV1PlnLFEiRFIXf`,
      },
    },
  },
  {
    teamRank: 465,
    logo: goldenKnightsLogo,
    name: 'Vegas Golden Knights',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#8D744A',
    videos: {
      gameOn: `${BASE_URL}1G_Ioyiet_9cbi5Rpds4hnNkhwyxp7-5y`,
      gameOver: {
        win: `${BASE_URL}1G8dOcYotW73_akjM16hxhQ0Q-4Gd8opO`,
        loss: `${BASE_URL}1JcZz5ghEu117qPwtpQNax4QBOgNf8OQ0`,
      },
    },
  },
  {
    teamRank: 470,
    logo: dallasStarsLogo,
    name: 'Dallas Stars',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#124733',
    videos: {
      gameOn: `${BASE_URL}1wPBJ2lZJo5K6Ywba7FoudL9Ey188BnBL`,
      gameOver: {
        win: `${BASE_URL}1ClF4BaO7oquZc5OFMN1Nxc0Ey--esNID`,
        loss: `${BASE_URL}1hHfMzIaVIgJ6D1j-AVYqcLK0jZ_LqwZK`,
      },
    },
  },
  {
    teamRank: 455,
    logo: avalancheLogo,
    name: 'Colorado Avalanche',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#6E263C',
    videos: {
      gameOn: `${BASE_URL}1oPh4X6k_bY5M8rYYFvklzvXwtkQEXmFp`,
      gameOver: {
        loss: `${BASE_URL}1-d1MtoO15oC1kEL71FdnVVpbWD4_tKjV`,
        win: `${BASE_URL}16sLL01blwI6cTJF-HvDrqQB1Tb8Kgayy`,
      },
    },
  },
  {
    teamRank: 470,
    logo: jetsLogo,
    name: 'Winnipeg Jets',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '12th',
    color: '#081F3F',
    videos: {
      gameOn: `${BASE_URL}1dd2pjPatwHz4mIwFetxeF56rKZ02Axt_`,
      gameOver: {
        loss: `${BASE_URL}1eSs9a-q_RG0lTwR3RLMLKsub6_NnoOSi`,
        win: `${BASE_URL}1Fqf7zF2gTZrlb00DLZnMnuVuwYOQJicV`,
      },
    },
  },
  {
    teamRank: 475,
    logo: minnesotaWildLogo,
    name: 'Minnesota Wild',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '10th',
    color: '#124733',
    videos: {
      gameOn: `${BASE_URL}1G_Ioyiet_9cbi5Rpds4hnNkhwyxp7-5y`,
      gameOver: {
        win: `${BASE_URL}1RX7CmBJb-BL-H-B7BOcpdefAmBSBMIsF`,
        loss: `${BASE_URL}1m2AcFM5tgA94jOKSC4WaMKv0yfd2GVsZ`,
      },
    },
  },
  {
    teamRank: 470,
    logo: bluesLogo,
    name: 'St. Louis Blues',
    stats: { wins: 0, losses: 0, points: 0 },
    standings: '6th',
    color: '#002F86',
    videos: {
      gameOn: `${BASE_URL}1wPBJ2lZJo5K6Ywba7FoudL9Ey188BnBL`,
      gameOver: {
        win: `${BASE_URL}1b3XZU0gSup21cYiMzaw5SNQuXM_1IJPl`,
        loss: `${BASE_URL}1t1CjEDwZGs4W9_kOcBMHT8fmf9_-7Kbi`,
      },
    },
  },
];

export const getTeamVideos = (level) => {
  let videos = [];
  if (!level) {
    videos = [
      ...levelOneOpponents,
      ...levelTwoOpponents,
      ...levelThreeOpponents,
    ];
  } else if (+level === 1) {
    videos = [...levelOneOpponents];
  } else if (+level === 2) {
    videos = [...levelTwoOpponents];
  } else if (+level === 3) {
    videos = [...levelThreeOpponents];
  }
  return videos.reduce((links, team) => {
    if (!team.videos) {
      return links;
    }
    if (team.videos.gameOn) {
      links.push(team.videos.gameOn);
    }
    if (team.videos.gameOver) {
      links.push(team.videos.gameOver.win);
      links.push(team.videos.gameOver.loss);
    }
    return links;
  }, []);
};
