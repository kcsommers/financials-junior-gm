import React from 'react';
import { ReactSVG } from 'react-svg';
import icon from '@images/icons/trophies-hockey-stick.svg';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import '@css/components/TrophiesStick.css';
import { Link } from 'react-router-dom';

export const TrophiesStick = ({ tutorialActive, includeSubtext, link }) => {
  const animationState = useSelector(
    (state) => state.tutorial.home.trophiesStick
  );

  const card = (
    <div
      className={`stick-btn-inner stick-btn-inverse${
        includeSubtext ? ' has-sub-text' : ''
      }`}
    >
      <ReactSVG className='stick-btn-img' src={icon} />
      <Link className='text-link' to={link}>
        <div className='stick-btn-title-wrap'>
          <h2 className='stick-btn-title'>Trophies</h2>
        </div>
      </Link>
      <p className='stick-btn-text'>See your badges and trophies!</p>
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
