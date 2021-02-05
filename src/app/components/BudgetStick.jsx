import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import icon from '@images/icons/budget-hockey-stick.svg';
import '@css/components/BudgetStick.css';

export const BudgetStick = ({ tutorialActive }) => {
  const animationState = useSelector(
    (state) => state.tutorials.home.budgetStick
  );

  const card = (
    <div className='budget-stick-inner'>
      <img className='season-stick-img' src={icon} alt='Budget' />
      <h2 className='hockey-stick-title'>Budget</h2>
      <p className='budget-stick-text'>Manage your team's money.</p>
    </div>
  );

  return tutorialActive ? (
    <motion.div
      className='hidden budget-stick-wrap'
      animate={animationState}
      transition={{ default: { duration: 1 } }}
    >
      {card}
    </motion.div>
  ) : (
    <div className='budge-stick-wrap'>{card}</div>
  );
};
