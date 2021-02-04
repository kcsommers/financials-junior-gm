import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './../../components/home-page/Navigation';
import TeamRankCard from './../../components/home-page/TeamRankCard';
import ObjectivesBoard from './../../components/home-page/ObjectivesBoard';
import MoneyLeftCard from './../../components/home-page/MoneyLeftCard';
import Season from './../../components/home-page/Season';
import Team from './../../components/home-page/Team';
import Logo from './../../components/home-page/Logo';
import Budget from './../../components/home-page/Budget';
import Trophies from './../../components/home-page/Trophies';
import HomeTutorial from './../../tutorial/components/HomeTutorial';
import '../../../css/home_page/Home.css';

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
