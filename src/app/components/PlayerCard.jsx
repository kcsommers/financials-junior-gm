import { motion } from 'framer-motion';
import playerImage from '@images/icons/player-image.svg';
import { capitalize, getDollarString } from '@utils';
import { PlayerRankPie } from './PlayerRankPie';
import '@css/components/PlayerCard.css';

export const PlayerCard = ({ player, animationStates, isLarge, onClick }) => {
  const playerTemplateSmall = player ? (
    <div className='player-card-wrap'>
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
        <p className='position-text'>{capitalize(player.playerPosition)}</p>
        <div className='player-card-header'>
          <div className='player-card-header-inner'>
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
      </div>
    </div>
  ) : null;

  const playerTemplateLarge = player ? (
    <div className='player-card-wrap player-card-wrap-large'>
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
        <p className='position-text'>{capitalize(player.playerPosition)}</p>
        <div className='player-card-header'>
          <div className='player-card-header-inner'>
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

  const playerTemplate = isLarge ? playerTemplateLarge : playerTemplateSmall;
  return player ? playerTemplate : noPlayerTemplate;
};
