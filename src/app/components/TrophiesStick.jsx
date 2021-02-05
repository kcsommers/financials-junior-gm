import React from 'react';
import { ReactSVG } from 'react-svg';
import icon from '@images/icons/trophies-hockey-stick.svg';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import '@css/components/TrophiesStick.css';

export const TrophiesStick = ({ tutorialActive }) => {
  const animationState = useSelector(
    (state) => state.tutorials.home.trophiesStick
  );

  const card = (
    <div className='trophies-stick-inner'>
      <img className='trophies-stick-img' src={icon} alt='Trophies' />
      <h2 className='hockey-stick-title'>Trophies</h2>
      <p className='trophies-stick-text'>See your badges and trophies!</p>
    </div>
  );

  return tutorialActive ? (
    <motion.div
      className='hidden trophies-stick-wrap'
      animate={animationState}
      transition={{ default: { duration: 1 } }}
    >
      {card}
    </motion.div>
  ) : (
    <div className='trophies-stick-wrap'>{card}</div>
  );
};
