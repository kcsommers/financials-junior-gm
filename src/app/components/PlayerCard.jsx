import React from 'react';
import { motion } from 'framer-motion';
import '@css/components/PlayerCard.css';

export const PlayerCard = ({ player, tutorialActive }) => {
  const inner = player ? (
    <div>
      <p className='position-text'>Position</p>
      <div
        className={`box-shadow player-card-inner${
          player ? ' border-primary' : ' border-accent'
        }`}
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
          <div className='player-card-img'></div>
          <div className='player-scores'>
            <div className='player-score player-score-off'>80</div>
            <div className='player-score player-score-pass'>80</div>
            <div className='player-score player-score-def'>80</div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <p className='position-text'>Position</p>
      <div
        className={`box-shadow player-card-inner${
          player ? ' border-primary' : ' border-accent'
        }`}
      >
        <p className='add-player-text color-primary outline-accent'>
          Add Player
        </p>
      </div>
    </div>
  );

  return tutorialActive ? (
    <motion.div className='player-card-wrap'>{inner}</motion.div>
  ) : (
    <div className='player-card-wrap'>{inner}</div>
  );
};
