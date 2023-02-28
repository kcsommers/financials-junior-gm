import { getRandomTeamRank } from '@statrookie/core/src/game/season/stats';
import { OpposingTeam } from '@statrookie/core/src/game/teams/opposing-team.type';
import { omit } from 'lodash';
import Image from 'next/image';
import BlackBeaversLogo from '../../components/svg/blackbeavers.svg';
import BlueBearsLogo from '../../components/svg/bluebears.svg';
import GoldenGeckosLogo from '../../components/svg/goldengeckos.svg';
import GrayGrasshoppersLogo from '../../components/svg/graygrasshoppers.svg';
import GreenGiraffesLogo from '../../components/svg/greengiraffes.svg';
import OrangeOwlsLogo from '../../components/svg/orangeowls.svg';
import PinkPandasLogo from '../../components/svg/pinkpandas.svg';
import PurplePanthersLogo from '../../components/svg/purplepanthers.svg';
import RedRabbitsLogo from '../../components/svg/redrabbits.svg';
import SilverSpidersLogo from '../../components/svg/silverspiders.svg';
import WhiteWolvesLogo from '../../components/svg/whitewolves.svg';
import YellowYaksLogo from '../../components/svg/yellowyaks.svg';

const DRIVE_BASE_URL = 'https://drive.google.com/uc?export=download&id=';

