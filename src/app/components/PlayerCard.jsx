import { ReactSVG } from 'react-svg';
import { motion } from 'framer-motion';
import playerImage from '@images/icons/player-image.svg';
import { capitalize, getDollarString } from '@utils';
import { PlayerRankPie, PlayerRankGraph } from '@components';
import sharksLogo from '@images/icons/sharks-logo.svg';
import '@css/components/PlayerCard.css';

const styles = {
  small: {
    wrap: {
      width: '90px',
      height: '127.4px',
    },
    header: {
      height: '22px',
      fontSize: '1rem',
    },
    image: {
      width: '45px',
      height: '45px',
    },
    position: {
      height: '16.25px',
      fontSize: '0.8rem',
    },
  },
  medium: {
    wrap: {
      width: '200px',
      height: '310px',
    },
    header: {
      height: '44.03px',
      fontSize: '1.45rem',
      position: 'relative',
    },
    image: {
      width: '84px',
      height: '84px',
    },
    position: {
      height: '24px',
      fontSize: '1.25rem',
    },
    name: {
      fontSize: '1.25rem',
      padding: '0.35rem 0',
    },
    logo: {
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100px',
      height: '100px',
      left: '50%',
      position: 'absolute',
      transform: 'translateX(-50%) scale(0.38)',
      borderRadius: '100%',
      backgroundColor: '#fff',
    },
    graphsWrap: {
      padding: '0 1.25rem',
    },
  },
  large: {
    wrap: {
      width: '300px',
      height: '480px',
    },
    header: {
      height: '73.39px',
      fontSize: '2rem',
      position: 'relative',
    },
    image: {
      width: '140px',
      height: '140px',
    },
    position: {
      height: '40px',
      fontSize: '1.75rem',
    },
    name: {
      fontSize: '1.65rem',
      padding: '0.5rem 0',
    },
    logo: {
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100px',
      height: '100px',
      left: '50%',
      position: 'absolute',
      transform: 'translateX(-50%) scale(0.65)',
      borderRadius: '100%',
      backgroundColor: '#fff',
    },
    graphsWrap: {
      padding: '0 2rem',
    },
  },
};

export const PlayerCard = ({
  player,
  animationStates,
  size = 'small',
  onClick,
}) => {
  const playerTemplateSmall = player ? (
    <div
      className={`player-card-wrap${!!onClick ? ' player-card-clickable' : ''}`}
      style={styles[size].wrap}
    >
      <div
        style={{
          display: 'inline-flex',
          flexDirection: 'column',
          height: '100%',
        }}
        onClick={() => {
          if (onClick) {
            onClick(player);
          }
        }}
      >
        <p className='position-text' style={styles[size].position}>
          {capitalize(player.playerPosition)}
        </p>
        <div className='player-card-header'>
          <div className='player-card-header-inner' style={styles[size].header}>
            <span>{player.overallRank}</span>
            {player.playerCost && (
              <span>{getDollarString(player.playerCost)}</span>
            )}
          </div>
        </div>
        <motion.div
          animate={animationStates ? animationStates.playerCard : null}
          className='box-shadow player-card-body'
          transition={{
            default: {
              duration: 1,
            },
          }}
        >
          <div
            className='player-card-img-wrap'
            style={{
              ...styles[size].image,
              backgroundImage: `url(${playerImage})`,
            }}
          ></div>
          <div className='player-ranks'>
            <PlayerRankPie
              label='Off'
              sliceColor='#DC2D2D'
              rank={+player.offensiveRank}
            />
            <PlayerRankPie
              label='Pass'
              sliceColor='#00788a'
              rank={+player.passRank}
            />
            <PlayerRankPie
              label='Def'
              sliceColor='#002f6c'
              rank={+player.defensiveRank}
            />
          </div>
        </motion.div>
      </div>
    </div>
  ) : null;

  const playerTemplateLarge = player ? (
    <div
      className={`player-card-wrap player-card-wrap-large${
        !!onClick ? ' player-card-clickable' : ''
      }`}
      style={styles[size].wrap}
    >
      <div
        style={{
          display: 'inline-flex',
          flexDirection: 'column',
          height: '100%',
        }}
        onClick={() => {
          if (onClick) {
            onClick(player);
          }
        }}
      >
        <p className='position-text' style={styles[size].position}>
          {capitalize(player.playerPosition)}
        </p>
        <div className='player-card-header'>
          <div className='player-card-header-inner' style={styles[size].header}>
            <span style={{ display: 'inline-flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '1rem', marginBottom: '-0.5rem' }}>
                Rank
              </span>
              {player.overallRank}
            </span>
            {player.playerCost && (
              <span>{getDollarString(player.playerCost)}</span>
            )}
            <span style={styles[size].logo}>
              <ReactSVG src={sharksLogo} />
            </span>
          </div>
        </div>
        <motion.div
          animate={animationStates ? animationStates.playerCard : null}
          className='box-shadow player-card-body'
          transition={{
            default: {
              duration: 1,
            },
          }}
        >
          <p
            className='player-card-player-name outline-black'
            style={styles[size].name}
          >
            {player.playerName}
          </p>
          <div
            className='player-card-img-wrap'
            style={{
              ...styles[size].image,
              backgroundImage: `url(${playerImage})`,
            }}
          ></div>
          <div
            className='player-rank-graphs-container'
            style={styles[size].graphsWrap}
          >
            <PlayerRankGraph
              label='Offense'
              rgb={[220, 45, 45]}
              rank={+player.offensiveRank}
              isSmall={size === 'medium'}
            />
            <PlayerRankGraph
              label='Passing'
              rank={+player.passRank}
              rgb={[0, 120, 138]}
              isSmall={size === 'medium'}
            />
            <PlayerRankGraph
              label='Defense'
              rank={+player.defensiveRank}
              rgb={[0, 47, 108]}
              isSmall={size === 'medium'}
            />
          </div>
        </motion.div>
      </div>
    </div>
  ) : null;

  const noPlayerTemplate = (
    <div className='player-card-wrap player-card-wrap-empty'>
      <motion.div
        className='box-shadow player-card-empty-inner border-accent'
        animate={animationStates ? animationStates.playerCardEmpty : null}
        onClick={() => {
          if (onClick) {
            onClick(player);
          }
        }}
      >
        <p className='add-player-text color-primary outline-accent'>
          Add Player
        </p>
      </motion.div>
    </div>
  );

  const playerTemplate =
    size === 'large' || size === 'medium'
      ? playerTemplateLarge
      : playerTemplateSmall;
  return player ? playerTemplate : noPlayerTemplate;
};
