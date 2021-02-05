import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { TeamRankStick } from './../TeamRankStick';
import '@css/components/home-page/TeamRankCard.css';

export const TeamRankCard = ({ tutorialActive }) => {
  const animationState = useSelector((state) => state.tutorials.home.teamRank);

  const card = (
    <div className='team-rank-card-inner'>
      <TeamRankStick></TeamRankStick>
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
