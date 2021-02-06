import React from 'react';
import { ReactSVG } from 'react-svg';
import signPlayer from '@images/icons/sign-player.svg';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import '@css/components/stick-btn.css';

export const SignStick = ({ tutorialActive, includeSubtext }) => {
  const animationState = useSelector((state) => state.tutorial.home.signStick);

  const card = (
    <div
      className={`stick-btn-inner stick-btn-small${
        includeSubtext ? ' has-sub-text' : ''
      }`}
    >
      <ReactSVG className='stick-btn-img' src={signPlayer} />
      <div className='stick-btn-title-wrap'>
        <h2 className='stick-btn-title'>Sign</h2>
      </div>
      {includeSubtext && (
        <p className='stick-btn-text'>Add new players to your team!</p>
      )}
    </div>
  );

  return tutorialActive ? (
    <motion.div
      className='hidden stick-btn-wrap'
      animate={animationState}
      transition={{ default: { duration: 1 } }}
    >
      {card}
    </motion.div>
  ) : (
    <div className='stick-btn-wrap'>{card}</div>
  );
};
