import React from 'react';
import { ReactSVG } from 'react-svg';
import icon from '../../icons/trophies-hockey-stick.svg';
import '../../css/home_page/trophies.css';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

function Trophies({ tutorialActive }) {
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
}

export default Trophies;
