import { useState } from 'react';
import {
  BudgetEquation,
  BudgetSlider,
  HeaderComponent,
  PageBoard,
} from '@components';
import budgetStick from '@images/budget-stick.svg';
import { useSelector, useDispatch } from 'react-redux';
import { budgetSlides, SharkieButton, Tutorial } from '@tutorial';
import { setTutorialState } from '@redux/actions';
import '@css/pages/BudgetPage.css';

const BudgetPage = () => {
  const user = useSelector((state) => state.appState.user);
  console.log('USER:::: ', user);

  const [currentBudget, setCurrentBudget] = useState({
    total: 10,
    spent: 1,
    savings: 2,
  });

  const tutorialActive = useSelector((state) => state.tutorial.isActive);

  const dispatch = useDispatch();

  const onTutorialComplete = () => {
    dispatch(setTutorialState({ isActive: false }));
  };

  const budgetEquationStates = {
    board: useSelector((state) => state.tutorial.budget.equationBoard),
    total: useSelector((state) => state.tutorial.budget.total),
    savings: useSelector((state) => state.tutorial.budget.savings),
    spending: useSelector((state) => state.tutorial.budget.spending),
  };

  const updateSavings = (value) => {
    setCurrentBudget({
      ...currentBudget,
      savings: +value,
    });
  };

  return (
    <div className='page-container'>
      <HeaderComponent
        stickBtn={budgetStick}
        objectives={['1. Learn about your budget.']}
        inverse={true}
      />

      <PageBoard hideCloseBtn={true}>
        <div className='budget-page-board-inner'>
          <span style={{ position: 'absolute', left: '1rem', top: '1rem' }}>
            <SharkieButton
              tutorialSlides={[budgetSlides]}
              textPosition='right'
            />
          </span>

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
            <BudgetSlider budget={currentBudget} setValue={updateSavings} />
          </div>
        </div>
      </PageBoard>
      {tutorialActive && (
        <Tutorial slides={[budgetSlides]} onComplete={onTutorialComplete} />
      )}
    </div>
  );
};

export default BudgetPage;
