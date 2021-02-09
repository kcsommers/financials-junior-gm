import { useState } from 'react';
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
import { Tutorial, budgetSlides } from '@tutorial';
import { Link } from 'react-router-dom';
import { setTutorialIsActive } from '@redux/actions';
import '@css/pages/page.css';
import '@css/pages/BudgetPage.css';

const teamSlides = [budgetSlides];

const BudgetPage = () => {
  const tutorialActive = useSelector((state) => state.tutorial.isActive);

  const [currentBudget, setCurrentBudget] = useState({
    total: 10,
    spent: 3,
    savings: 2,
  });

  const budgetEquationStates = {
    board: useSelector((state) => state.tutorial.budget.equationBoard),
    total: useSelector((state) => state.tutorial.budget.total),
    savings: useSelector((state) => state.tutorial.budget.savings),
    spending: useSelector((state) => state.tutorial.budget.spending),
  };

  const dispatch = useDispatch();

  const onTutorialComplete = () => {
    dispatch(setTutorialIsActive({ isActive: false }));
  };

  const updateSavings = (value) => {
    setCurrentBudget({
      ...currentBudget,
      savings: +value,
    });
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
          <StickButton image={budgetStick} link='/home' />
        </div>
      </div>
      <div className='page-body'>
        <div className='page-board budget-page-board'>
          <Link to='/home'>
            <ReactSVG
              className={`page-board-close-btn page-board-close-btn-left${
                tutorialActive ? ' hidden' : ''
              }`}
              src={closeBtn}
            />
          </Link>
          <div className='budget-equation-container'>
            <BudgetEquation
              budget={currentBudget}
              animationStates={budgetEquationStates}
            />
          </div>
          <p className='helper-text color-primary'>
            Move the yellow puck to change how much you save!
          </p>
          <div className='budget-slider-container'>
            <BudgetSlider
              budget={currentBudget}
              setValue={updateSavings}
              tutorialActive={tutorialActive}
            />
          </div>
        </div>
      </div>
      {tutorialActive && (
        <Tutorial slides={teamSlides} onComplete={onTutorialComplete} />
      )}
    </div>
  );
};

export default BudgetPage;
