import { useState, useRef, useEffect, useCallback } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import {
  ObjectivesBoard,
  StickButton,
  Navigation,
  LevelStick,
  NextSeasonOverlay,
  NewLevelOverlay,
  Overlay,
} from '@components';
import {
  homeSlides,
  SharkieButton,
  Tutorial,
  getConfirmSlides,
} from '@tutorial';
import teamStick from '@images/team-stick.svg';
import budgetStick from '@images/budget-stick.svg';
import seasonStick from '@images/season-stick.svg';
import trophiesStick from '@images/trophies-stick.svg';
import {
  setTutorialState,
  toggleOverlay,
  setStudent,
  setInitialPlayersState,
  initializeSeason,
  initializeObjectives,
} from '@redux/actions';
import { updateStudentById } from './../api-helper';
import { cloneDeep } from 'lodash';
import { getMaxTeamRank, getAvailableSlots } from '@data/players/players-utils';
import { getStudentTeam } from '@data/season/season';
import { playerProps } from '@data/players/players';
import '@css/pages/HomePage.css';

const getDisabledStickBtns = (student) => {
  const states = {};
  states.budget = !student || !student.tutorials || !student.tutorials.home;
  states.team = !student || !student.tutorials || !student.tutorials.budget;
  states.season =
    !student ||
    !student.tutorials ||
    (!student.season && getAvailableSlots(playerProps, student) < 9);

  return states;
};

export const HomePage = ({ location, history }) => {
  const tutorialActive = useSelector((state) => state.tutorial.isActive);

  const student = useSelector((state) => state.studentState.student);

  console.log('HOME:::::::', student, tutorialActive);

  const { moneySpent, teamRank } = useSelector((state) => state.players);

  const { inTransition, awards, inSession } = useSelector(
    (state) => state.season
  );

  const dispatch = useDispatch();

  const [tutorialSlides, setTutorialSlides] = useState([homeSlides]);

  const [disabledStickBtns, setDisabledStickBtns] = useState(
    getDisabledStickBtns(student)
  );

  const onTutorialComplete = () => {
    // check if this was the first time the tutorial was viewed
    if (!student.tutorials || !student.tutorials.home) {
      // if so, update the student object and enable budget button
      const tutorials = { home: true };
      updateStudentById(student._id, { tutorials })
        .then(({ updatedStudent }) => {
          setDisabledStickBtns({
            ...disabledStickBtns,
            budget: false,
          });

          batch(() => {
            dispatch(setTutorialState({ isActive: false }));
            dispatch(setStudent(updatedStudent));
          });
        })
        .catch((err) => console.error(err));
    } else {
      dispatch(setTutorialState({ isActive: false }));
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
    startTutorial([getConfirmSlides('home'), homeSlides]);
  };

  const objectivesBoard = (
    <ObjectivesBoard
      level={student ? +student.level : 1}
      visibleObjectives={3}
      filterComplete={false}
    />
  );

  const hasSeenTutorial = useRef(
    !!(student && student.tutorials && student.tutorials.home)
  );
  useEffect(() => {
    if (student && !hasSeenTutorial.current) {
      hasSeenTutorial.current = true;
      startTutorial([homeSlides]);
    }
  }, [student, startTutorial]);
  hasSeenTutorial.current = !!(
    student &&
    student.tutorials &&
    student.tutorials.home
  );

  const nextSeason = useCallback(
    (levelChange) => {
      const { updatedStudent, isPromoted } = levelChange;
      batch(() => {
        dispatch(setStudent(updatedStudent));
        dispatch(
          setInitialPlayersState(updatedStudent.players, updatedStudent)
        );
        dispatch(initializeSeason(updatedStudent));
        dispatch(initializeObjectives(updatedStudent));
        window.setTimeout(() => {
          dispatch(
            toggleOverlay({
              isOpen: isPromoted,
              template: isPromoted ? (
                <NewLevelOverlay team={getStudentTeam(+updatedStudent.level)} />
              ) : null,
            })
          );
        });
      });
    },
    [dispatch]
  );

  useEffect(() => {
    if (location.state && location.state.levelChange) {
      nextSeason(location.state.levelChange);

      const stateCopy = cloneDeep(location.state);
      delete stateCopy.levelChange;
      history.replace({ state: stateCopy });
    }
  }, [nextSeason, history, location.state]);

  if (inTransition && !inSession) {
    window.setTimeout(() => {
      dispatch(
        toggleOverlay({
          isOpen: true,
          template: (
            <NextSeasonOverlay
              student={student}
              awards={awards}
              next={nextSeason}
            />
          ),
          canClose: false,
        })
      );
    });
  }

  console.log('DISABELD:::: ', disabledStickBtns);

  return (
    <div className='home-page-container'>
      <Navigation tutorialActive={tutorialActive} student={student} />
      <div className='home-cards-row'>
        <div className='level-stick-card'>
          <LevelStick
            type='teamRank'
            amount={teamRank}
            denom={getMaxTeamRank(+student.level)}
            color='#e06d00'
            indicatorDirection='right'
            textJsx={
              <span>
                Team <br />
                Rank
              </span>
            }
          />
        </div>

        <div className='objectives-board-container'>{objectivesBoard}</div>

        <div className='sharkie-btn-container'>
          <SharkieButton textPosition='bottom' onCallSharkie={onCallSharkie} />
        </div>

        <div className='level-stick-card card'>
          <LevelStick
            type='budget'
            levelDirection='topToBottom'
            amount={student.totalBudget - moneySpent - student.savingsBudget}
            denom={student.totalBudget}
            color='#002f6c'
            indicatorDirection='left'
            inverse={true}
            textJsx={
              <span>
                Spending <br />
                Budget
              </span>
            }
          />
        </div>
      </div>

      <div className='hockey-sticks-container'>
        <div className='hockey-sticks-row'>
          <div className='stick-btn-container'>
            <StickButton
              tutorialActive={tutorialActive}
              link='/team'
              image={teamStick}
              isDisabled={disabledStickBtns.team}
            />
            <p
              className={`stick-btn-text${
                tutorialActive ? ' transparent' : ''
              }`}
            >
              Build your team by signing players!
            </p>
          </div>
          <div className='stick-btn-container'>
            <StickButton
              tutorialActive={tutorialActive}
              link='/budget'
              inverse={true}
              image={budgetStick}
              isDisabled={disabledStickBtns.budget}
            />
            <p
              className={`stick-btn-text${
                tutorialActive ? ' transparent' : ''
              }`}
            >
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
              isDisabled={disabledStickBtns.season}
            />
            <p
              className={`stick-btn-text${
                tutorialActive ? ' transparent' : ''
              }`}
            >
              Play games and win the championship!
            </p>
          </div>
          <div className='stick-btn-container'>
            <StickButton
              inverse={true}
              link='/trophies'
              image={trophiesStick}
            />
            <p
              className={`stick-btn-text${
                tutorialActive ? ' transparent' : ''
              }`}
            >
              See your badges and trophies!
            </p>
          </div>
        </div>
      </div>
      <Overlay />
      {tutorialActive && (
        <Tutorial slides={tutorialSlides} onComplete={onTutorialComplete} />
      )}
    </div>
  );
};
