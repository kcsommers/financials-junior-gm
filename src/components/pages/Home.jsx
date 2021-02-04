import React from 'react';
import Navigation from '../HomeComponents/Navigation';
import Team from '../HomeComponents/Team';
import '../../css/home_page/Home.css';
import TeamRankCard from '../HomeComponents/TeamRankCard';
import ObjectivesBoard from '../HomeComponents/ObjectivesBoard';
import MoneyLeftCard from '../HomeComponents/MoneyLeftCard';
import Season from '../HomeComponents/Season';
import Logo from '../HomeComponents/Logo';
import Budget from '../HomeComponents/Budget';
import Trophies from '../HomeComponents/Trophies';
import HomeTutorial from './../../app/tutorial/components/HomeTutorial';
import { motion, AnimatePresence } from 'framer-motion';

const isFirstTime = true;

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
          <Team tutorialActive={tutorialActive} />
          <Season tutorialActive={tutorialActive} />
        </div>
        <div className='logo-container'>
          <Logo />
        </div>
        <div>
          <Budget tutorialActive={tutorialActive} />
          <Trophies tutorialActive={tutorialActive} />
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
