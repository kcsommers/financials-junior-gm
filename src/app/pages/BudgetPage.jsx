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
import { useSelector, useDispatch, batch } from 'react-redux';
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
  setObjectiveComplete,
} from '@redux/actions';
import { updateStudentById } from '../api-helper';
import { cloneDeep } from 'lodash';
import { Objectives } from '@data/objectives/objectives';
import { getDollarString } from '@utils';
import '@css/pages/BudgetPage.css';

let debounceTimeout = 0;

export const BudgetPage = () => {
  const dispatch = useDispatch();
  const student = useSelector((state) => state.studentState.student);
  const { moneySpent } = useSelector((state) => state.players);
  const { inTransition, awards } = useSelector((state) => state.season);

  const tutorialActive = useSelector((state) => state.tutorial.isActive);

  const [tutorialSlides, setTutorialSlides] = useState([budgetSlides]);

  const onTutorialComplete = () => {
    batch(() => {
      dispatch(setTutorialState({ isActive: false }));
      dispatch(setObjectiveComplete(Objectives.LEARN_BUDGET, true));
    });
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

  const onCallSharkie = () => {
    startTutorial([getConfirmSlides('budget'), budgetSlides]);
  };

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
        level={student.level}
        inverse={true}
        tutorialActive={tutorialActive}
      />

      <PageBoard hideCloseBtn={true} includeBackButton={true}>
        <div className='budget-page-board-inner'>
          <div
            style={{
              position: 'absolute',
              left: '0',
              width: '100%',
              top: '0',
              display: 'flex',
              alignItems: 'center',
              justifyContent:
                student.rollOverBudget > 0 ? 'space-between' : 'flex-end',
              padding: '1rem',
            }}
          >
            {student.rollOverBudget > 0 && (
              <p
                className='box-shadow'
                style={{
                  textAlign: 'center',
                  backgroundColor: '#f3901d',
                  color: '#fff',
                  padding: '0.5rem',
                  borderRadius: '5px',
                }}
              >
                Rollover Budget
                <br />
                {getDollarString(student.rollOverBudget)}
              </p>
            )}
            <SharkieButton onCallSharkie={onCallSharkie} textPosition='left' />
          </div>
          <div className='budget-equation-container'>
            <BudgetEquation
              budget={{
                total: student.totalBudget,
                savings: student.savingsBudget,
                spent: moneySpent,
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
                spent: moneySpent,
              }}
              setValue={updateSavings}
              student={student}
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
