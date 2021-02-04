import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HomeTutorial from '../../tutorial/components/HomeTutorial';
import '../../../css/home_page/Home.css';
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
    <div>
      <Navigation />
      <div className='home-cards-row'>
        <div className='team-rank-card-box'>
          <TeamRankCard tutorialActive={tutorialActive} />
        </div>
        <div className='middle-card-box'>
          <ObjectivesBoard tutorialActive={tutorialActive} />
        </div>
        <div className='money-left-card-box'>
          <MoneyLeftCard tutorialActive={tutorialActive} />
        </div>
      </div>
      <div className='hockey-stick-buttons-container'>
        <div>
          <TeamStick tutorialActive={tutorialActive} />
          <SeasonStick tutorialActive={tutorialActive} />
        </div>
        <div className='logo-container'>
          <img src={sharksLogo} alt='Sharks Logo' />
        </div>
        <div>
          <BudgetStick tutorialActive={tutorialActive} />
          <TrophiesStick tutorialActive={tutorialActive} />
        </div>
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
