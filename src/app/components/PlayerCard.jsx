import { motion } from 'framer-motion';

import playerImage from '@images/icons/player-image.svg';
import { capitalize, getDollarString } from '@utils';
import { PlayerRankPie } from './PlayerRankPie';
import '@css/components/PlayerCard.css';

export const PlayerCard = ({
  player,
  animationStates,
  size = 'small',
  onClick,
}) => {
  const inner = player ? (
    <>
      <p className='position-text'>{capitalize(player.playerPosition)}</p>
      <div className='player-card-header'>
        <div className='player-card-header-inner'>
          <span>{player.overallRank}</span>
          <span>{getDollarString(player.playerCost)}</span>
        </div>
      </div>
      <motion.div
        animate={animationStates ? animationStates.playerCard : null}
        className='box-shadow player-card-body'
        onClick={() => {
          if (onClick) {
            onClick(player);
          }
        }}
        transition={{
          default: {
            duration: 1,
          },
        }}
      >
        <div
          className='player-card-img-wrap'
          style={{ backgroundImage: `url(${playerImage})` }}
        ></div>
        <div className='player-scores'>
          <PlayerRankPie
            label='Off'
            sliceColor='#DC2D2D'
            score={player.offensiveRank}
          />
          <PlayerRankPie
            label='Pass'
            sliceColor='#00788a'
            score={player.passRank}
          />
          <PlayerRankPie
            label='Def'
            sliceColor='#002f6c'
            score={player.defensiveRank}
          />
        </div>
      </motion.div>
    </>
  ) : (
    <motion.div
      className='box-shadow player-card-empty-inner border-accent'
      animate={animationStates ? animationStates.playerCardEmpty : null}
      onClick={() => {
        if (onClick) {
          onClick(player);
        }
      }}
    >
      <p className='add-player-text color-primary outline-accent'>Add Player</p>
    </motion.div>
  );

  const mainTemplate = (
    <div
      className={`player-card-wrap ${!player ? ' player-card-wrap-empty' : ''}`}
    >
      {inner}
    </div>
  );

  return mainTemplate;
};
