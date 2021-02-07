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
  SeasonStick,
  BudgetStick,
  BudgetEquation,
} from '@components';
import sharksLogo from '@images/sharks-comerica-logo.svg';
import { useSelector, useDispatch } from 'react-redux';
import { Tutorial, playersSlides } from '@tutorial';
import { Link } from 'react-router-dom';
import { setTutorialIsActive } from '@redux/actions';
import '@css/pages/page.css';
import '@css/pages/BudgetPage.css';

const teamSlides = [playersSlides];

const BudgetPage = () => {
  // GET TEAM FROM STORE

  const tutorialActive = useSelector((state) => state.tutorial.isActive);

  const dispatch = useDispatch();

  const onTutorialComplete = () => {
    dispatch(setTutorialIsActive({ isActive: false }));
  };

  const highlightPlayerCards = useSelector(
    (state) => state.tutorial.team.playerCard.highlight
  );

  return (
    <div className='page-container'>
      <div className='page-header page-header-inverse'>
        <div className='page-header-logo-wrap'>
          <img src={sharksLogo} alt='Sharks Logo' />
        </div>
        <div className='page-header-objectives-board-container'>
          <ObjectivesBoard
            objectivesArray={['1. Learn about your budget.']}
          ></ObjectivesBoard>
        </div>
        <div className='page-header-stick-wrap'>
          <BudgetStick></BudgetStick>
        </div>
      </div>
      <div className='page-body'>
        <div className='page-board budget-page-board'>
          <Link to='/home'>
            <ReactSVG className='page-board-close-btn' src={closeBtn} />
          </Link>
          <div className='budget-equation-container'>
            <BudgetEquation budget={{ total: 8, savings: 2, spending: 6 }} />
          </div>
          <div className='budget-slider-container'></div>
        </div>
      </div>
      {tutorialActive && (
        <Tutorial slides={teamSlides} onComplete={onTutorialComplete} />
      )}
    </div>
  );
};

export default BudgetPage;
