import React from 'react';
import { ReactSVG } from 'react-svg';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import icon from '../../../assets/images/icons/budget-hockey-stick.svg';
import '../../../css/home_page/budget.css';

function Budget({ tutorialActive }) {
  const animationState = useSelector(
    (state) => state.tutorials.home.budgetStick
  );

  const card = (
    <div className='budget-hockey-stick-inner'>
      <ReactSVG src={icon} />
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
}

export default Budget;
