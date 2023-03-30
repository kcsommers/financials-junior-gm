import { getRandomTeamRank } from '@statrookie/core/src/game/season/stats';
import { OpposingTeam } from '@statrookie/core/src/game/teams/opposing-team.type';
import { omit } from 'lodash';
import Image from 'next/image';
import BlackBeaversLogo from '../components/svg/blackbeavers.svg';
import BlueBearsLogo from '../components/svg/bluebears.svg';
import CalgaryWranglersLogo from '../components/svg/calgary-wranglers.svg';
import GoldenGeckosLogo from '../components/svg/goldengeckos.svg';
import GrayGrasshoppersLogo from '../components/svg/graygrasshoppers.svg';
import GreenGiraffesLogo from '../components/svg/greengiraffes.svg';
import OrangeOwlsLogo from '../components/svg/orangeowls.svg';
import PinkPandasLogo from '../components/svg/pinkpandas.svg';
import PurplePanthersLogo from '../components/svg/purplepanthers.svg';
import RedRabbitsLogo from '../components/svg/redrabbits.svg';
import SilverSpidersLogo from '../components/svg/silverspiders.svg';
import WhiteWolvesLogo from '../components/svg/whitewolves.svg';
import YellowYaksLogo from '../components/svg/yellowyaks.svg';

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
          'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/Sharkie+Make+Noise2.mp4',
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
      color: '#FA4C06',
      getLogo: (props = {}) => (
        <Image
          src="https://sharks-assets.s3.us-west-2.amazonaws.com/images/bakersfieldcondors.png"
          alt="Bakersfield Condors"
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
        standing: 1,
        rank: getRandomTeamRank(2),
      },
      videos: {
        gameOn:
          'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/blichy+goal+against+bakersfield.mp4',
      },
    },
    {
      name: 'San Diego Gulls',
      color: '#F47937',
      getLogo: (props = {}) => (
        <Image
          src="https://sharks-assets.s3.us-west-2.amazonaws.com/images/sandiegogulls.png"
          alt="San Diego Gulls"
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
        rank: getRandomTeamRank(2),
        standing: 2,
      },
      videos: {
        gameOn:
          'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/blichy+goal+2+against+bakersfield.mp4',
      },
    },
    {
      name: 'Calgary Wranglers',
      color: '#CE0F2D',
      getLogo: (props = {}) => (
        // @ts-ignore
        <CalgaryWranglersLogo {...props} />
      ),
      stats: {
        wins: 0,
        losses: 0,
        points: 0,
        rank: getRandomTeamRank(2),
        standing: 3,
      },
      videos: {
        gameOn:
          'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/reedy+goal+against+stockton.mp4',
      },
    },
    {
      name: 'Colorado Eagles',
      color: '#FCD659',
      getLogo: (props = {}) => (
        <Image
          src="sharks-assets.s3.us-west-2.amazonaws.com/images/coloradoeagles.png"
          alt="Colorado Eagles"
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
        rank: getRandomTeamRank(2),
        standing: 4,
      },
      videos: {
        gameOn:
          'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/Gregor+goal+against+Colorado.mp4',
      },
    },
    {
      name: 'Ontario Reign',
      color: '#221E20',
      getLogo: (props = {}) => (
        <Image
          src="https://sharks-assets.s3.us-west-2.amazonaws.com/images/ontarioreign.png"
          alt="Ontario Reign"
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
        rank: getRandomTeamRank(2),
        standing: 5,
      },
      videos: {
        gameOn:
          'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/Leonard+goal+against+Colorado.mp4',
      },
    },
    {
      name: 'Henderson Silver Knights',
      color: '#C1C5C7',
      getLogo: (props = {}) => (
        <Image
          src="https://sharks-assets.s3.us-west-2.amazonaws.com/images/hendersonsilverknights.png"
          alt="Henderson Silver Knights"
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
        rank: getRandomTeamRank(2),
        standing: 6,
      },
      videos: {
        gameOn:
          'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/Meloche+goal+against+Colorado.mp4',
      },
    },
    {
      name: 'Tucson Roadrunners',
      color: '#900028',
      getLogo: (props = {}) => (
        <Image
          src="https://sharks-assets.s3.us-west-2.amazonaws.com/images/tucsonroadrunners.png"
          alt="Tucson Roadrunners"
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
        rank: getRandomTeamRank(2),
        standing: 7,
      },
      videos: {
        gameOn:
          'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/Merkley+goal+against+Colorado.mp4',
      },
    },
    {
      name: 'Texas Stars',
      color: '#045F34',
      getLogo: (props = {}) => (
        <Image
          src="https://sharks-assets.s3.us-west-2.amazonaws.com/images/texasstars.png"
          alt="Texas Stars"
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
        rank: getRandomTeamRank(2),
        standing: 8,
      },
      videos: {
        gameOn:
          'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/Reedy+goal+against+bakersfield.mp4',
      },
    },
    {
      name: 'Iowa Wild',
      color: '#004730',
      getLogo: (props = {}) => (
        <Image
          src="https://sharks-assets.s3.us-west-2.amazonaws.com/images/iowawild.png"
          alt="Iowa Wild"
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
        rank: getRandomTeamRank(2),
        standing: 9,
      },
      videos: {
        gameOn:
          'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/save+against+bakersfield+1.mp4',
      },
    },
    {
      name: 'Manitoba Moose',
      color: '#0E2749',
      getLogo: (props = {}) => (
        <Image
          src="https://sharks-assets.s3.us-west-2.amazonaws.com/images/manitobamoose.png"
          alt="Manitoba Moose"
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
        rank: getRandomTeamRank(2),
        standing: 10,
      },
      videos: {
        gameOn:
          'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/save+against+stockton+2.mp4',
      },
    },
    {
      name: 'Rockford Icehogs',
      color: '#AA272E',
      getLogo: (props = {}) => (
        <Image
          src="https://sharks-assets.s3.us-west-2.amazonaws.com/images/rockfordicehogs.png"
          alt="Rockford Icehogs"
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
        rank: getRandomTeamRank(2),
        standing: 11,
      },
      videos: {
        gameOn:
          'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/save+against+stockton+3.mp4',
      },
    },
    {
      name: 'Chicago Wolves',
      color: '#929283',
      getLogo: (props = {}) => (
        <Image
          src="https://sharks-assets.s3.us-west-2.amazonaws.com/images/chicagowolves.png"
          alt="Chicago Wolves"
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
        rank: getRandomTeamRank(2),
        standing: 12,
      },
      videos: {
        gameOn:
          'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/save+against+stockton+4.mp4',
      },
    },
  ],

  [
    {
      name: 'Anaheim Ducks',
      color: '#BC9C64',
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
      videos: {
        gameOn:
          'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/Sharkie+Make+Noise4.mp4',
        gameHighlight: {
          loss: 'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/Anaheim+Save.mp4',
          win: 'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/Anahiem+Goal.mp4',
        },
      },
    },
    {
      name: 'Arizona Coyotes',
      color: '#900028',
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
      videos: {
        gameOn:
          'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/Sharkie+Make+Noise3.mp4',
        gameHighlight: {
          win: 'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/Arizona+Goal.mp4',
          loss: 'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/Arizona+Save.mp4',
        },
      },
    },
    {
      name: 'Calgary Flames',
      color: '#DD0024',
      getLogo: (props = {}) => (
        <Image
          src="https://sharks-assets.s3.us-west-2.amazonaws.com/images/arizonacoyotes.png"
          alt="Calgary Flames"
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
        standing: 3,
      },
      videos: {
        gameOn:
          'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/Sharkie+Make+Noise2.mp4',
        gameHighlight: {
          loss: 'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/Calgary+Save.mp4',
          win: 'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/Calgary+Goal.mp4',
        },
      },
    },
    {
      name: 'Edmonton Oilers',
      color: '#002147',
      getLogo: (props = {}) => (
        <Image
          src="https://sharks-assets.s3.us-west-2.amazonaws.com/images/arizonacoyotes.png"
          alt="Edmonton Oilers"
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
        standing: 4,
      },
      videos: {
        gameOn:
          'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/Sharkie+Make+Noise.mp4',
        gameHighlight: {
          loss: 'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/Edmonton+Save.mp4',
          win: 'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/Edmonton+Goal.mp4',
        },
      },
    },
    {
      name: 'Los Angeles Kings',
      color: '#231F20',
      getLogo: (props = {}) => (
        <Image
          src="https://sharks-assets.s3.us-west-2.amazonaws.com/images/losangeleskings.png"
          alt="Los Angeles Kings"
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
        standing: 5,
      },
      videos: {
        gameOn:
          'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/Sharkie+Make+Noise4.mp4',
        gameHighlight: {
          loss: 'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/Los+Angeles+Save.mp4',
          win: 'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/Los+Angeles+Goal.mp4',
        },
      },
    },
    {
      name: 'Vancouver Canucks',
      color: '#002D56',
      getLogo: (props = {}) => (
        <Image
          src="https://sharks-assets.s3.us-west-2.amazonaws.com/images/vancouvercanucks.png"
          alt="Vancouver Canucks"
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
        standing: 6,
      },
      videos: {
        gameOn:
          'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/Sharkie+Make+Noise3.mp4',
        gameHighlight: {
          win: 'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/Vancouver+Goal.mp4',
          loss: 'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/Vancouver+Save.mp4',
        },
      },
    },
    {
      name: 'Vegas Golden Knights',
      color: '#8D744A',
      getLogo: (props = {}) => (
        <Image
          src="https://sharks-assets.s3.us-west-2.amazonaws.com/images/vegasgoldenknights.png"
          alt="Vegas Golden Knights"
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
        standing: 7,
      },
      videos: {
        gameOn:
          'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/Sharkie+Make+Noise2.mp4',
        gameHighlight: {
          win: 'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/Vegas+Goal.mp4',
          loss: 'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/Vegas+Save.mp4',
        },
      },
    },
    {
      name: 'Dallas Stars',
      color: '#124733',
      getLogo: (props = {}) => (
        <Image
          src="https://sharks-assets.s3.us-west-2.amazonaws.com/images/dallasstars.png"
          alt="Dallas Stars"
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
        standing: 8,
      },
      videos: {
        gameOn:
          'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/Sharkie+Make+Noise4.mp4',
        gameHighlight: {
          win: 'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/Dallas+Goal.mp4',
          loss: 'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/Dallas+Save.mp4',
        },
      },
    },
    {
      name: 'Colorado Avalanche',
      color: '#6E263C',
      getLogo: (props = {}) => (
        <Image
          src="https://sharks-assets.s3.us-west-2.amazonaws.com/images/coloradoavalanche.png"
          alt="Colorado Avalanche"
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
        standing: 9,
      },
      videos: {
        gameOn:
          'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/Sharkie+Make+Noise4.mp4',
        gameHighlight: {
          loss: 'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/Colorado+Save.mp4',
          win: 'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/Colorado+Goal.mp4',
        },
      },
    },
    {
      name: 'Winnipeg Jets',
      color: '#081F3F',
      getLogo: (props = {}) => (
        <Image
          src="https://sharks-assets.s3.us-west-2.amazonaws.com/images/winnipegjets.png"
          alt="Winnipeg Jets"
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
        standing: 10,
      },
      videos: {
        gameOn:
          'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/Sharkie+Make+Noise3.mp4',
        gameHighlight: {
          loss: 'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/Winnipeg+Save.mp4',
          win: 'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/Winnipeg+Goal.mp4',
        },
      },
    },
    {
      name: 'Minnesota Wild',
      color: '#124733',
      getLogo: (props = {}) => (
        <Image
          src="https://sharks-assets.s3.us-west-2.amazonaws.com/images/minnesotawild.png"
          alt="Minnesota Wild"
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
        standing: 11,
      },
      videos: {
        gameOn:
          'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/Sharkie+Make+Noise2.mp4',
        gameHighlight: {
          win: 'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/Winnipeg+Save.mp4',
          loss: 'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/Minnesota+Save.mp4',
        },
      },
    },
    {
      name: 'St. Louis Blues',
      color: '#002F86',
      getLogo: (props = {}) => (
        <Image
          src="https://sharks-assets.s3.us-west-2.amazonaws.com/images/stlouisblues.png"
          alt="St. Louis Blues"
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
        standing: 12,
      },
      videos: {
        gameOn:
          'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/Sharkie+Make+Noise.mp4',
        gameHighlight: {
          win: 'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/St+Louis+Goal.mp4',
          loss: 'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/St+Louis+Save.mp4',
        },
      },
    },
  ],
];
