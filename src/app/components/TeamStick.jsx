import React from 'react';
import { ReactSVG } from 'react-svg';
import icon from '@images/icons/team-hockey-stick.svg';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import '@css/components/stick-btn.css';
import { Link } from 'react-router-dom';

export const TeamStick = ({ tutorialActive, includeSubtext, link }) => {
  const animationState = useSelector((state) => state.tutorial.home.teamStick);

  const inner = (
    <div className={`stick-btn-inner${includeSubtext ? ' has-sub-text' : ''}`}>
      <ReactSVG className='stick-btn-img' src={icon}></ReactSVG>
      <Link className='text-link' to={link}>
        <div className='stick-btn-title-wrap'>
          <h2 className='stick-btn-title'>Team</h2>
        </div>
      </Link>
      {includeSubtext && (
        <p className='stick-btn-text'>
          See your squad. Sign or scout new players!
        </p>
      )}
    </div>
  );

  return tutorialActive ? (
    <motion.div
      className='hidden stick-btn-wrap'
      animate={animationState}
      transition={{ default: { duration: 1 } }}
    >
      {inner}
    </motion.div>
  ) : (
    <div className='stick-btn-wrap'>{inner}</div>
  );
};
