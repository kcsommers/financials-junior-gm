import { useState } from 'react';
import { useSelector } from 'react-redux';
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
import { GamePhases, gamePhases } from '@data/season/season';
import { cloneDeep } from 'lodash';

let timer = 0;

const getGameResult = (student, opponent) => {
  const rankDiff = student.teamRank - opponent.teamRank;
  if (rankDiff > 5) {
    return {
      score: [Math.ceil(rankDiff / 10), 0],
      messageIndex: 0,
      opponent: opponent.name,
    };
  } else if (Math.abs(rankDiff) > 0 && Math.abs(rankDiff) <= 5) {
    return {
      score: [2, 1],
      messageIndex: 1,
      opponent: opponent.name,
    };
  } else {
    return {
      score: [0, Math.ceil(Math.abs(rankDiff / 10))],
      messageIndex: 2,
      opponent: opponent.name,
    };
  }
};

const SeasonPage = () => {
  const student = useSelector((state) => state.studentState.student);

  const seasonState = useSelector((state) => state.season);

  const [state, setState] = useState({
    currentBlock: seasonState.gameBlocks[seasonState.gameBlockIndex],
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
    currentOppenent: state.currentBlock[state.currentOpponentIndex],
    currentPhase: gamePhases[state.currentPhaseIndex],
    currentScore: state.results[state.currentOpponentIndex]
      ? state.results[state.currentOpponentIndex].score
      : [0, 0],
    message:
      gamePhases[state.currentPhaseIndex].messages[state.currentMessageIndex],
  };

  if (gameBlockState.currentPhase.phase === GamePhases.UP_NEXT) {
    gameBlockState.currentPhase.messages[1] = `Jr Sharks vs ${gameBlockState.currentOppenent.name}`;
  }

  const endBlock = () => {
    console.log('END BLOCK::::');
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
      const results = getGameResult(student, gameBlockState.currentOppenent);
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

  if (currentPhase.messages.length > 1 && currentPhase.messageTimer) {
    timer = window.setTimeout(nextMessage, currentPhase.messageTimer);
  } else if (currentPhase.timer) {
    timer = window.setTimeout(nextPhase, currentPhase.timer);
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
              />
            </div>
            <div className='opposing-team-rank-container'>
              <LevelStick
                type='teamRank'
                amount={student.teamRank}
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
