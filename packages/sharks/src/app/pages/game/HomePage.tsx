import { useState, useRef, useEffect, useCallback } from 'react';
import { batch } from 'react-redux';
import {
  ObjectivesBoard,
  StickButton,
  Navigation,
  LevelStick,
  NextSeasonOverlay,
  NewLevelOverlay,
  Overlay,
  FaqOverlay,
} from '@components';
import {
  introSlides,
  transitionSlidesTeam,
  transitionSlidesSeason,
  SharkieButton,
  Tutorial,
  getConfirmSlides,
} from '@tutorial';
import {
  setTutorialIsActive,
  toggleOverlay,
  setStudent,
  setInitialPlayersState,
  initializeSeason,
  initializeObjectives,
  useAppSelector,
  useAppDispatch,
} from '@redux';
import { cloneDeep } from 'lodash';
import { faqs } from '@data/faqs/faqs';
import {
  getMaxTeamRank,
  startingLineupFull,
} from '@data/players/players-utils';
import '@css/pages/HomePage.css';
import { ApiHelper } from '@statrookie/core';
import { BASE_URL } from 'app/api';

const shouldDisable = (_pageName, _student) => {
  if (+_student.level === 1) {
    if (_pageName === 'budget') {
      return !_student || !_student.tutorials || !_student.tutorials.home;
    }
    if (_pageName === 'team') {
      return !_student || !_student.tutorials || !_student.tutorials.budget;
    }
    if (_pageName === 'season') {
      return (
        !_student ||
        !_student.tutorials ||
        (!_student.tutorials.season && !startingLineupFull(_student))
      );
    }
  } else {
    const _pagesVisited = _student ? _student.pagesVisited || [] : [];
    if (_pageName === 'team') {
      return !_pagesVisited.includes('budget');
    }
    if (_pageName === 'season') {
      return !startingLineupFull(_student);
    }
  }
};

const getDisabledStickBtns = (student) => {
  const states = {};
  (states as any).budget = shouldDisable('budget', student);
  (states as any).team = shouldDisable('team', student);
  (states as any).season = shouldDisable('season', student);
  return states;
};

