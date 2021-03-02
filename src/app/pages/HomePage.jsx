import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
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
  introSlides,
  objectivesSlides,
  teamRankSlides,
  moneyLeftSlides,
  teamStickSlides,
  budgetStickSlides,
  trophiesStickSlides,
  seasonStickSlides,
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
  updateStudent,
  toggleOverlay,
  setStudent,
  setInitialPlayersState,
  initializeSeason,
  initializeObjectives,
} from '@redux/actions';
import { updateStudentById } from './../api-helper';
import { cloneDeep } from 'lodash';
import { getMaxTeamRank } from '@data/players/players-utils';
import { getStudentTeam } from '@data/season/season';
import '@css/pages/HomePage.css';

const homeSlides = [
  introSlides,
  objectivesSlides,
  teamRankSlides,
  moneyLeftSlides,
  teamStickSlides,
  budgetStickSlides,
  trophiesStickSlides,
  seasonStickSlides,
];

export const HomePage = ({ location, history }) => {
  const tutorialActive = useSelector((state) => state.tutorial.isActive);

  const student = useSelector((state) => state.studentState.student);

  const { moneySpent, teamRank } = useSelector((state) => state.players);

  const { inTransition, awards, inSession } = useSelector(
    (state) => state.season
  );

  const dispatch = useDispatch();

  const [tutorialSlides, setTutorialSlides] = useState(homeSlides);

  const animationStates = {
    teamStick: useSelector((state) => state.tutorial.home.teamStick),
    seasonStick: useSelector((state) => state.tutorial.home.seasonStick),
    budgetStick: useSelector((state) => state.tutorial.home.budgetStick),
    trophiesStick: useSelector((state) => state.tutorial.home.trophiesStick),
    teamRankCard: useSelector((state) => state.tutorial.home.teamRankCard),
    budgetCard: useSelector((state) => state.tutorial.home.budgetCard),
    objectivesBoard: useSelector(
      (state) => state.tutorial.home.objectivesBoard
    ),
  };

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

  const onCallSharkie = () => {
    startTutorial([getConfirmSlides('home'), ...homeSlides.slice(1)]);
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
      const clonedTutorials = cloneDeep(student.tutorials || {});
      clonedTutorials.home = true;
      updateStudentById(student._id, { tutorials: clonedTutorials })
        .then((res) => {
          dispatch(updateStudent({ tutorials: clonedTutorials }));
          startTutorial(homeSlides);
        })
        .catch((err) => console.error(err));
    }
  }, [student, dispatch, startTutorial]);
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

  return (
    <div className='home-page-container'>
      <Navigation tutorialActive={tutorialActive} student={student} />
      <div className='home-cards-row'>
        {tutorialActive ? (
          <motion.div
            className='level-stick-card transparent'
            animate={animationStates.teamRankCard}
            transition={{ default: { duration: 1 } }}
          >
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
          </motion.div>
        ) : (
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
        )}
        {tutorialActive ? (
          <motion.div
            className='objectives-board-container'
            animate={animationStates.objectivesBoard}
            transition={{ default: { duration: 1 } }}
          >
            {objectivesBoard}
          </motion.div>
        ) : (
          <div className='objectives-board-container'>{objectivesBoard}</div>
        )}
        <div className='sharkie-btn-container'>
          <SharkieButton textPosition='bottom' onCallSharkie={onCallSharkie} />
        </div>
        {tutorialActive ? (
          <motion.div
            className='level-stick-card transparent'
            animate={animationStates.budgetCard}
            transition={{ default: { duration: 1 } }}
          >
            <LevelStick
              type='budget'
              amount={student.totalBudget - moneySpent - student.savingsBudget}
              denom={student.totalBudget}
              color='#002f6c'
              indicatorDirection='left'
              inverse={true}
              levelDirection='topToBottom'
              textJsx={
                <span>
                  Spending <br />
                  Budget
                </span>
              }
            />
          </motion.div>
        ) : (
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
        )}
      </div>
      <div className='hockey-sticks-container'>
        <div className='hockey-sticks-row'>
          <div className='stick-btn-container'>
            <StickButton
              tutorialActive={tutorialActive}
              link='/team'
              image={teamStick}
              animationState={animationStates.teamStick}
              hideDuringTutorial={true}
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
              animationState={animationStates.budgetStick}
              hideDuringTutorial={true}
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
              animationState={animationStates.seasonStick}
              hideDuringTutorial={true}
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
              tutorialActive={tutorialActive}
              inverse={true}
              link='/trophies'
              image={trophiesStick}
              animationState={animationStates.trophiesStick}
              hideDuringTutorial={true}
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
