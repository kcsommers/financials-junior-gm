import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import icon from '@images/icons/budget-hockey-stick.svg';
import '@css/components/BudgetStick.css';
import { ReactSVG } from 'react-svg';
import { Link } from 'react-router-dom';

export const BudgetStick = ({ tutorialActive, includeSubtext, link }) => {
  const animationState = useSelector(
    (state) => state.tutorial.home.budgetStick
  );

  const card = (
    <div
      className={`stick-btn-inner stick-btn-inverse${
        includeSubtext ? ' has-sub-text' : ''
      }`}
    >
      <ReactSVG className='stick-btn-img' src={icon} />
      <Link className='text-link stick-btn-title-link' to={link}>
        <h2 className='stick-btn-title'>Budget</h2>
      </Link>
      {includeSubtext && (
        <p className='stick-btn-text'>Manage your team's money.</p>
      )}
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
