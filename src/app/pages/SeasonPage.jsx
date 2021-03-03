import { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import {
  HeaderComponent,
  PageBoard,
  Jumbotron,
  LevelStick,
  GameBlockBoard,
  StandingsBoard,
  GameButton,
  Overlay,
  SeasonCompleteOverlay,
  NextSeasonOverlay,
  FaqOverlay,
} from '@components';
import seasonStick from '@images/season-stick.svg';
import {
  GamePhases,
  gamePhases,
  getGameResult,
  scenarios,
} from '@data/season/season';
import { cloneDeep } from 'lodash';
import { updateStudentById } from './../api-helper';
import {
  throwScenario,
  injurePlayer,
  setStudent,
  gameEnded,
  setTutorialState,
  toggleOverlay,
  setCurrentOpponentIndex,
  updateStudent,
  setSeasonComplete,
  addObjective,
  INJURE_PLAYER,
} from '@redux/actions';
import {
  seasonSlides,
  SharkieButton,
  Tutorial,
  getConfirmSlides,
} from '@tutorial';
import { motion } from 'framer-motion';
import { Objective, Objectives } from '@data/objectives/objectives';
import { faqs } from '@data/faqs/faqs';
import { getMaxTeamRank } from '@data/players/players-utils';
import '@css/pages/SeasonPage.css';

const allActions = {
  [INJURE_PLAYER]: injurePlayer,
};

let timer = 0;

export const SeasonPage = ({ history }) => {
  const dispatch = useDispatch();
  const student = useSelector((state) => state.studentState.student);
  const { teamPlayers, teamRank } = useSelector((state) => state.players);
  const tutorialActive = useSelector((state) => state.tutorial.isActive);

  const seasonState = useSelector((state) => state.season);

  const [state, setState] = useState({
    currentBlock: seasonState.gameBlocks[seasonState.currentBlockIndex],
    currentOpponentIndex: seasonState.currentOpponentIndex,
    currentPhaseIndex: 0,
    currentMessageIndex: 0,
  });
  const [tutorialSlides, setTutorialSlides] = useState([seasonSlides]);
  const animationStates = {
    standings: useSelector((state) => state.tutorial.season.standings),
    playButton: useSelector((state) => state.tutorial.season.playButton),
    studentRank: useSelector((state) => state.tutorial.season.studentRank),
  };
  const currentPhase = gamePhases(+student.level)[state.currentPhaseIndex];

  const onTutorialComplete = () => {
    // check if this was the first time the tutorial was viewed
    if (!student.tutorials.season) {
      // if so, update the student object and enable budget button
      const tutorials = { ...student.tutorials, season: true };
      updateStudentById(student._id, { tutorials })
        .then(({ updatedStudent }) => {
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
    dispatch(
      toggleOverlay({
        isOpen: true,
        template: (
          <FaqOverlay
            questions={faqs.season}
            title='Season Page FAQs'
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

  const opponenetIndexRef = useRef(state.currentOpponentIndex);
  useEffect(() => {
    return () => {
      if (opponenetIndexRef.current === state.currentOpponentIndex) {
        // if we're here and the opponent index hasnt changed, it means
        // the component is unmounting. Store the index in redux
        if (timer) {
          window.clearTimeout(timer);
        }
        dispatch(setCurrentOpponentIndex(state.currentOpponentIndex));
      }
    };
  }, [dispatch, state.currentOpponentIndex]);
  opponenetIndexRef.current = state.currentOpponentIndex;

  if (timer) {
    window.clearTimeout(timer);
  }

  const gameBlockState = {
    currentOpponent:
      state && state.currentBlock
        ? state.currentBlock[state.currentOpponentIndex]
        : null,
    currentPhase: gamePhases(+student.level)[state.currentPhaseIndex],
    currentScore: seasonState.completedGames[state.currentOpponentIndex]
      ? seasonState.completedGames[state.currentOpponentIndex].score
      : [0, 0],
    message: gamePhases(+student.level)[state.currentPhaseIndex].messages[
      state.currentMessageIndex
    ],
  };

  if (
    gameBlockState.currentOpponent &&
    gameBlockState.currentPhase &&
    gameBlockState.currentPhase.phase === GamePhases.UP_NEXT &&
    state.currentMessageIndex === 1
  ) {
    gameBlockState.currentPhase.messages[1] = `${seasonState.seasonTeam.name} vs ${gameBlockState.currentOpponent.name}`;
    gameBlockState.message = gameBlockState.currentPhase.messages[1];
  }

  const endSeason = () => {
    const clonedStudent = cloneDeep(student);
    const studentTeamIndex = seasonState.standings.findIndex(
      (t) => t.name === seasonState.seasonTeam.name
    );
    const awards = {
      savingsCup: student.savingsBudget > 0,
      thirdCup: studentTeamIndex < 3,
      firstCup: studentTeamIndex === 0,
    };

    (clonedStudent.awards || []).splice(+clonedStudent.level - 1, 1, awards);

    if (clonedStudent.seasons[(+student.level || 1) - 1]) {
      clonedStudent.seasons[(+student.level || 1) - 1].push(
        seasonState.completedGames
      );
    } else {
      clonedStudent.seasons[(+student.level || 1) - 1] = [
        seasonState.completedGames,
      ];
    }

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
                  level={+res.updatedStudent.level}
                  team={seasonState.seasonTeam}
                  student={res.updatedStudent}
                />
              ),
              canClose: false,
            })
          );
        });

        history.push('/trophies');
      })
      .catch((err) => console.error(err));
  };

  const endBlock = () => {
    // if this is the last game block season is over
    if (seasonState.currentBlockIndex === seasonState.gameBlocks.length - 1) {
      endSeason();
      return;
    }

    // get the next scenario
    const currentScenario =
      scenarios[+student.level || 1][seasonState.currentBlockIndex];
    if (!currentScenario) {
      return;
    }
    const scenarioPlayer = currentScenario.getPlayer(teamPlayers);
    const prevAssignment = scenarioPlayer.playerAssignment;
    const playersCopy = cloneDeep(student.players);

    scenarioPlayer.playerAssignment = currentScenario.playerAssignment;
    currentScenario.player = scenarioPlayer;

    playersCopy.splice(
      playersCopy.findIndex((p) => p._id === scenarioPlayer._id),
      1,
      scenarioPlayer
    );

    updateStudentById(student._id, {
      [prevAssignment]: currentScenario.playerAssignment,
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
  };

  const nextGame = () => {
    const nextOpponentIndex = state.currentOpponentIndex + 1;
    const clonedState = cloneDeep(state);
    clonedState.currentOpponentIndex = nextOpponentIndex;
    clonedState.currentPhaseIndex = 1; // skip the first phase
    clonedState.currentMessageIndex = 0;
    setState(clonedState);
  };

  const nextPhase = () => {
    // end of games, throw scenario and set redux state
    if (
      state.currentOpponentIndex === state.currentBlock.length - 1 &&
      gameBlockState.currentPhase.phase === GamePhases.GAME_OVER
    ) {
      endBlock();
      return;
    }
    // end of phases, go to next game
    if (gameBlockState.currentPhase.phase === GamePhases.TRANSITION) {
      nextGame();
      return;
    }

    const nextPhaseIndex = state.currentPhaseIndex + 1;
    const clonedState = cloneDeep(state);
    clonedState.currentPhaseIndex = nextPhaseIndex;
    clonedState.currentMessageIndex = 0;

    if (gameBlockState.currentPhase.phase === GamePhases.GAME_ON) {
      // time to get game results
      const results = getGameResult(teamRank, gameBlockState.currentOpponent);
      clonedState.currentMessageIndex = results.messageIndex;
      // clonedState.results.push(results);
      dispatch(
        gameEnded(results, gameBlockState.currentOpponent, +student.level)
      );
    }

    setState(clonedState);
  };

  const nextMessage = () => {
    // end of messages, go to next phase
    if (state.currentMessageIndex === currentPhase.messages.length - 1) {
      nextPhase();
      return;
    }
    const nextMessageIndex = state.currentMessageIndex + 1;
    const clonedState = cloneDeep(state);
    clonedState.currentMessageIndex = nextMessageIndex;
    setState(clonedState);
  };

  const startGameBlock = () => {
    setState({
      ...state,
      currentPhaseIndex: 1,
    });
  };

  if (!seasonState.currentScenario && currentPhase) {
    if (currentPhase.messages.length > 1 && currentPhase.messageTimer) {
      timer = window.setTimeout(nextMessage, currentPhase.messageTimer);
    } else if (currentPhase.timer) {
      timer = window.setTimeout(nextPhase, currentPhase.timer);
    }
  }

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
              awards={seasonState.awards}
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
        stickBtn={seasonStick}
        level={+student.level}
        tutorialActive={tutorialActive}
      />

      <PageBoard hideCloseBtn={true} includeBackButton={true}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            overflowX: 'hidden',
          }}
        >
          <div className='season-page-board-top'>
            <div className='student-team-rank-container'>
              <LevelStick
                type='teamRank'
                amount={teamRank}
                denom={getMaxTeamRank(+student.level)}
                color='#e06d00'
                indicatorDirection='right'
                isLarge={true}
                textJsx={
                  <span>
                    Team <br />
                    Rank
                  </span>
                }
              />
            </div>
            <div className='jumbotron-container'>
              <Jumbotron
                gameBlockState={gameBlockState}
                seasonState={seasonState}
                currentOpponentIndex={state.currentOpponentIndex}
                team={teamPlayers}
              />
            </div>
            <div className='opposing-team-rank-container'>
              <LevelStick
                type='teamRank'
                amount={
                  gameBlockState.currentOpponent
                    ? gameBlockState.currentOpponent.teamRank
                    : 0
                }
                denom={getMaxTeamRank(+student.level)}
                color={
                  gameBlockState.currentOpponent
                    ? gameBlockState.currentOpponent.color
                    : '#fff'
                }
                indicatorDirection='left'
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
          <div className='season-page-board-bottom'>
            <div className='play-btn-container'>
              <motion.span
                animate={animationStates.playButton}
                className='play-btn-wrap'
              >
                {seasonState.currentScenario &&
                  seasonState.currentScenario.gameButtonLabel && (
                    <span className='color-primary'>
                      {seasonState.currentScenario.gameButtonLabel}
                    </span>
                  )}
                <GameButton
                  onClick={startGameBlock}
                  gameBlockState={gameBlockState}
                  team={teamPlayers}
                  currentScenario={seasonState.currentScenario}
                />
              </motion.span>
              <div className='game-count'>
                Game{' '}
                {state.currentOpponentIndex +
                  1 +
                  seasonState.currentBlockIndex * 4}{' '}
                of {seasonState.allOpponents.length}
              </div>
            </div>
            <div className='game-block-board-container'>
              <div
                style={{
                  position: 'absolute',
                  left: '-1rem',
                  top: 0,
                  padding: '0.5rem',
                  transform: 'scale(0.85) translateY(-65%)',
                  zIndex: tutorialActive ? 0 : 1,
                }}
              >
                <SharkieButton
                  textPosition='right'
                  style
                  onCallSharkie={onCallSharkie}
                />
              </div>
              <h6 style={{ textAlign: 'center', color: '#000000' }}>Results</h6>
              <GameBlockBoard />
            </div>
            <motion.div
              animate={animationStates.standings}
              className='standings-board-container'
            >
              <h6 style={{ textAlign: 'center', color: '#000000' }}>
                Standings
              </h6>
              <StandingsBoard />
            </motion.div>
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
