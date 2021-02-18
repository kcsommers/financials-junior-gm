import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import {
  ObjectivesBoard,
  StickButton,
  Navigation,
  LevelStick,
  LoadingSpinner,
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
import { setTutorialState } from '@redux/actions';
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

const HomePage = () => {
  const tutorialActive = useSelector((state) => state.tutorial.isActive);

  const student = useSelector((state) => state.studentState.student);

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

  const objectivesBoard = (
    <ObjectivesBoard
      level={student.level}
      objectives={[
        '1. Learn about your budget.',
        '2. Fill your team by signing a player.',
        '3. Scout three more players to add to your team.',
      ]}
    />
  );

  const onCallSharkie = () => {
    setTutorialSlides([getConfirmSlides('home'), ...homeSlides.slice(1)]);
    dispatch(
      setTutorialState({
        isActive: true,
      })
    );
  };

  return student ? (
    <div className='home-page-container'>
      <Navigation tutorialActive={tutorialActive} />
      <div className='home-cards-row'>
        {tutorialActive ? (
          <motion.div
            className='level-stick-card hidden'
            animate={animationStates.teamRankCard}
            transition={{ default: { duration: 1 } }}
          >
            <LevelStick
              type='teamRank'
              amount={student.teamRank}
              denom={100}
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
              amount={student.teamRank}
              denom={100}
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
            className='level-stick-card hidden'
            animate={animationStates.budgetCard}
            transition={{ default: { duration: 1 } }}
          >
            <LevelStick
              type='budget'
              amount={
                student.totalBudget - student.moneySpent - student.savingsBudget
              }
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
              amount={
                student.totalBudget - student.moneySpent - student.savingsBudget
              }
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
            />
            <p className={`stick-btn-text${tutorialActive ? ' hidden' : ''}`}>
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
            />
            <p className={`stick-btn-text${tutorialActive ? ' hidden' : ''}`}>
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
            />
            <p className={`stick-btn-text${tutorialActive ? ' hidden' : ''}`}>
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
            />
            <p className={`stick-btn-text${tutorialActive ? ' hidden' : ''}`}>
              See your badges and trophies!
            </p>
          </div>
        </div>
      </div>
      {tutorialActive && (
        <Tutorial slides={tutorialSlides} onComplete={onTutorialComplete} />
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

export default HomePage;
