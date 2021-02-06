import React from 'react';
import { ReactSVG } from 'react-svg';
import jrSharksLogo from '@images/icons/jr-sharks-logo.svg';
import closeBtn from '@images/icons/cancel.svg';
import {
  TeamStick,
  ObjectivesBoard,
  TeamRankStick,
  MoneyLeftStick,
  SignStick,
  ScoutStick,
  PlayerCard,
} from '@components';
import sharksLogo from '@images/sharks-comerica-logo.svg';
import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { Tutorial, playersSlides } from '@tutorial';
import { Link } from 'react-router-dom';
import { setTutorialIsActive } from '@redux/actions';
import '@css/pages/page.css';
import '@css/pages/ScoutPage.css';

import hmm from './hmm.svg';

const teamSlides = [playersSlides];

function TeamPage() {
  // GET TEAM FROM STORE

  const tutorialActive = useSelector((state) => state.tutorial.isActive);

  const dispatch = useDispatch();

  const onTutorialComplete = () => {
    dispatch(setTutorialIsActive({ isActive: false }));
  };

  return (
    <div className='page-container'>
      <div className='page-header'>
        <div className='page-header-logo-wrap'>
          <img src={sharksLogo} alt='Sharks Logo' />
        </div>
        <div className='page-header-stick-wrap scout-page-header-stick-wrap'>
          <ScoutStick large={true}></ScoutStick>
        </div>
        <div className='page-header-objectives-board-wrap'>
          <ObjectivesBoard
            objectivesArray={['1. Scout players to sign to your bench!']}
          ></ObjectivesBoard>
        </div>
      </div>
      <div className='page-body'></div>
      <AnimatePresence>
        {tutorialActive && (
          <motion.div animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Tutorial slides={teamSlides} onComplete={onTutorialComplete} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default TeamPage;
