import React from 'react';
import icon from '@images/icons/season-hockey-stick.svg';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import '@css/components/home-page/SeasonStick.css';

export const SeasonStick = ({ tutorialActive }) => {
  const animationState = useSelector(
    (state) => state.tutorials.home.seasonStick
  );

  const card = (
    <div className='season-stick-inner'>
      <img className='season-stick-img' src={icon} alt='Season' />
      <h2 className='hockey-stick-title'>Season</h2>
      <p className='season-stick-text'>
        Play matches and win the championship!
      </p>
    </div>
  );
  return tutorialActive ? (
    <motion.div
      className='hidden season-stick-wrap'
      animate={animationState}
      transition={{ default: { duration: 1 } }}
    >
      {card}
    </motion.div>
  ) : (
    <div className='season-stick-wrap'>{card}</div>
  );
};
