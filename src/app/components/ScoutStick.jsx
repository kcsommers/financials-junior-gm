import React from 'react';
import { ReactSVG } from 'react-svg';
import scoutPlayer from '@images/icons/scout.svg';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import '@css/components/stick-btn.css';
import { Link } from 'react-router-dom';

export const ScoutStick = ({ tutorialActive, includeSubtext, large, link }) => {
  const animationState = useSelector((state) => state.tutorial.home.scoutStick);

  const card = (
    <div
      className={`stick-btn-inner stick-btn-small${
        includeSubtext ? ' has-sub-text' : ''
      }`}
    >
      <ReactSVG className='stick-btn-img' src={scoutPlayer}></ReactSVG>
      <Link className='text-link stick-btn-title-link' to={link}>
        <h2 className='stick-btn-title'>Scout</h2>
      </Link>
      {includeSubtext && (
        <p className='stick-btn-text'>
          Decide which new recruits are the most valuable!
        </p>
      )}
    </div>
  );

  return tutorialActive ? (
    <motion.div
      className={`hidden stick-btn-wrap${large ? ' stick-large' : ''}`}
      animate={animationState}
      transition={{ default: { duration: 1 } }}
    >
      {card}
    </motion.div>
  ) : (
    <div className={`stick-btn-wrap${large ? ' stick-large' : ''}`}>{card}</div>
  );
};