export const opposingTeams: OpposingTeam[][] = [
  [
    {
      name: 'Blue Bears',
      getLogo: (props = {}) => (
        <BlueBearsLogo
          {...props}
          // @ts-ignore
          className={`${props.className || ''} translate-x-2`}
        />
      ),
      stats: {
        wins: 0,
        losses: 0,
        points: 0,
        standing: 1,
        rank: getRandomTeamRank(1),
      },
      color: '#0F3999',
      videos: {
        gameOn:
          'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/Sharkie+Make+Noise2.mp4',
      },
    },
    {
      name: 'Red Rabbits',
      getLogo: (props = {}) => (
        // @ts-ignore
        <RedRabbitsLogo {...props} />
      ),
      stats: {
        wins: 0,
        losses: 0,
        points: 0,
        standing: 2,
        rank: getRandomTeamRank(1),
      },
      color: '#DC384C',
      videos: {
        gameOn:
          'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/Sharkie+Make+Noise.mp4',
      },
    },
    {
      name: 'Purple Panthers',
      getLogo: (props = {}) => (
        // @ts-ignore
        <PurplePanthersLogo {...props} />
      ),
      stats: {
        wins: 0,
        losses: 0,
        points: 0,
        standing: 3,
        rank: getRandomTeamRank(1),
      },
      color: '#20124E',
      videos: {
        gameOn:
          'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/Sharkie+Make+Noise4.mp4',
      },
    },
    {
      name: 'White Wolves',
      getLogo: (props = {}) => (
        // @ts-ignore
        <WhiteWolvesLogo {...props} />
      ),
      stats: {
        wins: 0,
        losses: 0,
        points: 0,
        standing: 4,
        rank: getRandomTeamRank(1),
      },
      color: '#00FFDA',
      videos: {
        gameOn:
          'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/Sharkie+Make+Noise3.mp4',
      },
    },
    {
      name: 'Green Giraffes',
      getLogo: (props = {}) => (
        // @ts-ignore
        <GreenGiraffesLogo {...props} />
      ),
      stats: {
        wins: 0,
        losses: 0,
        points: 0,
        standing: 5,
        rank: getRandomTeamRank(1),
      },
      color: '#00EA3D',
      videos: {
        gameOn:
          'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/Sharkie+Make+Noise42.mp4',
      },
    },
    {
      name: 'Pink Pandas',
      getLogo: (props = {}) => (
        // @ts-ignore
        <PinkPandasLogo {...props} />
      ),
      stats: {
        wins: 0,
        losses: 0,
        points: 0,
        standing: 6,
        rank: getRandomTeamRank(1),
      },
      color: '#E1B7EA',
      videos: {
        gameOn:
          'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/Sharkie+Make+Noise4.mp4',
      },
    },
    {
      name: 'Orange Owls',
      getLogo: (props = {}) => (
        // @ts-ignore
        <OrangeOwlsLogo {...props} />
      ),
      stats: {
        wins: 0,
        losses: 0,
        points: 0,
        standing: 7,
        rank: getRandomTeamRank(1),
      },
      color: '#FFBC4F',
      videos: {
        gameOn:
          'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/Sharkie+Make+Noise.mp4',
      },
    },
    {
      name: 'Silver Spiders',
      getLogo: (props = {}) => (
        // @ts-ignore
        <SilverSpidersLogo {...props} />
      ),
      stats: {
        wins: 0,
        losses: 0,
        points: 0,
        standing: 8,
        rank: getRandomTeamRank(1),
      },
      color: '#CBCBCB',
      videos: {
        gameOn:
          'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/Sharkie+Make+Noise3.mp4',
      },
    },
    {
      name: 'Golden Geckos',
      getLogo: (props = {}) => (
        // @ts-ignore
        <GoldenGeckosLogo {...props} />
      ),
      stats: {
        wins: 0,
        losses: 0,
        points: 0,
        standing: 9,
        rank: getRandomTeamRank(1),
      },
      color: '#F9E535',
      videos: {
        gameOn:
          'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/Sharkie+Make+Noise2.mp4',
      },
    },
    {
      name: 'Yellow Yaks',
      getLogo: (props = {}) => (
        // @ts-ignore
        <YellowYaksLogo {...props} />
      ),
      stats: {
        wins: 0,
        losses: 0,
        points: 0,
        standing: 10,
        rank: getRandomTeamRank(1),
      },
      color: '#F8EE90',
      videos: {
        gameOn:
          'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/Sharkie+Make+Noise.mp4',
      },
    },
    {
      name: 'Black Beavers',
      getLogo: (props = {}) => (
        // @ts-ignore
        <BlackBeaversLogo {...props} />
      ),
      stats: {
        wins: 0,
        losses: 0,
        points: 0,
        standing: 11,
        rank: getRandomTeamRank(1),
      },
      color: '#3F3F3F',
      videos: {
        gameOn:
          'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/Sharkie+Make+Noise3.mp4',
      },
    },
    {
      name: 'Gray Grasshoppers',
      getLogo: (props = {}) => <GrayGrasshoppersLogo {...props} />,
      stats: {
        wins: 0,
        losses: 0,
        points: 0,
        standing: 12,
        rank: getRandomTeamRank(1),
      },
      color: '#CECECE',
      videos: {
        gameOn:
          'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/Sharkie+Make+Noise4.mp4',
      },
    },
  ],
  [
    {
      name: 'Bakersfield Condors',
      getLogo: (props = {}) => (
        <Image
          src="https://sharks-assets.s3.us-west-2.amazonaws.com/images/bakersfieldcondors.png"
          alt="Bakersfield Condors"
          fill={true}
          sizes="150px"
          style={{ objectFit: 'contain', padding: '0.25rem' }}
          {...props}
        />
      ),
      stats: {
        wins: 0,
        losses: 0,
        points: 0,
        standing: 1,
        rank: getRandomTeamRank(2),
      },
      color: '#FA4C06',
      videos: {
        gameOn:
          'https://www.dropbox.com/s/hdi6y7joiccy5v9/blichy%20goal%202%20against%20bakersfield.mp4?raw=1',
      },
    },
    {
      name: 'San Diego Gulls',
      getLogo: (props = {}) => (
        <Image
          src="https://sharks-assets.s3.us-west-2.amazonaws.com/images/sandiegogulls.png"
          alt="San Diego Gulls"
          fill={true}
          sizes="150px"
          style={{ objectFit: 'contain', padding: '0.25rem' }}
          {...props}
        />
      ),
      stats: {
        wins: 0,
        losses: 0,
        points: 0,
        rank: getRandomTeamRank(2),
        standing: 2,
      },
      color: '#F47937',
      videos: {
        gameOn:
          'https://www.dropbox.com/s/5ikl0phcprh2aej/blichy%20goal%20against%20bakersfield.mp4?raw=1',
      },
    },
    //   {
    //     teamRank: 275,
    //     logo: heatLogo,
    //     name: 'Stockton Heat',
    //     stats: { wins: 0, losses: 0, points: 0 },
    //     standings: '6th',
    //     color: '#D01E2D',
    //     videos: {
    //       gameOn:
    //         'https://www.dropbox.com/s/74lggon9oy4q00c/reedy%20goal%20against%20stockton.mp4?raw=1',
    //     },
    //   },
    //   {
    //     teamRank: 280,
    //     logo: eaglesLogo,
    //     name: 'Colorado Eagles',
    //     stats: { wins: 0, losses: 0, points: 0 },
    //     standings: '6th',
    //     color: '#FCD659',
    //     videos: {
    //       gameOn:
    //         'https://www.dropbox.com/s/o3xjalf45ag66hs/Gregor%20goal%20against%20Colorado.mp4?raw=1',
    //     },
    //   },
    //   {
    //     teamRank: 265,
    //     logo: reignLogo,
    //     name: 'Ontario Reign',
    //     stats: { wins: 0, losses: 0, points: 0 },
    //     standings: '6th',
    //     color: '#221E20',
    //     videos: {
    //       gameOn:
    //         'https://www.dropbox.com/s/hv5butczqfn5wtn/Leonard%20goal%20against%20Colorado.mp4?raw=1',
    //     },
    //   },
    //   {
    //     teamRank: 275,
    //     logo: silverKnightsLogo,
    //     name: 'Henderson Silver Knights',
    //     stats: { wins: 0, losses: 0, points: 0 },
    //     standings: '6th',
    //     color: '#C1C5C7',
    //     videos: {
    //       gameOn:
    //         'https://www.dropbox.com/s/vjiggj8wnq7u2pe/Meloche%20goal%20against%20Colorado.mp4?raw=1',
    //     },
    //   },
    //   {
    //     teamRank: 265,
    //     logo: roadRunnersLogo,
    //     name: 'Tucson Roadrunners',
    //     stats: { wins: 0, losses: 0, points: 0 },
    //     standings: '6th',
    //     color: '#900028',
    //     videos: {
    //       gameOn:
    //         'https://www.dropbox.com/s/o83k48zsln7gn7v/Merkley%20goal%20against%20Colorado.mp4?raw=1',
    //     },
    //   },
    //   {
    //     teamRank: 270,
    //     logo: texasStarsLogo,
    //     name: 'Texas Stars',
    //     stats: { wins: 0, losses: 0, points: 0 },
    //     standings: '6th',
    //     color: '#045F34',
    //     videos: {
    //       gameOn:
    //         'https://www.dropbox.com/s/dt23j4yq2w82mql/Reedy%20goal%20against%20bakersfield.mp4?raw=1',
    //     },
    //   },
    //   {
    //     teamRank: 255,
    //     logo: iowaWildLogo,
    //     name: 'Iowa Wild',
    //     stats: { wins: 0, losses: 0, points: 0 },
    //     standings: '6th',
    //     color: '#004730',
    //     videos: {
    //       gameOn:
    //         'https://www.dropbox.com/s/c7195lmj0a8wv94/save%20against%20bakersfield%201.mp4?raw=1',
    //     },
    //   },
    //   {
    //     teamRank: 270,
    //     logo: mooseLogo,
    //     name: 'Manitoba Moose',
    //     stats: { wins: 0, losses: 0, points: 0 },
    //     standings: '12th',
    //     color: '#0E2749',
    //     videos: {
    //       gameOn:
    //         'https://www.dropbox.com/s/ij6kiv1l9mbgexd/save%20against%20stockton%202.mp4?raw=1',
    //     },
    //   },
    //   {
    //     teamRank: 275,
    //     logo: iceHogsLogo,
    //     name: 'Rockford Icehogs',
    //     stats: { wins: 0, losses: 0, points: 0 },
    //     standings: '10th',
    //     color: '#AA272E',
    //     videos: {
    //       gameOn:
    //         'https://www.dropbox.com/s/6jy409p6qwui9rw/save%20against%20stockton%203.mp4?raw=1',
    //     },
    //   },
    //   {
    //     teamRank: 270,
    //     logo: wolvesLogo,
    //     name: 'Chicago Wolves',
    //     stats: { wins: 0, losses: 0, points: 0 },
    //     standings: '6th',
    //     color: '#929283',
    //     videos: {
    //       gameOn:
    //         'https://www.dropbox.com/s/4k95ctegfqtirrm/save%20against%20stockton%204.mp4?raw=1',
    //     },
    //   },
  ],

  [
    {
      name: 'Anaheim Ducks',
      getLogo: (props = {}) => (
        <Image
          src="https://sharks-assets.s3.us-west-2.amazonaws.com/images/anaheimducks.png"
          alt="Anaheim Ducks"
          fill={true}
          sizes="150px"
          style={{ objectFit: 'contain', padding: '0.25rem' }}
          {...omit(props, ['className'])}
        />
      ),
      stats: {
        wins: 0,
        losses: 0,
        points: 0,
        rank: getRandomTeamRank(3),
        standing: 1,
      },
      color: '#BC9C64',
      videos: {
        gameOn: `${DRIVE_BASE_URL}1oPh4X6k_bY5M8rYYFvklzvXwtkQEXmFp`,
        gameHighlight: {
          loss: `${DRIVE_BASE_URL}16eGdmNdbxWXYh6PsZ_XEDC14wK-Ac87P`,
          win: `${DRIVE_BASE_URL}18V-3NoSaKkBhfnXfDI_Az2lefB4Xh7C4`,
        },
      },
    },
    {
      name: 'Arizona Coyotes',
      getLogo: (props = {}) => (
        <Image
          src="https://sharks-assets.s3.us-west-2.amazonaws.com/images/arizonacoyotes.png"
          alt="Arizona Coyote"
          fill={true}
          sizes="150px"
          style={{ objectFit: 'contain', padding: '0.25rem' }}
          {...omit(props, ['className'])}
        />
      ),
      stats: {
        wins: 0,
        losses: 0,
        points: 0,
        rank: getRandomTeamRank(3),
        standing: 2,
      },
      color: '#900028',
      videos: {
        gameOn: `${DRIVE_BASE_URL}1dd2pjPatwHz4mIwFetxeF56rKZ02Axt_`,
        gameHighlight: {
          win: `${DRIVE_BASE_URL}1frVTBwuhDPEpRKd9gK2WF0xFMAWEdlDS`,
          loss: `${DRIVE_BASE_URL}1nv6s08mnibCkMOGHQyG-zxZT-R5vFc_E`,
        },
      },
    },
    //   {
    //     teamRank: 455,
    //     logo: flamesLogo,
    //     name: 'Calgary Flames',
    //     stats: { wins: 0, losses: 0, points: 0 },
    //     standings: '6th',
    //     color: '#DD0024',
    //     videos: {
    //       gameOn: `${DRIVE_BASE_URL}1G_Ioyiet_9cbi5Rpds4hnNkhwyxp7-5y`,
    //       gameOver: {
    //         loss: `${DRIVE_BASE_URL}1DdV-IXh_tbDz_JotqQuC7NveLoe2zfnt`,
    //         win: `${DRIVE_BASE_URL}1iAU9azLhply4wFojyCguhMCdiDrqGw73`,
    //       },
    //     },
    //   },
    //   {
    //     teamRank: 480,
    //     logo: oilersLogo,
    //     name: 'Edmonton Oilers',
    //     stats: { wins: 0, losses: 0, points: 0 },
    //     standings: '6th',
    //     color: '#002147',
    //     videos: {
    //       gameOn: `${DRIVE_BASE_URL}1wPBJ2lZJo5K6Ywba7FoudL9Ey188BnBL`,
    //       gameOver: {
    //         loss: `${DRIVE_BASE_URL}1C40cdlpPEahpTHnJt11AFgjPjKMoyvB4`,
    //         win: `${DRIVE_BASE_URL}1tbmsIS19EVH9YAUGbF39nJjRcmVl_-Rr`,
    //       },
    //     },
    //   },
    //   {
    //     teamRank: 465,
    //     logo: kingsLogo,
    //     name: 'Los Angeles Kings',
    //     stats: { wins: 0, losses: 0, points: 0 },
    //     standings: '6th',
    //     color: '#231F20',
    //     videos: {
    //       gameOn: `${DRIVE_BASE_URL}1oPh4X6k_bY5M8rYYFvklzvXwtkQEXmFp`,
    //       gameOver: {
    //         loss: `${DRIVE_BASE_URL}154_Yjpz8zr93rJlnfAjuSwXgvAUyM3MX`,
    //         win: `${DRIVE_BASE_URL}1SaKMEvxj7UTnQSXUMp4uCz9bYYt4LGM-`,
    //       },
    //     },
    //   },
    //   {
    //     teamRank: 475,
    //     logo: canucksLogo,
    //     name: 'Vancouver Canucks',
    //     stats: { wins: 0, losses: 0, points: 0 },
    //     standings: '6th',
    //     color: '#002D56',
    //     videos: {
    //       gameOn: `${DRIVE_BASE_URL}1dd2pjPatwHz4mIwFetxeF56rKZ02Axt_`,
    //       gameOver: {
    //         win: `${DRIVE_BASE_URL}16qHCeq_NyQ2hK94k9JyDL_Py4IyjaWw1`,
    //         loss: `${DRIVE_BASE_URL}1F2mjDyzKbln95tQaevV1PlnLFEiRFIXf`,
    //       },
    //     },
    //   },
    //   {
    //     teamRank: 465,
    //     logo: goldenKnightsLogo,
    //     name: 'Vegas Golden Knights',
    //     stats: { wins: 0, losses: 0, points: 0 },
    //     standings: '6th',
    //     color: '#8D744A',
    //     videos: {
    //       gameOn: `${DRIVE_BASE_URL}1G_Ioyiet_9cbi5Rpds4hnNkhwyxp7-5y`,
    //       gameOver: {
    //         win: `${DRIVE_BASE_URL}1G8dOcYotW73_akjM16hxhQ0Q-4Gd8opO`,
    //         loss: `${DRIVE_BASE_URL}1JcZz5ghEu117qPwtpQNax4QBOgNf8OQ0`,
    //       },
    //     },
    //   },
    //   {
    //     teamRank: 470,
    //     logo: dallasStarsLogo,
    //     name: 'Dallas Stars',
    //     stats: { wins: 0, losses: 0, points: 0 },
    //     standings: '6th',
    //     color: '#124733',
    //     videos: {
    //       gameOn: `${DRIVE_BASE_URL}1wPBJ2lZJo5K6Ywba7FoudL9Ey188BnBL`,
    //       gameOver: {
    //         win: `${DRIVE_BASE_URL}1ClF4BaO7oquZc5OFMN1Nxc0Ey--esNID`,
    //         loss: `${DRIVE_BASE_URL}1hHfMzIaVIgJ6D1j-AVYqcLK0jZ_LqwZK`,
    //       },
    //     },
    //   },
    //   {
    //     teamRank: 455,
    //     logo: avalancheLogo,
    //     name: 'Colorado Avalanche',
    //     stats: { wins: 0, losses: 0, points: 0 },
    //     standings: '6th',
    //     color: '#6E263C',
    //     videos: {
    //       gameOn: `${DRIVE_BASE_URL}1oPh4X6k_bY5M8rYYFvklzvXwtkQEXmFp`,
    //       gameOver: {
    //         loss: `${DRIVE_BASE_URL}1-d1MtoO15oC1kEL71FdnVVpbWD4_tKjV`,
    //         win: `${DRIVE_BASE_URL}16sLL01blwI6cTJF-HvDrqQB1Tb8Kgayy`,
    //       },
    //     },
    //   },
    //   {
    //     teamRank: 470,
    //     logo: jetsLogo,
    //     name: 'Winnipeg Jets',
    //     stats: { wins: 0, losses: 0, points: 0 },
    //     standings: '12th',
    //     color: '#081F3F',
    //     videos: {
    //       gameOn: `${DRIVE_BASE_URL}1dd2pjPatwHz4mIwFetxeF56rKZ02Axt_`,
    //       gameOver: {
    //         loss: `${DRIVE_BASE_URL}1eSs9a-q_RG0lTwR3RLMLKsub6_NnoOSi`,
    //         win: `${DRIVE_BASE_URL}1Fqf7zF2gTZrlb00DLZnMnuVuwYOQJicV`,
    //       },
    //     },
    //   },
    //   {
    //     teamRank: 475,
    //     logo: minnesotaWildLogo,
    //     name: 'Minnesota Wild',
    //     stats: { wins: 0, losses: 0, points: 0 },
    //     standings: '10th',
    //     color: '#124733',
    //     videos: {
    //       gameOn: `${DRIVE_BASE_URL}1G_Ioyiet_9cbi5Rpds4hnNkhwyxp7-5y`,
    //       gameOver: {
    //         win: `${DRIVE_BASE_URL}1RX7CmBJb-BL-H-B7BOcpdefAmBSBMIsF`,
    //         loss: `${DRIVE_BASE_URL}1m2AcFM5tgA94jOKSC4WaMKv0yfd2GVsZ`,
    //       },
    //     },
    //   },
    //   {
    //     teamRank: 470,
    //     logo: bluesLogo,
    //     name: 'St. Louis Blues',
    //     stats: { wins: 0, losses: 0, points: 0 },
    //     standings: '6th',
    //     color: '#002F86',
    //     videos: {
    //       gameOn: `${DRIVE_BASE_URL}1wPBJ2lZJo5K6Ywba7FoudL9Ey188BnBL`,
    //       gameOver: {
    //         win: `${DRIVE_BASE_URL}1b3XZU0gSup21cYiMzaw5SNQuXM_1IJPl`,
    //         loss: `${DRIVE_BASE_URL}1t1CjEDwZGs4W9_kOcBMHT8fmf9_-7Kbi`,
    //       },
    //     },
    //   },
  ],
];
