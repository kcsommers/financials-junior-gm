import React from 'react';
import { ReactSVG } from 'react-svg';
import icon from '@images/icons/hockey-visual-2.svg';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import '@css/components/home-page/MoneyLeftCard.css';

export const MoneyLeftCard = ({ tutorialActive }) => {
  const animationState = useSelector((state) => state.tutorials.home.moneyLeft);

  const card = (
    <div className='money-left-card-inner'>
      <div className='money-left-circle'>
        <p>25</p>
      </div>

      <div className='money-left-hockey-stick-box'>
        <ReactSVG src={icon} />
      </div>

      <h1 className='money-left-title'>
        Money <br />
        Left
      </h1>
    </div>
  );

  return tutorialActive ? (
    <motion.div
      className='money-left-card hidden'
      animate={animationState}
      transition={{ default: { duration: 1 } }}
    >
      {card}
    </motion.div>
  ) : (
    <div className='money-left-card'>{card}</div>
  );
};
