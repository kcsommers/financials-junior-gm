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
  FooterComponent,
} from '@components';
import { batch } from 'react-redux';
import {
  budgetSlides,
  SharkieButton,
  Tutorial,
  getConfirmSlides,
} from '@tutorial';
import {
  setTutorialIsActive,
  setSavings,
  setStudent,
  toggleOverlay,
  setObjectiveComplete,
  setSeasonActive,
  useAppSelector,
  useAppDispatch,
} from '@redux';
import comericaLogo from '@images/comerica-logo.svg';
import { Objectives } from '@data/objectives/objectives';
import { faqs } from '@data/faqs/faqs';
import { cloneDeep } from 'lodash';
import { startingLineupFull } from '@data/players/players-utils';
import '@css/pages/BudgetPage.css';
import { ApiHelper } from '@statrookie/core';
import { BASE_URL } from 'app/api';

let debounceTimeout = 0;

export const BudgetPage = ({ history }) => {
  const dispatch = useAppDispatch();
  const student = useAppSelector((state) => state.studentState.student);
  const { moneySpent } = useAppSelector((state) => state.players);
  const { inTransition, awards, inSession } = useAppSelector(
    (state) => state.season
  );

  const tutorialState = useAppSelector((state) => state.tutorial);
  const [tutorialSlides, setTutorialSlides] = useState([budgetSlides]);
  const [tutorialPaused, setTutorialPaused] = useState(false);
  const [tutorialBudget, setTutorialBudget] = useState({
    total: 15,
    savings: 9,
    spent: 0,
  });

  const _setSeasonActive = useCallback(() => {
    if (startingLineupFull(student)) {
      dispatch(setSeasonActive(true));
    }
  }, [dispatch, student]);

  const onTutorialComplete = (canceled) => {
    if (canceled) {
      dispatch(setTutorialIsActive(false));
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

      ApiHelper.updateStudentById(BASE_URL, student._id, {
        tutorials,
        objectives,
      })
        .then(({ updatedStudent }) => {
          batch(() => {
            dispatch(setTutorialIsActive(false));
            dispatch(setStudent(updatedStudent));
            dispatch(
              setObjectiveComplete({
                objectiveType: Objectives.LEARN_BUDGET,
                isComplete: true,
              })
            );
            _setSeasonActive();
          });
        })
        .catch((err) => console.error(err));
    } else {
      batch(() => {
        dispatch(setTutorialIsActive(false));
        dispatch(
          setObjectiveComplete({
            objectiveType: Objectives.LEARN_BUDGET,
            isComplete: true,
          })
        );
        _setSeasonActive();
      });
    }
  };

  const startTutorial = useCallback(
    (slides) => {
      setTutorialSlides(slides);
      dispatch(setTutorialIsActive(true));
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
            title="Budget Page FAQs"
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
    board: useAppSelector((state) => state.tutorial.budget.equationBoard),
    total: useAppSelector((state) => state.tutorial.budget.total),
    savings: useAppSelector((state) => state.tutorial.budget.savings),
    spending: useAppSelector((state) => state.tutorial.budget.spending),
  };

  const updateSavingsOnServer = (value) => {
    ApiHelper.updateStudentById(BASE_URL, student._id, { savingsBudget: value })
      .then(() => {})
      .catch((err) => console.error(err));
  };

  const updateSavings = (value) => {
    if (tutorialPaused || (tutorialState.isActive && value >= 13)) {
      return;
    }

    if (tutorialState.isActive) {
      if (tutorialState.advanceListener) {
        const canAdvance = tutorialState.advanceListener(+value);
        if (canAdvance) {
          setTutorialPaused(true);
          setTimeout(() => {
            setTutorialPaused(false);
          }, 3000);
        }
      }
      setTutorialBudget({
        ...tutorialBudget,
        savings: +value,
      });
      return;
    }

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

      ApiHelper.updateStudentById(BASE_URL, student._id, { objectives })
        .then((res) => {
          batch(() => {
            dispatch(setStudent(res.updatedStudent));
            dispatch(
              setObjectiveComplete({
                objectiveType: Objectives.LEARN_BUDGET,
                isComplete: true,
              })
            );
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
              next={(levelChange) => {
                history.push({ pathname: '/home', state: { levelChange } });
              }}
              finished={(gameFinished) => {
                history.push({ pathname: '/home', state: { gameFinished } });
              }}
            />
          ),
          canClose: false,
        })
      );
    });
  }

  return (
    <div className="page-container budget-page-container">
      <HeaderComponent
        stickBtn="homeRight"
        level={student.level}
        inverse={true}
        tutorialActive={tutorialState.isActive}
      />

      <PageBoard height="100%">
        <div className="budget-page-board-inner">
          {+student.rollOverBudget > 0 && (
            <div
              style={{ textAlign: 'center' }}
              className="rollover-budget-wrap"
            >
              <span
                className="rollover-budget-indicator-wrap"
                onClick={openRolloverBudgetOverlay}
              >
                <img
                  style={{
                    width: '150px',
                    margin: '0.25rem 0',
                  }}
                  src={comericaLogo}
                  alt="Comerica Savings Button"
                />
                <Indicator
                  amount={+student.rollOverBudget}
                  isMoney={true}
                  borderColor="#00788a"
                  isComericaBtn={true}
                />
              </span>
              <p
                style={{
                  color: '#002f6d',
                  fontSize: '0.85rem',
                }}
              >
                Click the Comerica Savings Button to use last season's savings
              </p>
            </div>
          )}
          <div
            style={{
              position: 'absolute',
              right: '1rem',
              top: '1rem',
            }}
          >
            <SharkieButton onCallSharkie={onCallSharkie} textPosition="left" />
          </div>
          <div className="budget-equation-container">
            <BudgetEquation
              budget={
                tutorialState.isActive
                  ? tutorialBudget
                  : {
                      total: +student.totalBudget,
                      savings: student.savingsBudget,
                      spent: moneySpent,
                      rollOver: +student.rollOverBudget,
                    }
              }
              animationStates={budgetEquationStates}
            />
          </div>
          <p className="helper-text color-primary">
            Move the yellow puck to change how much you save!
          </p>
          <div className="budget-slider-container">
            <BudgetSlider
              budget={
                tutorialState.isActive
                  ? tutorialBudget
                  : {
                      total: +student.totalBudget,
                      savings: +student.savingsBudget,
                      spent: moneySpent,
                    }
              }
              setValue={updateSavings}
              student={student}
            />
          </div>
        </div>
      </PageBoard>

      <FooterComponent
        links={['team', 'season', 'trophies']}
        history={history}
        tutorialActive={tutorialState.isActive}
        student={student}
      />
      <Overlay />
      {tutorialState.isActive && (
        <Tutorial slides={tutorialSlides} onComplete={onTutorialComplete} />
      )}
    </div>
  );
};
