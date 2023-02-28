import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../auth/context/auth-context';
import { useGame } from '../../game/game-context';
import { GamePhases } from '../../game/season/game-phases';
import { scenarioActive } from '../../game/season/scenario-active';
import { Student } from '../../student/student.interface';
import { useInterval } from '../../utils/hooks/use-interval';
import { GameHighlightView } from './GameHighlightView';
import { GameOnView } from './GameOnView';
import { InjuredPlayerView } from './InjuredPlayerView';
import { ReadyView } from './ReadyView';
import { ScoreView } from './ScoreView';

export const Jumbotron = () => {
  const student = useAuth().authorizedUser as Student;
  const { seasonState, dispatch } = useGame();
  const {
    gamePhase,
    phaseMessageIndex,
    currentOpponent,
    currentOpponentIndex,
  } = seasonState;

  const upcomingOpponents = seasonState.opposingTeams.slice(
    currentOpponentIndex + 1,
    currentOpponentIndex + 3
  );

  const [phaseMessageTimer, setPhaseMessageTimer] = useState<number>(null);

  const nextPhaseMessage = useCallback(() => {
    if (phaseMessageIndex === gamePhase?.messages?.length - 1) {
      dispatch({ type: 'NEXT_GAME_PHASE' });
      return;
    }
    dispatch({ type: 'NEXT_PHASE_MESSAGE' });
  }, [gamePhase, phaseMessageIndex]);
  useInterval(nextPhaseMessage, phaseMessageTimer);

  useEffect(() => {
    setPhaseMessageTimer(gamePhase?.messageTimer);
  }, [gamePhase?.name]);

  console.log('injred player:::: ', seasonState.injuredPlayer);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="bg-neutral-500 relative h-[300px] w-[464px]">
        <div
          className="w-full h-full absolute top-0 bg-neutral-400 skew-x-12"
          style={{ left: '-35px' }}
        ></div>
        <div
          className="w-full h-full absolute top-0 bg-neutral-400 -skew-x-12"
          style={{ right: '-35px' }}
        ></div>
        <div className="w-full h-full absolute top-0 bg-neutral-500">
          {!!seasonState?.injuredPlayer ? (
            <InjuredPlayerView
              player={seasonState.injuredPlayer}
              studentTeam={seasonState.studentTeam}
            />
          ) : (
            <>
              {gamePhase.name === GamePhases.READY && (
                <ReadyView
                  studentTeam={seasonState.studentTeam}
                  currentOpponent={currentOpponent}
                  upcomingOpponents={upcomingOpponents}
                />
              )}
              {(gamePhase.name === GamePhases.UP_NEXT ||
                gamePhase.name === GamePhases.WARMING_UP ||
                gamePhase.name === GamePhases.GAME_OVER) && (
                <ScoreView
                  studentTeam={seasonState.studentTeam}
                  currentOpponent={currentOpponent}
                  gameResult={seasonState.gameResult}
                />
              )}
              {gamePhase.name === GamePhases.GAME_HIGHLIGHT && (
                <GameHighlightView
                  currentOpponent={currentOpponent}
                  studentTeam={seasonState.studentTeam}
                  onEnded={() => dispatch({ type: 'NEXT_GAME_PHASE' })}
                />
              )}
              {gamePhase.name === GamePhases.GAME_ON && (
                <GameOnView currentOpponent={currentOpponent} />
              )}
            </>
          )}
        </div>
      </div>
      <div
        className={classNames(
          'bg-primary rounded-lg text-white flex items-center justify-center  font-light h-[55px] w-[550px]',
          {
            'text-4xl': gamePhase?.messages[phaseMessageIndex].length <= 30,
            'text-[1.75rem]':
              gamePhase?.messages[phaseMessageIndex].length > 30,
          }
        )}
      >
        {gamePhase?.messages[phaseMessageIndex]}
      </div>
    </div>
  );
};
