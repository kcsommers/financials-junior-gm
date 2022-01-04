import {
  Cheermeter,
  FaqOverlay,
  FooterComponent,
  GameButton,
  HeaderComponent,
  Jumbotron,
  LevelStick,
  NextSeasonOverlay,
  Overlay,
  PageBoard,
  SeasonCompleteOverlay,
  StandingsBoard,
} from '@components';
import '@css/pages/SeasonPage.css';
import { clearSessionStorage } from '@data/auth/auth';
import { faqs } from '@data/faqs/faqs';
import { Objective, Objectives } from '@data/objectives/objectives';
import { getMaxTeamRank } from '@data/players/players-utils';
import { GamePhases } from '@data/season/season';
import {
  getGamePhases,
  getGameResult,
  getNewScenario,
} from '@data/season/season-utils';
import {
  addObjective,
  gameEnded,
  injurePlayer,
  INJURE_PLAYER,
  setLoginState,
  setSeasonActive,
  setSeasonComplete,
  setStudent,
  setTutorialState,
  throwScenario,
  toggleOverlay,
} from '@redux/actions';
import {
  getConfirmSlides,
  seasonSlides,
  SharkieButton,
  Tutorial,
} from '@tutorial';
import { cloneDeep } from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { updateStudentById } from '../../api-helper';
import { SeasonStatsOverlay } from '../../components/public-api';
import { useInterval } from '../../hooks/use-interval';
import { logout } from './../../api-helper';

const allActions = {
  INJURE_PLAYER: injurePlayer,
};

