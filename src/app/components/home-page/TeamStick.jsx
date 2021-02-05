import React from 'react';
import { ReactSVG } from 'react-svg';
import icon from '@images/icons/team-hockey-stick.svg';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import '@css/components/home-page/TeamStick.css';

export const TeamStick = ({ tutorialActive }) => {
  const animationState = useSelector((state) => state.tutorials.home.teamStick);

  const card = (
    <div>
      <ReactSVG src={icon} />
      <p className='team-text'>See your squad. Sign or scout new players!</p>
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
    <div>{card}</div>
  );
};
