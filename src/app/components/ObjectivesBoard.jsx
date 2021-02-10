import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import '@css/components/ObjectivesBoard.css';

export const ObjectivesBoard = ({ tutorialActive, objectives, smallText }) => {
  const animationState = useSelector(
    (state) => state.tutorial.home.objectivesBoard
  );

  const _objectives = objectives
    ? objectives.map((o) => (
        <div className={`${smallText ? 'objective-text-small' : ''}`} key={o}>
          {o}
        </div>
      ))
    : null;

  const inner = (
    <div className='objectives-board-inner'>
      <div className='objective-level-box'>
        <div>Objectives</div>
        <div>Level 1</div>
      </div>
      <div className='ordered-list'>{_objectives}</div>
    </div>
  );

  return tutorialActive ? (
    <motion.div
      className='objectives-board-wrap hidden'
      animate={animationState}
      transition={{ default: { duration: 1 } }}
    >
      {inner}
    </motion.div>
  ) : (
    <div className='objectives-board-wrap'>{inner}</div>
  );
};