export const SeasonPage = ({ history }) => {
  const dispatch = useAppDispatch();

  const student = useAppSelector((state) => state.studentState.student);
  const { teamPlayers, teamRank } = useAppSelector((state) => state.players);

  const tutorialActive = useAppSelector((state) => state.tutorial.isActive);
  const [tutorialSlides, setTutorialSlides] = useState([seasonSlides]);
  const animationStates = {
    standings: useAppSelector((state) => state.tutorial.season.standings),
    playButton: useAppSelector((state) => state.tutorial.season.playButton),
    studentRank: useAppSelector((state) => state.tutorial.season.studentRank),
  };

  const gamePhases = getGamePhases(+student.level);
  const seasonState = useAppSelector((state) => state.season);

  const [localGameState, setLocalGameState] = useState({
    currentPhaseIndex: 0,
    currentMessageIndex: 0,
    results: seasonState.completedGames[seasonState.currentOpponentIndex],
  });
  const gameState = {
    opponent: seasonState.allOpponents[seasonState.currentOpponentIndex],
    phase: gamePhases[localGameState.currentPhaseIndex],
    score: localGameState.results ? localGameState.results.score : [0, 0],
    message:
      gamePhases[localGameState.currentPhaseIndex].messages[
        localGameState.currentMessageIndex
      ],
  };

  const [gameCount, setGameCount] = useState(0);
  const prevPhaseIndex = useRef(0);

  const [cheerLevel, setCheerLevel] = useState(0);
  const [cheerCounter, setCheerCounter] = useState(0);
  const [cheerPoints, setCheerPoints] = useState(0);

  const [resetCheerInterval, toggleCheerInterval] = useInterval(
    () => {
      setCheerLevel((prevLevel) => Math.max(0, prevLevel - 1));
      setCheerCounter((prevCount) => Math.max(0, prevCount - 5));
    },
    2000,
    false
  );

  const endSeason = useCallback(
    (completedGames) => {
      const clonedStudent = cloneDeep(student);

      // get the students standing
      const studentTeamIndex = seasonState.standings.findIndex(
        (t) => t.name === seasonState.seasonTeam.name
      );

      // update student awards
      const prevAwards = (clonedStudent.awards || [])[+clonedStudent.level - 1];
      const newAwards = {
        savingsCup:
          (prevAwards && prevAwards.savingsCup) || student.savingsBudget > 0,
        thirdCup: (prevAwards && prevAwards.thirdCup) || studentTeamIndex < 3,
        firstCup: (prevAwards && prevAwards.firstCup) || studentTeamIndex === 0,
      };
      (clonedStudent.awards || []).splice(
        +clonedStudent.level - 1,
        1,
        newAwards
      );

      // set completed games in student seasons array
      clonedStudent.seasons[+student.level - 1] = completedGames;

      updateStudentById(student._id, {
        seasons: clonedStudent.seasons,
        awards: clonedStudent.awards,
        rollOverBudget: (+student.rollOverBudget || 0) + +student.savingsBudget,
        savingsBudget: 0,
      })
        .then((res) => {
          batch(() => {
            dispatch(setStudent(res.updateStudent));
            dispatch(setSeasonComplete(res.updatedStudent));
            dispatch(
              toggleOverlay({
                isOpen: true,
                template: (
                  <SeasonCompleteOverlay
                    standings={seasonState.standings}
                    team={seasonState.seasonTeam}
                  />
                ),
                canClose: false,
              })
            );
          });

          history.push('/trophies');
        })
        .catch((err) => console.error(err));
    },
    [student, dispatch, history, seasonState]
  );

  const newScenario = useCallback(
    (scenarioIndex) => {
      // get the next scenario
      const currentScenario = getNewScenario(
        +student.level,
        scenarioIndex,
        teamPlayers
      );
      if (!currentScenario) {
        return;
      }

      const scenarioPlayer = currentScenario.getPlayer();
      const prevAssignment = currentScenario.getPlayerPrevAssignment();
      const playersCopy = cloneDeep(student.players);

      // splice the scenario player into the players array
      playersCopy.splice(
        playersCopy.findIndex((p) => p._id === scenarioPlayer._id),
        1,
        scenarioPlayer
      );

      // update student with new players array and player assignment
      updateStudentById(student._id, {
        [prevAssignment]: null,
        players: playersCopy,
      })
        .then((res) => {
          batch(() => {
            dispatch(
              allActions[currentScenario.action](
                scenarioPlayer,
                prevAssignment,
                student
              )
            );
            dispatch(setStudent(res.updatedStudent));
            dispatch(throwScenario(currentScenario));
            dispatch(
              addObjective(
                new Objective(
                  currentScenario.objective,
                  Objectives.SEASON_SCENARIO,
                  true
                )
              )
            );
          });
        })
        .catch((err) => console.error(err));
    },
    [student, dispatch, teamPlayers]
  );

  const startGame = () => {
    // check if this is the first game of the season
    // if so set seasonActive to true
    if (
      !student.seasons ||
      !student.seasons[+student.level] ||
      !student.seasons[+student.level].length
    ) {
      dispatch(setSeasonActive(true));
    }
    // set current phase to 1
    setLocalGameState({
      ...localGameState,
      currentPhaseIndex: 1,
      results: null,
    });
  };

  const endGame = useCallback(() => {
    // reset cheer state
    setCheerLevel(0);
    setCheerCounter(0);
    setCheerPoints(0);
    toggleCheerInterval();
    prevPhaseIndex.current = 0;

    // add the game results to student season
    // and update student
    const clonedSeasons = cloneDeep(student.seasons || []);
    if (!clonedSeasons[+student.level - 1]) {
      clonedSeasons[+student.level - 1] = [];
    }
    clonedSeasons[+student.level - 1].push(localGameState.results);
    const nextOpponentIndex = seasonState.currentOpponentIndex + 1;
    updateStudentById(student._id, {
      seasons: clonedSeasons,
    })
      .then((res) => {
        batch(() => {
          // set game results in redux store
          dispatch(
            gameEnded({
              gameResult: localGameState.results,
              opponent: gameState.opponent,
              newOpponentIndex: nextOpponentIndex,
            })
          );
          dispatch(setStudent(res.updatedStudent));
        });

        // update local state
        setLocalGameState({
          ...localGameState,
          currentMessageIndex: 0,
          currentPhaseIndex: 0,
        });

        // end of season when all teams are played
        if (nextOpponentIndex === seasonState.allOpponents.length) {
          endSeason(clonedSeasons[+student.level - 1]);
          return;
        }
      })
      .catch((err) => console.error(err));
  }, [seasonState, student, gameState.opponent, localGameState]);

  const showStatsOverlay = useCallback(() => {
    dispatch(
      toggleOverlay({
        isOpen: true,
        template: (
          <SeasonStatsOverlay
            student={student}
            seasonState={seasonState}
            onExit={() => {
              logout()
                .then(() => {
                  clearSessionStorage();
                  dispatch(setLoginState(false, ''));
                  history.push('/dashboard');
                })
                .catch((err) => console.error(err));
            }}
          />
        ),
        canClose: false,
      })
    );
  }, [student, seasonState]);

  const _initialOpponentIndexCheck = useRef(true);
  useEffect(() => {
    if (_initialOpponentIndexCheck.current) {
      _initialOpponentIndexCheck.current = false;
      return;
    }
    if (
      seasonState.currentOpponentIndex &&
      seasonState.currentOpponentIndex % 4 === 0 &&
      seasonState.currentOpponentIndex < seasonState.allOpponents.length
    ) {
      updateStudentById(student._id, {
        objectives: {
          ...student.objectives,
          [Objectives.SEASON_SCENARIO]: false,
        },
      })
        .then(() => {
          newScenario(seasonState.currentOpponentIndex / 4 - 1);
        })
        .catch((err) => console.error(err));
    }
  }, [seasonState.currentOpponentIndex]);

  const opponentRef = useRef(gameState.opponent);
  const updateGameCount = useCallback(() => {
    setGameCount(gameCount + 1);
  }, [gameCount]);

  useEffect(() => {
    if (
      !gameState ||
      !gameState.opponent ||
      !opponentRef.current ||
      opponentRef.current.name === gameState.opponent.name
    ) {
      return;
    }
    opponentRef.current = gameState.opponent;
    updateGameCount();
  }, [gameState.opponent]);

  useEffect(() => {
    if (gameCount && gameCount % 2 === 0) {
      showStatsOverlay();
    }
  }, [gameCount]);

  const nextMessage = () => {
    // go to next message
    const nextMessageIndex = localGameState.currentMessageIndex + 1;
    setLocalGameState({
      ...localGameState,
      currentMessageIndex: nextMessageIndex,
    });
  };

  const onCheer = () => {
    // initial cheer
    if (cheerLevel === 0 && cheerCounter === 0) {
      toggleCheerInterval();
    }

    // update the click count
    const newCount = cheerCounter + 1;
    setCheerCounter(newCount);

    // every 5 clicks the cheerlevel increases and
    // the timer is reset
    if (newCount % 5 === 0) {
      setCheerLevel((prevLevel) => Math.min(prevLevel + 1, 15));
      resetCheerInterval();
    }
  };

  const prevCheerCount = useRef(cheerCounter);
  useEffect(() => {
    if (prevCheerCount.current > cheerCounter) {
      // if the cheer count has gone down,
      // reduce the team rank
      setCheerPoints((prevPoints) => Math.max(prevPoints - 1, 0));
    } else if (cheerCounter && cheerCounter % 15 === 0) {
      // otherwise every 15 clicks the team rank goes up 1 (max 5)
      setCheerPoints((prevPoints) => Math.min(prevPoints + 1, 5));
    }

    prevCheerCount.current = cheerCounter;
  }, [cheerCounter]);

  const onTutorialComplete = (canceled) => {
    if (canceled) {
      dispatch(setTutorialIsActive(false));
      return;
    }

    // check if this was the first time the tutorial was viewed
    if (!student.tutorials.season) {
      // if so, update the student object and enable budget button
      const tutorials = { ...student.tutorials, season: true };
      updateStudentById(student._id, { tutorials })
        .then(({ updatedStudent }) => {
          batch(() => {
            dispatch(setTutorialIsActive(false));
            dispatch(setStudent(updatedStudent));
          });
        })
        .catch((err) => console.error(err));
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

  // phase interval effect
  const [resetPhaseInterval, togglePhaseInterval, phaseIntervalRunning] =
    useInterval(() => nextPhase(), gameState.phase.timer, false);

  const nextPhase = useCallback(() => {
    const currentPhase = gameState.phase.phase;

    // end of phases, clear interval
    if (currentPhase === GamePhases.GAME_OVER) {
      togglePhaseInterval();
      endGame();
      return;
    }

    let messageIndex = 0;
    let results: any = null;
    if (currentPhase === GamePhases.GAME_ON) {
      // time to get game results
      results = getGameResult(teamRank + cheerPoints, gameState.opponent);
      messageIndex = results.messageIndex;
    }

    // game highlight phase message index is same as game over phase
    if (currentPhase === GamePhases.GAME_HIGHLIGHT) {
      results = localGameState.results;
      messageIndex = localGameState.currentMessageIndex;
    }

    // go to next phase
    const nextPhaseIndex = localGameState.currentPhaseIndex + 1;
    setLocalGameState({
      ...localGameState,
      currentMessageIndex: messageIndex,
      currentPhaseIndex: nextPhaseIndex,
      results,
    });
  }, [
    gameState.phase,
    gameState.opponent,
    localGameState,
    teamRank,
    cheerPoints,
    setLocalGameState,
    endGame,
    togglePhaseInterval,
  ]);

  useEffect(() => {
    // exit if message timer exists
    if (gameState.phase.messageTimer || !gameState.phase.timer) {
      if (phaseIntervalRunning) {
        togglePhaseInterval();
      }
      return;
    }

    if (prevPhaseIndex.current === localGameState.currentPhaseIndex) {
      return;
    }
    prevPhaseIndex.current = localGameState.currentPhaseIndex;
    phaseIntervalRunning ? resetPhaseInterval() : togglePhaseInterval();

    return;
  }, [localGameState.currentPhaseIndex, gameState.phase, phaseIntervalRunning]);

  // message interval effect
  const [resetMessageInterval, toggleMessageInterval, messageIntervalRunning] =
    useInterval(nextMessage, gameState.phase.messageTimer, false);
  const prevMessageIndex = useRef(0);
  useEffect(() => {
    if (!gameState.phase.messageTimer || !gameState.phase.messages.length) {
      return;
    }

    // end of messages, clear interval
    if (
      messageIntervalRunning &&
      gameState.phase.messages.length === localGameState.currentMessageIndex
    ) {
      toggleMessageInterval();
      nextPhase();
      return;
    }

    // begin message interval
    if (!messageIntervalRunning && localGameState.currentMessageIndex === 0) {
      toggleMessageInterval();
      return;
    }

    // reset message interval
    if (
      messageIntervalRunning &&
      prevMessageIndex.current === localGameState.currentMessageIndex
    ) {
      prevMessageIndex.current = localGameState.currentMessageIndex;
      resetMessageInterval();
    }

    return;
  }, [
    gameState.phase.messages.length,
    gameState.phase.messageTimer,
    localGameState.currentMessageIndex,
    messageIntervalRunning,
  ]);

  // in UP_NEXT phase, need to add the team names to the gameState message
  if (
    gameState.opponent &&
    gameState.phase &&
    gameState.phase.phase === GamePhases.UP_NEXT &&
    localGameState.currentMessageIndex === 1
  ) {
    gameState.phase.messages[1] = `${seasonState.seasonTeam.name} vs ${gameState.opponent.name}`;
    gameState.message = gameState.phase.messages[1];
  }

  const getGameButtonLabel = () => {
    if (gameState.phase.phase === GamePhases.GAME_ON) {
      return (
        <span className="color-primary">
          Click the puck or tap the spacebar to cheer for your team!
        </span>
      );
    }

    if (
      seasonState.currentScenario &&
      seasonState.currentScenario.gameButtonLabel
    ) {
      return (
        <span className="color-primary">
          {seasonState.currentScenario.gameButtonLabel}
        </span>
      );
    }

    return null;
  };

  const onCallSharkie = () => {
    dispatch(
      toggleOverlay({
        isOpen: true,
        template: (
          <FaqOverlay
            questions={faqs.season}
            title="Season Page FAQs"
            level={+student.level}
            onStartTutorial={() => {
              dispatch(
                toggleOverlay({
                  isOpen: false,
                  template: null,
                })
              );
              startTutorial([getConfirmSlides('season'), seasonSlides]);
            }}
          />
        ),
      })
    );
  };

  const hasSeenTutorial = useRef(
    !!(student && student.tutorials && student.tutorials.season)
  );
  useEffect(() => {
    if (student && !hasSeenTutorial.current) {
      hasSeenTutorial.current = true;
      startTutorial([seasonSlides]);
    }
  }, [student, startTutorial]);
  hasSeenTutorial.current = !!(
    student &&
    student.tutorials &&
    student.tutorials.season
  );

  if (seasonState.inTransition && !seasonState.inSession) {
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
    <div className="page-container">
      <HeaderComponent
        stickBtn="homeLeft"
        level={+student.level}
        tutorialActive={tutorialActive}
      />

      <PageBoard>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <span
            style={{
              position: 'absolute',
              left: '0.5rem',
              bottom: '23%',
              zIndex: tutorialActive ? 0 : 1,
            }}
          >
            <SharkieButton textPosition="right" onCallSharkie={onCallSharkie} />
          </span>
          <div className="season-page-board-top">
            <div className="student-team-rank-container">
              <LevelStick
                type="teamRank"
                amount={teamRank + cheerPoints}
                denom={getMaxTeamRank(+student.level)}
                color="#e06d00"
                indicatorDirection="right"
                isLarge={true}
                textJsx={
                  <span>
                    Team <br />
                    Rank
                  </span>
                }
              />
            </div>
            <div className="jumbotron-container">
              <Jumbotron
                gameState={gameState}
                seasonState={seasonState}
                team={teamPlayers}
                student={student}
                nextPhase={nextPhase}
              />
            </div>
            <div className="opposing-team-rank-container">
              <LevelStick
                type="teamRank"
                amount={gameState.opponent ? gameState.opponent.teamRank : 0}
                denom={getMaxTeamRank(+student.level)}
                color={gameState.opponent ? gameState.opponent.color : '#fff'}
                indicatorDirection="left"
                isLarge={true}
                inverse={true}
                textJsx={
                  <span>
                    Team <br />
                    Rank
                  </span>
                }
              />
            </div>
          </div>
          <div className="season-page-board-bottom">
            <div className="cheermeter-container">
              <Cheermeter cheerLevel={cheerLevel} />
            </div>
            <div className="game-btn-container">
              <div className="game-btn-container-inner">
                <div className="game-btn-label-wrap">
                  {getGameButtonLabel()}
                </div>

                <div className="game-btn-wrap">
                  <GameButton
                    onStartGame={startGame}
                    onCheer={onCheer}
                    gameState={gameState}
                    team={teamPlayers}
                    animationState={animationStates.playButton}
                    student={student}
                    cheerLevel={cheerLevel}
                    seasonState={seasonState}
                  />
                </div>

                <div className="game-count-wrap">
                  <span className="game-count">
                    Game{' '}
                    {Math.min(
                      seasonState.currentOpponentIndex + 1,
                      seasonState.allOpponents.length
                    )}{' '}
                    of {seasonState.allOpponents.length}
                  </span>
                </div>
              </div>
            </div>
            <div className="standings-board-container">
              <h6 style={{ textAlign: 'center', color: '#000000' }}>
                Standings
              </h6>
              <StandingsBoard animationState={animationStates.standings} />
            </div>
          </div>
        </div>
      </PageBoard>
      <FooterComponent
        links={['team', 'budget', 'trophies']}
        history={history}
        tutorialActive={tutorialActive}
        student={student}
      />

      <Overlay />
      {tutorialActive && (
        <Tutorial slides={tutorialSlides} onComplete={onTutorialComplete} />
      )}
    </div>
  );
};
