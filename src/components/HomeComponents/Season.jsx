import React from 'react';
import '../../css/home_page/Season.css';
import { ReactSVG } from 'react-svg';
import icon from '../../icons/season-hockey-stick.svg';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

function Season({ tutorialActive }) {
  const animationState = useSelector(
    (state) => state.tutorials.home.seasonStick
  );

  const card = (
    <div className='season-hockey-stick-inner'>
      <ReactSVG src={icon} />

      <p className='season-text'>Play matches and win the championship!</p>
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
    <div className='season-hockey-stick'>{card}</div>
  );
}

export default Season;
