import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HomeTutorial from '../tutorial/components/HomeTutorial';
import '@css/pages/HomePage.css';
import {
  TeamRankCard,
  ObjectivesBoard,
  MoneyLeftCard,
  SeasonStick,
  TeamStick,
  TrophiesStick,
  Navigation,
  BudgetStick,
} from '@components';
import sharksLogo from '@images/sharks-comerica-logo.svg';

const isFirstTime = false;

export default function Home() {
  const [tutorialActive, setTutorialActive] = React.useState(isFirstTime);

  const onTutorialComplete = () => {
    setTutorialActive(false);
  };

  return (
    <div className='home-page-container'>
      <Navigation />
      <div className='home-cards-row'>
        <div className='team-rank-card-box'>
          <TeamRankCard tutorialActive={tutorialActive} />
        </div>
        <div className='objectives-board-box'>
          <ObjectivesBoard tutorialActive={tutorialActive} />
        </div>
        <div className='money-left-card-box'>
          <MoneyLeftCard tutorialActive={tutorialActive} />
        </div>
      </div>
      <div className='hockey-sticks-container'>
        <div className='sharks-logo-wrap'>
          <img src={sharksLogo} alt='Sharks Logo' />
        </div>
        <div className='hockey-sticks-row'>
          <TeamStick tutorialActive={tutorialActive} />
          <BudgetStick tutorialActive={tutorialActive} />
        </div>
        <div className='hockey-sticks-row'>
          <SeasonStick tutorialActive={tutorialActive} />
          <TrophiesStick tutorialActive={tutorialActive} />
        </div>
        <div></div>
      </div>
      <AnimatePresence>
        {tutorialActive && (
          <motion.div animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <HomeTutorial onComplete={onTutorialComplete} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
