import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { MoneyLeftStick } from './../MoneyLeftStick';
import '@css/components/home-page/MoneyLeftCard.css';

export const MoneyLeftCard = ({ tutorialActive }) => {
  const animationState = useSelector((state) => state.tutorial.home.moneyLeft);

  const card = (
    <div className='money-left-card-inner'>
      <MoneyLeftStick></MoneyLeftStick>
    </div>
  );

  return tutorialActive ? (
    <motion.div
      className='card hidden'
      animate={animationState}
      transition={{ default: { duration: 1 } }}
    >
      {card}
    </motion.div>
  ) : (
    <div className='card'>{card}</div>
  );
};
