import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import {
  introSlides,
  objectivesSlides,
  teamRankSlides,
  moneyLeftSlides,
  teamStickSlides,
  budgetStickSlides,
  trophiesStickSlides,
  seasonStickSlides,
  Tutorial,
} from '@tutorial';
import sharksLogo from '@images/sharks-comerica-logo.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setTutorialIsActive } from '@redux/actions';

const tutorialSlides = [
  introSlides,
  objectivesSlides,
  teamRankSlides,
  moneyLeftSlides,
  teamStickSlides,
  budgetStickSlides,
  trophiesStickSlides,
  seasonStickSlides,
];

export default function Home() {
  const tutorialActive = useSelector((state) => state.tutorial.isActive);

  const dispatch = useDispatch();

  const onTutorialComplete = () => {
    dispatch(setTutorialIsActive({ isActive: false }));
  };

  return (
    <div className='home-page-container'>
      <Navigation />
      <div className='home-cards-row'>
        <div className='team-rank-card-box'>
          <TeamRankCard tutorialActive={tutorialActive} />
        </div>
        <div className='objectives-board-wrap'>
          <ObjectivesBoard
            tutorialActive={tutorialActive}
            objectivesArray={[
              '1. Learn about your budget.',
              '2. Fill your team by signing a player.',
              '3. Scout three more players to add to your team.',
            ]}
          />
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
          <TeamStick tutorialActive={tutorialActive} includeSubtext={true} />
          <BudgetStick tutorialActive={tutorialActive} includeSubtext={true} />
        </div>
        <div className='hockey-sticks-row hockey-sticks-row-2'>
          <SeasonStick tutorialActive={tutorialActive} includeSubtext={true} />
          <TrophiesStick
            tutorialActive={tutorialActive}
            includeSubtext={true}
          />
        </div>
        <div></div>
      </div>
      {tutorialActive && (
        <Tutorial slides={tutorialSlides} onComplete={onTutorialComplete} />
      )}
    </div>
  );
}
