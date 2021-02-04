import React from 'react';
import { ReactSVG } from 'react-svg';
import icon from '@images/icons/trophies-hockey-stick.svg';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import '../../../css/home_page/trophies.css';

export const TrophiesStick = ({ tutorialActive }) => {
  const animationState = useSelector(
    (state) => state.tutorials.home.trophiesStick
  );

  const card = (
    <div className='trophies-hockey-stick-inner'>
      <ReactSVG src={icon} />
      <p className='trophies-text'>See your badges and trophies!</p>
    </div>
  );

  return tutorialActive ? (
    <motion.div
      className='hidden'
      animate={animationState}
      transition={{ default: { duration: 1 } }}
    >
      {card}
    </motion.div>
  ) : (
    <div className='trophies-hockey-stick'>{card}</div>
  );
};
