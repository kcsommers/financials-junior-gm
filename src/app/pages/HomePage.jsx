import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import {
  ObjectivesBoard,
  StickButton,
  Navigation,
  LevelStick,
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
  SharkieButton,
} from '@tutorial';
import teamStick from '@images/team-stick.svg';
import budgetStick from '@images/budget-stick.svg';
import seasonStick from '@images/season-stick.svg';
import trophiesStick from '@images/trophies-stick.svg';
import '@css/pages/HomePage.css';

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

const HomePage = () => {
  const tutorialActive = useSelector((state) => state.tutorial.isActive);

  const animationStates = {
    teamStick: useSelector((state) => state.tutorial.home.teamStick),
    seasonStick: useSelector((state) => state.tutorial.home.seasonStick),
    budgetStick: useSelector((state) => state.tutorial.home.budgetStick),
    trophiesStick: useSelector((state) => state.tutorial.home.trophiesStick),
    teamRankCard: useSelector((state) => state.tutorial.home.teamRankCard),
    budgetCard: useSelector((state) => state.tutorial.home.budgetCard),
  };

  return (
    <div className='home-page-container'>
      <Navigation tutorialActive={tutorialActive} />
      <div className='home-cards-row'>
        {tutorialActive ? (
          <motion.div
            className='level-stick-card hidden'
            animate={animationStates.teamRankCard}
            transition={{ default: { duration: 1 } }}
          >
            <LevelStick type='teamRank' />
          </motion.div>
        ) : (
          <div className='level-stick-card'>
            <LevelStick type='teamRank' />
          </div>
        )}
        <div className='objectives-board-container'>
          <ObjectivesBoard
            tutorialActive={tutorialActive}
            objectives={[
              '1. Learn about your budget.',
              '2. Fill your team by signing a player.',
              '3. Scout three more players to add to your team.',
            ]}
          />
          <div className='sharkie-btn-container'>
            <SharkieButton
              textPosition='bottom'
              tutorialSlides={tutorialSlides}
            />
          </div>
        </div>
        {tutorialActive ? (
          <motion.div
            className='level-stick-card hidden'
            animate={animationStates.budgetCard}
            transition={{ default: { duration: 1 } }}
          >
            <LevelStick type='budget' />
          </motion.div>
        ) : (
          <div className='level-stick-card card'>
            <LevelStick type='budget' />
          </div>
        )}
      </div>
      <div className='hockey-sticks-container'>
        <div className='hockey-sticks-row'>
          <div className='stick-btn-container'>
            <StickButton
              tutorialActive={tutorialActive}
              link='/team'
              image={teamStick}
              animationState={animationStates.teamStick}
            />
            <p className={`stick-btn-text${tutorialActive ? ' hidden' : ''}`}>
              Build your team by signing players!
            </p>
          </div>
          <div className='stick-btn-container'>
            <StickButton
              tutorialActive={tutorialActive}
              link='/budget'
              inverse={true}
              image={budgetStick}
              animationState={animationStates.budgetStick}
            />
            <p className={`stick-btn-text${tutorialActive ? ' hidden' : ''}`}>
              Manage your team's money.
            </p>
          </div>
        </div>
        <div className='hockey-sticks-row hockey-sticks-row-2'>
          <div className='stick-btn-container'>
            <StickButton
              tutorialActive={tutorialActive}
              link='/season'
              image={seasonStick}
              animationState={animationStates.seasonStick}
            />
            <p className={`stick-btn-text${tutorialActive ? ' hidden' : ''}`}>
              Play matches and win the championship!
            </p>
          </div>
          <div className='stick-btn-container'>
            <StickButton
              tutorialActive={tutorialActive}
              inverse={true}
              link='/trophies'
              image={trophiesStick}
              animationState={animationStates.trophiesStick}
            />
            <p className={`stick-btn-text${tutorialActive ? ' hidden' : ''}`}>
              See your badges and trophies!
            </p>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default HomePage;