export const HomePage = ({ location, history }) => {
  const tutorialActive = useAppSelector((state) => state.tutorial.isActive);

  const student = useAppSelector((state) => state.studentState.student);

  const { moneySpent, teamRank } = useAppSelector((state) => state.players);

  const { inTransition, awards, inSession } = useAppSelector(
    (state) => state.season
  );

  const dispatch = useAppDispatch();

  const [tutorialSlides, setTutorialSlides] = useState([introSlides]);

  const [disabledStickBtns, setDisabledStickBtns] = useState(
    getDisabledStickBtns(student)
  );

  const onTutorialComplete = (canceled) => {
    if (canceled) {
      dispatch(setTutorialIsActive(false));
      return;
    }

    // check if this was the first time the tutorial was viewed
    if (!student.tutorials || !student.tutorials.home) {
      // if so, update the student object and enable budget button
      const tutorials = { home: true };
      ApiHelper.updateStudentById(BASE_URL, student._id, { tutorials })
        .then(({ updatedStudent }) => {
          setDisabledStickBtns({
            ...disabledStickBtns,
            budget: false,
          });

          batch(() => {
            dispatch(setTutorialIsActive(false));
            dispatch(setStudent(updatedStudent));
          });
        })
        .catch((err) => console.error(err));
    } else if (!student.tutorials.team) {
      dispatch(setTutorialIsActive(false));
      setDisabledStickBtns({
        ...disabledStickBtns,
        team: !student.tutorials.budget,
      });
    } else if (!student.tutorials.season) {
      dispatch(setTutorialIsActive(false));
      setDisabledStickBtns({
        ...disabledStickBtns,
        season: !startingLineupFull(student),
      });
    } else {
      dispatch(setTutorialIsActive(false));
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
            questions={faqs.home}
            title="Home Page FAQs"
            level={+student.level}
            onStartTutorial={() => {
              dispatch(
                toggleOverlay({
                  isOpen: false,
                  template: null,
                })
              );
              startTutorial([getConfirmSlides('home'), introSlides]);
            }}
          />
        ),
      })
    );
  };

  const objectivesBoard = (
    <ObjectivesBoard
      level={student ? +student.level : 1}
      visibleObjectives={3}
      filterComplete={false}
    />
  );

  const tutorialsRef = useRef(student.tutorials);
  useEffect(() => {
    if (!tutorialsRef.current || !tutorialsRef.current.home) {
      startTutorial([introSlides]);
      tutorialsRef.current = { home: true };
      return;
    }

    if (
      tutorialsRef.current.home &&
      tutorialsRef.current.budget &&
      !tutorialsRef.current.team
    ) {
      startTutorial([transitionSlidesTeam]);
      tutorialsRef.current = { ...tutorialsRef.current, team: true };
    }

    if (!tutorialsRef.current.season && startingLineupFull(student)) {
      startTutorial([transitionSlidesSeason]);
      tutorialsRef.current = { ...tutorialsRef.current, season: true };
    }
  }, [student, startTutorial]);
  tutorialsRef.current = student.tutorials;

  const nextSeason = useCallback(
    (levelChange) => {
      const { updatedStudent, isPromoted } = levelChange;
      batch(() => {
        dispatch(setStudent(updatedStudent));
        dispatch(
          setInitialPlayersState({
            players: updatedStudent.players,
            student: updatedStudent,
          })
        );
        dispatch(initializeSeason(updatedStudent));
        dispatch(
          initializeObjectives({ student: updatedStudent, reset: true })
        );
        window.setTimeout(() => {
          dispatch(
            toggleOverlay({
              isOpen: isPromoted,
              template: isPromoted ? (
                <NewLevelOverlay completedLevel={+updatedStudent.level - 1} />
              ) : null,
            })
          );
        });
      });
      setDisabledStickBtns(getDisabledStickBtns(updatedStudent));
    },
    [dispatch]
  );

  const gameFinished = useCallback(
    (updatedStudent) => {
      batch(() => {
        dispatch(setStudent(updatedStudent));
        dispatch(
          setInitialPlayersState({
            players: updatedStudent.players,
            student: updatedStudent,
          })
        );
        dispatch(initializeSeason(updatedStudent));
        dispatch(
          initializeObjectives({ student: updatedStudent, reset: true })
        );
        window.setTimeout(() => {
          dispatch(
            toggleOverlay({
              isOpen: true,
              template: <NewLevelOverlay completedLevel={3} />,
            })
          );
        });
      });
    },
    [dispatch]
  );

  useEffect(() => {
    if (!location.state) {
      return;
    }

    if (location.state.levelChange) {
      nextSeason(location.state.levelChange);

      const stateCopy = cloneDeep(location.state);
      delete stateCopy.levelChange;
      history.replace({ state: stateCopy });
    }

    if (location.state.gameFinished) {
      gameFinished(location.state.gameFinished.updatedStudent);

      const stateCopy = cloneDeep(location.state);
      delete stateCopy.gameFinished;
      history.replace({ state: stateCopy });
    }
  }, [nextSeason, history, location.state, gameFinished]);

  if (inTransition && !inSession) {
    window.setTimeout(() => {
      dispatch(
        toggleOverlay({
          isOpen: true,
          template: (
            <NextSeasonOverlay
              student={student}
              next={nextSeason}
              finished={(_gameFinished) =>
                gameFinished(_gameFinished.updatedStudent)
              }
            />
          ),
          canClose: false,
        })
      );
    });
  }

  return (
    <div className="home-page-container">
      <Navigation tutorialActive={tutorialActive} student={student} />
      <div className="home-cards-row">
        <div className="level-stick-card">
          <LevelStick
            type="teamRank"
            amount={teamRank}
            denom={getMaxTeamRank(+student.level)}
            color="#e06d00"
            indicatorDirection="right"
            textJsx={
              <span>
                Team <br />
                Rank
              </span>
            }
          />
        </div>

        <div className="objectives-board-container">{objectivesBoard}</div>

        <div className="sharkie-btn-container">
          <SharkieButton textPosition="bottom" onCallSharkie={onCallSharkie} />
        </div>

        <div className="level-stick-card card">
          <LevelStick
            type="budget"
            amount={Math.max(
              +student.totalBudget - moneySpent - +student.savingsBudget,
              0
            )}
            denom={student.totalBudget}
            color="#002f6c"
            indicatorDirection="left"
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

      <div className="hockey-sticks-container">
        <div className="hockey-sticks-row">
          <div className="stick-btn-container">
            <StickButton
              link="/team"
              stick="team"
              isDisabled={(disabledStickBtns as any).team}
            />
            <p
              className={`stick-btn-text${
                tutorialActive ? ' transparent' : ''
              }`}
            >
              Build your team by signing players!
            </p>
          </div>
          <div className="stick-btn-container">
            <StickButton
              link="/budget"
              inverse={true}
              stick="budget"
              isDisabled={(disabledStickBtns as any).budget}
            />
            <p
              className={`stick-btn-text stick-btn-text-right${
                tutorialActive ? ' transparent' : ''
              }`}
            >
              Manage your team's money.
            </p>
          </div>
        </div>
        <div className="hockey-sticks-row hockey-sticks-row-2">
          <div className="stick-btn-container">
            <StickButton
              link="/season"
              stick="season"
              isDisabled={(disabledStickBtns as any).season}
            />
            <p
              className={`stick-btn-text${
                tutorialActive ? ' transparent' : ''
              }`}
            >
              Play games and win the championship!
            </p>
          </div>
          <div className="stick-btn-container">
            <StickButton inverse={true} link="/trophies" stick="trophies" />
            <p
              className={`stick-btn-text stick-btn-text-right${
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
