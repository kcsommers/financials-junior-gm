import { useState, useRef, useEffect, useCallback } from 'react';
import {
  BudgetEquation,
  BudgetSlider,
  HeaderComponent,
  PageBoard,
  NextSeasonOverlay,
  Overlay,
  FaqOverlay,
  Indicator,
  RolloverBudgetOverlay,
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
  setStudent,
  toggleOverlay,
  setObjectiveComplete,
  setSeasonActive,
} from '@redux/actions';
import { updateStudentById } from '../api-helper';
import { Objectives } from '@data/objectives/objectives';
import { faqs } from '@data/faqs/faqs';
import { cloneDeep } from 'lodash';
import { startingLineupFull } from '@data/players/players-utils';
import '@css/pages/BudgetPage.css';

let debounceTimeout = 0;

export const BudgetPage = ({ history }) => {
  const dispatch = useDispatch();
  const student = useSelector((state) => state.studentState.student);
  const { moneySpent } = useSelector((state) => state.players);
  const { inTransition, awards, inSession } = useSelector(
    (state) => state.season
  );

  const tutorialActive = useSelector((state) => state.tutorial.isActive);

  const [tutorialSlides, setTutorialSlides] = useState([budgetSlides]);

  const _setSeasonActive = useCallback(() => {
    if (startingLineupFull(student)) {
      dispatch(setSeasonActive(true));
    }
  }, [dispatch, student]);

  const onTutorialComplete = (canceled) => {
    if (canceled) {
      dispatch(setTutorialState({ isActive: false }));
      return;
    }

    // check if this was the first time the tutorial was viewed
    if (!student.tutorials || !student.tutorials.budget) {
      // if so, update the student object and enable budget button
      const tutorials = { home: true, budget: true };
      const objectives = student.objectives
        ? cloneDeep(student.objectives)
        : {};
      objectives[Objectives.LEARN_BUDGET] = true;

      updateStudentById(student._id, { tutorials, objectives })
        .then(({ updatedStudent }) => {
          batch(() => {
            dispatch(setTutorialState({ isActive: false }));
            dispatch(setStudent(updatedStudent));
            dispatch(setObjectiveComplete(Objectives.LEARN_BUDGET, true));
            _setSeasonActive();
          });
        })
        .catch((err) => console.error(err));
    } else {
      batch(() => {
        dispatch(setTutorialState({ isActive: false }));
        dispatch(setObjectiveComplete(Objectives.LEARN_BUDGET, true));
        _setSeasonActive();
      });
    }
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
    dispatch(
      toggleOverlay({
        isOpen: true,
        template: (
          <FaqOverlay
            questions={faqs.budget}
            title='Budget Page FAQs'
            level={+student.level}
            onStartTutorial={() => {
              dispatch(
                toggleOverlay({
                  isOpen: false,
                  template: null,
                })
              );
              startTutorial([getConfirmSlides('budget'), budgetSlides]);
            }}
          />
        ),
      })
    );
  };

  const openRolloverBudgetOverlay = () => {
    dispatch(
      toggleOverlay({
        isOpen: true,
        template: <RolloverBudgetOverlay student={student} />,
      })
    );
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

  useEffect(() => {
    if (
      student.tutorials &&
      student.tutorials.budget &&
      (!student.objectives || !student.objectives[Objectives.LEARN_BUDGET])
    ) {
      const objectives = student.objectives
        ? cloneDeep(student.objectives)
        : {};
      objectives[Objectives.LEARN_BUDGET] = true;

      updateStudentById(student._id, { objectives })
        .then((res) => {
          console.log('RES:::: ', res);
          batch(() => {
            dispatch(setStudent(res.updatedStudent));
            dispatch(setObjectiveComplete(Objectives.LEARN_BUDGET, true));
            _setSeasonActive();
          });
        })
        .catch((err) => console.error(err));
    }
  }, [dispatch, student, _setSeasonActive]);

  const hasSeenTutorial = useRef(
    !!(student && student.tutorials && student.tutorials.budget)
  );
  useEffect(() => {
    if (student && !hasSeenTutorial.current) {
      hasSeenTutorial.current = true;
      startTutorial([budgetSlides]);
    }
  }, [student, startTutorial]);
  hasSeenTutorial.current = !!(
    student &&
    student.tutorials &&
    student.tutorials.budget
  );

  if (inTransition && !inSession) {
    window.setTimeout(() => {
      dispatch(
        toggleOverlay({
          isOpen: true,
          template: (
            <NextSeasonOverlay
              student={student}
              awards={awards}
              next={(levelChange) => {
                history.push({ pathname: '/home', state: { levelChange } });
              }}
            />
          ),
          canClose: false,
        })
      );
    });
  }

  return (
    <div className='page-container'>
      <HeaderComponent
        stickBtn={budgetStick}
        level={student.level}
        inverse={true}
        tutorialActive={tutorialActive}
      />

      <PageBoard>
        <div className='budget-page-board-inner'>
          {+student.rollOverBudget > 0 && (
            <div className='rollover-budget-wrap'>
              <span
                className='rollover-budget-indicator-wrap'
                onClick={openRolloverBudgetOverlay}
              >
                <Indicator
                  amount={+student.rollOverBudget}
                  isMoney={true}
                  borderColor='#00788a'
                />
              </span>

              <p className='color-primary'>Use Previous Season's Savings</p>
            </div>
          )}
          <div
            style={{
              position: 'absolute',
              right: '1rem',
              top: '1rem',
            }}
          >
            <SharkieButton onCallSharkie={onCallSharkie} textPosition='left' />
          </div>
          <div className='budget-equation-container'>
            <BudgetEquation
              budget={{
                total: +student.totalBudget,
                savings: student.savingsBudget,
                spent: moneySpent,
                rollOver: +student.rollOverBudget,
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
                total: +student.totalBudget,
                savings: +student.savingsBudget,
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
