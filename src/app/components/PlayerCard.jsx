import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import Sign from './Sign';
import { toggleOverlay } from '../redux/actions';
import { FindTradePlayer } from './trade-overlay/FindTradePlayer';
import '@css/components/PlayerCard.css';

export const PlayerCard = ({ player, animationStates, inOverlay, small }) => {
  const dispatch = useDispatch();

  const handleTrade = () => {
    dispatch(
      toggleOverlay({
        isOpen: true,
        template: <FindTradePlayer />,
      })
    );
  };

  const openOverlay = (component) => {
    dispatch(
      toggleOverlay({
        isOpen: true,
        template: component,
      })
    );
  };

  const inner = player ? (
    <div>
      <p className='position-text'>{player.playerPosition}</p>
      <motion.div
        animate={animationStates ? animationStates.playerCard : null}
        className='box-shadow player-card-inner'
        onClick={() => {
          openOverlay(overlayTemplate);
        }}
        transition={{
          default: {
            duration: 1,
          },
        }}
      >
        <div className='player-card-header'>
          <div className='player-rank'>
            <span>80</span>
          </div>
          <div className='player-cost'>
            <span>$2</span>
          </div>
        </div>
        <div className='player-card-body'>
          <div className='player-card-img'>{player.playerName}</div>
          <div className='player-scores'>
            {/* <div className='player-score player-score-off'>80</div>
            <div className='player-score player-score-pass'>80</div>
            <div className='player-score player-score-def'>80</div> */}
          </div>
        </div>
      </motion.div>
    </div>
  ) : (
    <motion.div
      className='box-shadow player-card-inner border-accent'
      animate={animationStates ? animationStates.playerCardEmpty : null}
      onClick={() => {
        if (!inOverlay) {
          openOverlay(<Sign />);
        }
      }}
    >
      <p className='add-player-text color-primary outline-accent'>Add Player</p>
    </motion.div>
  );

  const overlayTemplate = (
    <div className='player-overlay-container'>
      <div className='player-card-wrap player-card-large'>{inner}</div>
      <div className='player-overlay-buttons-wrap'>
        <button
          onClick={handleTrade}
          className='player-overlay-button outline-black box-shadow'
        >
          Trade
        </button>
        <button className='player-overlay-button outline-black box-shadow'>
          Release
        </button>
      </div>
    </div>
  );

  const mainTemplate = (
    <div
      className={`player-card-wrap ${!player ? ' player-card-wrap-empty' : ''}${
        small ? ' player-card-wrap-small' : ''
      }`}
    >
      {inner}
    </div>
  );

  return inOverlay ? overlayTemplate : mainTemplate;
};
