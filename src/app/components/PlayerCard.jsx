import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { toggleModal } from '../redux/actions';
import Sign from './Sign';
import { SignPlayer } from './SignPlayer';
import { PlayerSigned } from './PlayerSigned';
import { NiceJobScouting } from './public-api';
import { toggleOverlay } from '../redux/actions';
import '@css/components/PlayerCard.css';
import React, { useState } from 'react';

export const PlayerCard = ({ player, animationStates, inOverlay, small }) => {
  const dispatch = useDispatch();

  const [signState, setSignState] = useState(<Sign />);

  const openOverlay = () => {
    dispatch(
      toggleOverlay({
        isOpen: true,
        template: signState,
      })
    );
  };

  const inner = player ? (
    <div>
      <p className='position-text'>Position</p>
      <motion.div
        animate={animationStates ? animationStates.playerCard : null}
        className='box-shadow player-card-inner'
        onClick={openOverlay}
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
          <div className='player-card-img'>{player.name}</div>
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
          openOverlay();
        } else {
          setSignState(<SignPlayer />);
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
        <button className='player-overlay-button outline-black box-shadow'>
          Trade
        </button>
        <button className='player-overlay-button outline-black box-shadow'>
          Release
        </button>
      </div>
    </div>
  );

  const addPlayerOverlay = <Sign />;

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
