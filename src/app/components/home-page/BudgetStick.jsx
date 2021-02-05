import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import icon from '@images/icons/budget-hockey-stick.svg';
import '@css/components/home-page/BudgetStick.css';

export const BudgetStick = ({ tutorialActive }) => {
  const animationState = useSelector(
    (state) => state.tutorials.home.budgetStick
  );

  const card = (
    <div className='budget-hockey-stick-inner'>
      <img src={icon} alt='Budget' />
      <p className='budget-text'>Manage your team's money.</p>
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
    <div className='budge-hockey-stick'>{card}</div>
  );
};
