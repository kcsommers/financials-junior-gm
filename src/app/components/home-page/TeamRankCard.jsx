import React from 'react';
import { ReactSVG } from 'react-svg';
import icon from '@images/icons/hockey-visual-1.svg';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import '../../../css/home_page/teamrankcard.css';

export const TeamRankCard = ({ tutorialActive }) => {
  const animationState = useSelector((state) => state.tutorials.home.teamRank);

  const card = (
    <div className='team-rank-card-inner'>
      <div className='hockey-stick-title-container'>
        <h1 className='team-rank-title'>
          Team <br />
          Rank
        </h1>
        <div className='team-rank-hockey-stick-box'>
          <ReactSVG src={icon} />
        </div>
      </div>
      <div className='team-rank-circle'>
        <p>85</p>
      </div>
    </div>
  );

  return tutorialActive ? (
    <motion.div
      className='team-rank-card hidden'
      animate={animationState}
      transition={{ default: { duration: 1 } }}
    >
      {card}
    </motion.div>
  ) : (
    <div className='team-rank-card'>{card}</div>
  );
};
