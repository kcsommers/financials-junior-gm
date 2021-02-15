import {
  BudgetEquation,
  BudgetSlider,
  HeaderComponent,
  PageBoard,
  LoadingSpinner,
} from '@components';
import budgetStick from '@images/budget-stick.svg';
import { useSelector, useDispatch } from 'react-redux';
import { budgetSlides, SharkieButton, Tutorial } from '@tutorial';
import { setTutorialState, setSavings } from '@redux/actions';
import { updateStudentById } from '../api-helper';
import '@css/pages/BudgetPage.css';

let debounceTimeout = 0;

const BudgetPage = () => {
  const student = useSelector((state) => state.studentState.student);

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

  const updateSavingsOnServer = (value) => {
    console.log('SEND TO SERVER::::');
    updateStudentById(student._id, { savingsBudget: value })
      .then((res) => {
        console.log('UPDATED SAVINGS:::: ', res);
      })
      .catch((err) => console.error(err));
  };

  const updateSavings = (value) => {
    dispatch(setSavings(+value));

    if (debounceTimeout) {
      window.clearTimeout(debounceTimeout);
    }
    debounceTimeout = window.setTimeout(() => {
      updateSavingsOnServer(+value);
    }, 1000);
  };

  return student ? (
    <div className='page-container'>
      <HeaderComponent
        stickBtn={budgetStick}
        objectives={['1. Learn about your budget.']}
        level={student.level}
        inverse={true}
      />

      <PageBoard hideCloseBtn={true} includeBackButton={true}>
        <div className='budget-page-board-inner'>
          <span style={{ position: 'absolute', left: '1rem', top: '1rem' }}>
            <SharkieButton
              tutorialSlides={[budgetSlides]}
              textPosition='right'
            />
          </span>

          <div className='budget-equation-container'>
            <BudgetEquation
              budget={{
                total: student.totalBudget,
                savings: student.savingsBudget,
                spent: student.moneySpent,
              }}
              animationStates={budgetEquationStates}
            />
          </div>
          <p className='helper-text color-primary'>
            Move the yellow puck to change how much you save!
          </p>
          <div className='budget-slider-container'>
            <BudgetSlider
              budget={{
                total: student.totalBudget,
                savings: student.savingsBudget,
                spent: student.moneySpent,
              }}
              setValue={updateSavings}
            />
          </div>
        </div>
      </PageBoard>
      {tutorialActive && (
        <Tutorial slides={[budgetSlides]} onComplete={onTutorialComplete} />
      )}
    </div>
  ) : (
    <div
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <LoadingSpinner />
    </div>
  );
};

export default BudgetPage;
