import React from 'react';
import { ReactSVG } from 'react-svg';
import closeBtn from '@images/icons/cancel.svg';
import {
  ObjectivesBoard,
  StickButton,
  BudgetEquation,
  BudgetSlider,
} from '@components';
import sharksLogo from '@images/sharks-comerica-logo.svg';
import budgetStick from '@images/budget-stick.svg';
import { useSelector, useDispatch } from 'react-redux';
import { Tutorial, playersSlides } from '@tutorial';
import { Link } from 'react-router-dom';
import { setTutorialIsActive } from '@redux/actions';
import '@css/pages/page.css';
import '@css/pages/BudgetPage.css';

const teamSlides = [playersSlides];

const BudgetPage = () => {
  const tutorialActive = useSelector((state) => state.tutorial.isActive);

  const dispatch = useDispatch();

  const onTutorialComplete = () => {
    dispatch(setTutorialIsActive({ isActive: false }));
  };

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
          <StickButton image={budgetStick} />
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
          <div className='budget-slider-container'>
            <BudgetSlider />
          </div>
          <p className='color-primary'>
            Move the yellow puck to change how much you save!
          </p>
        </div>
      </div>
      {tutorialActive && (
        <Tutorial slides={teamSlides} onComplete={onTutorialComplete} />
      )}
    </div>
  );
};

export default BudgetPage;
