import { useState, useRef, useEffect, useCallback } from 'react';
import {
  BudgetEquation,
  BudgetSlider,
  HeaderComponent,
  PageBoard,
  NextSeasonOverlay,
  Overlay,
} from '@components';
import budgetStick from '@images/budget-stick.svg';
import { useSelector, useDispatch } from 'react-redux';
import {
  budgetSlides,
  SharkieButton,
  Tutorial,
  getConfirmSlides,
} from '@tutorial';
import {
  setTutorialState,
  setSavings,
  updateStudent,
  toggleOverlay,
} from '@redux/actions';
import { updateStudentById } from '../api-helper';
import { cloneDeep } from 'lodash';
import '@css/pages/BudgetPage.css';

let debounceTimeout = 0;

export const BudgetPage = () => {
  const dispatch = useDispatch();
  const student = useSelector((state) => state.studentState.student);
  const { inTransition, awards } = useSelector((state) => state.season);

  const tutorialActive = useSelector((state) => state.tutorial.isActive);

  const [tutorialSlides, setTutorialSlides] = useState([budgetSlides]);

  const onTutorialComplete = () => {
    dispatch(setTutorialState({ isActive: false }));
  };

  const startTutorial = useCallback(
    (slides) => {
      setTutorialSlides(slides);
      dispatch(
        setTutorialState({
          isActive: true,
        })
      );
    },
    [dispatch]
  );

  const budgetEquationStates = {
    board: useSelector((state) => state.tutorial.budget.equationBoard),
    total: useSelector((state) => state.tutorial.budget.total),
    savings: useSelector((state) => state.tutorial.budget.savings),
    spending: useSelector((state) => state.tutorial.budget.spending),
  };

  const updateSavingsOnServer = (value) => {
    updateStudentById(student._id, { savingsBudget: value })
      .then(() => {})
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

  const onCallSharkie = () => {
    setTutorialSlides([getConfirmSlides('budget'), budgetSlides]);
  };

  const hasSeenTutorial = useRef(
    !!(student && student.tutorials && student.tutorials.home)
  );
  useEffect(() => {
    if (student && !hasSeenTutorial.current) {
      hasSeenTutorial.current = true;
      const clonedTutorials = cloneDeep(student.tutorials || {});
      clonedTutorials.budget = true;
      updateStudentById(student._id, { tutorials: clonedTutorials })
        .then((res) => {
          dispatch(updateStudent({ tutorials: clonedTutorials }));
          startTutorial([budgetSlides]);
        })
        .catch((err) => console.error(err));
    }
  }, [student, dispatch, startTutorial]);
  hasSeenTutorial.current = !!(
    student &&
    student.tutorials &&
    student.tutorials.budget
  );

  if (inTransition) {
    dispatch(
      toggleOverlay({
        isOpen: true,
        template: <NextSeasonOverlay student={student} awards={awards} />,
        canClose: false,
      })
    );
  }

  return (
    <div className='page-container'>
      <HeaderComponent
        stickBtn={budgetStick}
        objectives={['1. Learn about your budget.']}
        level={student.level}
        inverse={true}
        tutorialActive={tutorialActive}
      />

      <PageBoard hideCloseBtn={true} includeBackButton={true}>
        <div className='budget-page-board-inner'>
          <span style={{ position: 'absolute', left: '1rem', top: '1rem' }}>
            <SharkieButton onCallSharkie={onCallSharkie} textPosition='right' />
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
      <Overlay />
      {tutorialActive && (
        <Tutorial slides={tutorialSlides} onComplete={onTutorialComplete} />
      )}
    </div>
  );
};
