import React from 'react';
import '@css/pages/HomePage.css';
import {
  TeamRankCard,
  ObjectivesBoard,
  MoneyLeftCard,
  StickButton,
  Navigation,
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
  SharkieButton,
} from '@tutorial';
import sharksLogo from '@images/sharks-comerica-logo.svg';
import teamStick from '@images/team-stick.svg';
import budgetStick from '@images/budget-stick.svg';
import seasonStick from '@images/season-stick.svg';
import trophiesStick from '@images/trophies-stick.svg';
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

const HomePage = () => {
  const tutorialActive = useSelector((state) => state.tutorial.isActive);

  const dispatch = useDispatch();

  const onTutorialComplete = () => {
    dispatch(setTutorialIsActive({ isActive: false }));
  };

  const animationStates = {
    teamStick: useSelector((state) => state.tutorial.home.teamStick),
    seasonStick: useSelector((state) => state.tutorial.home.seasonStick),
    budgetStick: useSelector((state) => state.tutorial.home.budgetStick),
    trophiesStick: useSelector((state) => state.tutorial.home.trophiesStick),
  };

  return (
    <div className='home-page-container'>
      <Navigation tutorialActive={tutorialActive} />
      <div className='home-cards-row'>
        <div className='team-rank-card-box'>
          <TeamRankCard tutorialActive={tutorialActive} />
        </div>
        <div className='objectives-board-container'>
          <ObjectivesBoard
            tutorialActive={tutorialActive}
            objectivesArray={[
              '1. Learn about your budget.',
              '2. Fill your team by signing a player.',
              '3. Scout three more players to add to your team.',
            ]}
          />
          <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
            <SharkieButton />
          </div>
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
      {tutorialActive && (
        <Tutorial slides={tutorialSlides} onComplete={onTutorialComplete} />
      )}
    </div>
  );
};

export default HomePage;
