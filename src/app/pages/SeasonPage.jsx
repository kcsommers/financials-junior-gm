import { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  HeaderComponent,
  PageBoard,
  LoadingSpinner,
  Jumbotron,
  LevelStick,
  GameBlockBoard,
  StandingsBoard,
  StartGameButton,
  Overlay,
  SeasonCompleteOverlay,
} from '@components';
import seasonStick from '@images/season-stick.svg';
import {
  GamePhases,
  gamePhases,
  getGameResult,
  scenarios,
} from '@data/season/season';
import { cloneDeep } from 'lodash';
import { INJURE_PLAYER } from '@redux/actionTypes';
import { updateStudentById } from './../api-helper';
import {
  throwScenario,
  injurePlayer,
  setStudent,
  gameBlockEnded,
  gameEnded,
  setTutorialState,
  toggleOverlay,
  setCurrentOpponentIndex,
  updateStudent,
  setSeasonComplete,
} from '@redux/actions';
import {
  seasonSlides,
  SharkieButton,
  Tutorial,
  getConfirmSlides,
} from '@tutorial';
import '@css/pages/SeasonPage.css';
import { motion } from 'framer-motion';

const allActions = {
  [INJURE_PLAYER]: injurePlayer,
};

let timer = 0;

const SeasonPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const student = useSelector((state) => state.studentState.student);
  const team = useSelector((state) => state.players.teamPlayers);
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
  const currentPhase = gamePhases[state.currentPhaseIndex];

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
    startTutorial([getConfirmSlides('season'), seasonSlides]);
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
    currentOpponent: state.currentBlock[state.currentOpponentIndex],
    currentPhase: gamePhases[state.currentPhaseIndex],
    currentScore: seasonState.completedGames[state.currentOpponentIndex]
      ? seasonState.completedGames[state.currentOpponentIndex].score
      : [0, 0],
    message:
      gamePhases[state.currentPhaseIndex].messages[state.currentMessageIndex],
  };

  if (
    gameBlockState.currentPhase &&
    gameBlockState.currentPhase.phase === GamePhases.UP_NEXT
  ) {
    gameBlockState.currentPhase.messages[1] = `Jr. Sharks vs ${gameBlockState.currentOpponent.name}`;
  }

  const seasonComplete = () => {
    batch(() => {
      dispatch(setSeasonComplete(student));
      dispatch(
        toggleOverlay({
          isOpen: true,
          template: (
            <SeasonCompleteOverlay
              standings={seasonState.standings}
              level={student.level || 1}
              team={seasonState.seasonTeam}
              student={student}
            />
          ),
          canClose: false,
        })
      );
    });

    history.push('/trophies');
  };

  const endBlock = () => {
    // if this is the last game block season is over
    if (seasonState.currentBlockIndex === seasonState.gameBlocks.length - 1) {
      const studentSeasons = cloneDeep(student.seasons);
      if (studentSeasons[(student.level || 1) - 1]) {
        studentSeasons[(student.level || 1) - 1].push(
          seasonState.completedGames
        );
      } else {
        studentSeasons[(student.level || 1) - 1] = [seasonState.completedGames];
      }

      updateStudentById(student._id, {
        seasons: studentSeasons,
      })
        .then((res) => {
          dispatch(gameBlockEnded());
          seasonComplete();
        })
        .catch((err) => console.error(err));

      return;
    }

    // get the next scenario
    const currentScenario =
      scenarios[student.level || 1][seasonState.currentBlockIndex];
    if (!currentScenario) {
      return;
    }

    const scenarioPlayer = currentScenario.getPlayer(team);
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
            allActions[currentScenario.action](scenarioPlayer, prevAssignment)
          );
          dispatch(setStudent(res.updatedStudent));
          dispatch(throwScenario(currentScenario));
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
      const results = getGameResult(student, gameBlockState.currentOpponent);
      clonedState.currentMessageIndex = results.messageIndex;
      // clonedState.results.push(results);
      dispatch(gameEnded(results, gameBlockState.currentOpponent));
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
      const clonedTutorials = cloneDeep(student.tutorials || {});
      clonedTutorials.season = true;
      updateStudentById(student._id, { tutorials: clonedTutorials })
        .then((res) => {
          dispatch(updateStudent({ tutorials: clonedTutorials }));
          startTutorial([seasonSlides]);
        })
        .catch((err) => console.error(err));
    }
  }, [student, dispatch, startTutorial]);
  hasSeenTutorial.current = !!(
    student &&
    student.tutorials &&
    student.tutorials.season
  );

  return student ? (
    <div className='page-container'>
      <HeaderComponent
        stickBtn={seasonStick}
        objectives={['1. Play the season']}
        level={student.level}
      />

      <PageBoard hideCloseBtn={true} includeBackButton={true}>
        <div
          style={{
            position: 'absolute',
            right: '-5px',
            transform: 'scale(0.85)',
            zIndex: tutorialActive ? 0 : 1,
          }}
        >
          <SharkieButton textPosition='left' onCallSharkie={onCallSharkie} />
        </div>
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
                amount={student.teamRank}
                denom={100}
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
                team={team}
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
                denom={100}
                color={gameBlockState.currentOpponent.color}
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
                <StartGameButton
                  onClick={startGameBlock}
                  gameBlockState={gameBlockState}
                  team={team}
                />
              </motion.span>
            </div>
            <div className='game-block-board-container'>
              <GameBlockBoard />
            </div>
            <motion.div
              animate={animationStates.standings}
              className='standings-board-container'
            >
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

export default SeasonPage;
