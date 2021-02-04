import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import '../../../css/home_page/ObjectivesBoard.css';

const ObjectivesBoard = ({ tutorialActive }) => {
  const animationState = useSelector(
    (state) => state.tutorials.home.objectivesBoard
  );

  const card = (
    <div className='middle-card-inner'>
      <div className='objective-level-box'>
        <div>Objectives</div>
        <div>Level 1</div>
      </div>
      <div className='ordered-list'>
        <div>1. Learn about your budget.</div>
        <div>2. Fill your team by signing a player.</div>
        <div>3. Scout three more players to add to your team.</div>
      </div>
    </div>
  );

  return tutorialActive ? (
    <motion.div
      className='middle-card hidden'
      animate={animationState}
      transition={{ default: { duration: 1 } }}
    >
      {card}
    </motion.div>
  ) : (
    <div className='middle-card'>{card}</div>
  );
};

export default ObjectivesBoard;
