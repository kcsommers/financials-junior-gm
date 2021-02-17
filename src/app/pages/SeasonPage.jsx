import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  HeaderComponent,
  PageBoard,
  LoadingSpinner,
  Jumbotron,
  LevelStick,
  GameBlockBoard,
  StandingsBoard,
  StartGameButton,
} from '@components';
import seasonStick from '@images/season-stick.svg';
import '@css/pages/SeasonPage.css';
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
  gameBlockEnded,
  setSeasonComplete,
  injurePlayer,
  setStudent,
} from '@redux/actions';

const allActions = {
  [INJURE_PLAYER]: injurePlayer,
};

let timer = 0;

const SeasonPage = () => {
  const dispatch = useDispatch();
  const student = useSelector((state) => state.studentState.student);
  const team = useSelector((state) => state.players.teamPlayers);

  const seasonState = useSelector((state) => state.season);

  const [state, setState] = useState({
    currentBlock: seasonState.gameBlocks[seasonState.currentBlockIndex],
    currentOpponentIndex: 0,
    currentPhaseIndex: 0,
    currentMessageIndex: 0,
    results: [],
  });

  const currentPhase = gamePhases[state.currentPhaseIndex];

  if (timer) {
    window.clearTimeout(timer);
  }

  const gameBlockState = {
    currentOpponent: state.currentBlock[state.currentOpponentIndex],
    currentPhase: gamePhases[state.currentPhaseIndex],
    currentScore: state.results[state.currentOpponentIndex]
      ? state.results[state.currentOpponentIndex].score
      : [0, 0],
    message:
      gamePhases[state.currentPhaseIndex].messages[state.currentMessageIndex],
  };

  if (
    gameBlockState.currentPhase &&
    gameBlockState.currentPhase.phase === GamePhases.UP_NEXT
  ) {
    gameBlockState.currentPhase.messages[1] = `Jr Sharks vs ${gameBlockState.currentOpponent.name}`;
  }

  const seasonComplete = () => {
    const p1 = new Promise((res) => res(true));
    console.log(':::: SEASON COMPLETE!! ::::');
    p1.then(() => {
      dispatch(setSeasonComplete());
    }).catch((err) => console.error(err));
  };

  const endBlock = () => {
    const p1 = new Promise((res) => res(true));
    console.log(':::: END BLOCK ::::');

    // if this is the last game block season is over
    if (seasonState.currentBlockIndex === seasonState.gameBlocks.length - 1) {
      seasonComplete();
      return;
    }

    // get the next scenario
    const currentScenario =
      scenarios[student.level][seasonState.currentBlockIndex];
    if (!currentScenario) {
      // no scenario after this game block
      p1.then(() => {
        dispatch(gameBlockEnded(state.results, null, student));
      }).catch((err) => console.error(err));
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

    p1.then((res) => {
      dispatch(
        allActions[currentScenario.action](scenarioPlayer, prevAssignment)
      );
      const updatedStudent = cloneDeep(student);
      updatedStudent[prevAssignment] = null;
      dispatch(setStudent(updatedStudent));
      dispatch(gameBlockEnded(state.results, currentScenario, student));
    }).catch((err) => console.error(err));
    // updateStudentById(student._id, {
    //   [prevAssignment]: currentScenario.playerAssignment,
    //   players: playersCopy,
    // })
    //   .then((res) => {
    //     dispatch(
    //       allActions[seasonState.currentScenario.action](
    //         scenarioPlayer,
    //         prevAssignment
    //       )
    //     );
    //     dispatch(setStudent(res.updatedStudent));
    //     dispatch(gameBlockEnded(state.results, currentScenario, student));
    //   })
    //   .catch((err) => console.error(err));
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
      clonedState.results.push(results);
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
                student={student}
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
                color='#e06d00'
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
              <span className='play-btn-wrap'>
                <StartGameButton
                  onClick={startGameBlock}
                  gameBlockState={gameBlockState}
                  team={team}
                />
              </span>
            </div>
            <div className='game-block-board-container'>
              <GameBlockBoard />
            </div>
            <div className='standings-board-container'>
              <StandingsBoard />
            </div>
          </div>
        </div>
      </PageBoard>
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
