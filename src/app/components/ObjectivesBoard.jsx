import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import '@css/components/ObjectivesBoard.css';

export const ObjectivesBoard = ({ tutorialActive, objectivesArray }) => {
  const animationState = useSelector(
    (state) => state.tutorial.home.objectivesBoard
  );

  const objectives = objectivesArray
    ? objectivesArray.map((o) => <div key={o}>{o}</div>)
    : null;

  const card = (
    <div className='middle-card-inner'>
      <div className='objective-level-box'>
        <div>Objectives</div>
        <div>Level 1</div>
      </div>
      <div className='ordered-list'>{objectives}</div>
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
