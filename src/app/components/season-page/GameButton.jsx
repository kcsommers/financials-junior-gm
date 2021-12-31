import { Objectives } from '@data/objectives/objectives';
import { startingLineupFull } from '@data/players/players-utils';
import { GamePhases } from '@data/season/season';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import cheeringAudio from '../../../assets/audio/cheering.mp3';
import { useKeydown } from '../../hooks/use-keydown';
import { GameButtonSvg } from './GameButtonSvg';

export const GameButton = ({
  onStartGame,
  onCheer,
  gameState,
  team,
  animationState,
  student,
  cheerLevel,
  seasonState,
}) => {
  const history = useHistory();
  const { phase } = gameState;
  const cheerAudioRef = useRef(null);
  const currentScenario = seasonState.currentScenario;

  const seasonDisabled = !!(
    !student.objectives ||
    !student.objectives[Objectives.LEARN_BUDGET] ||
    !startingLineupFull(team) ||
    seasonState.currentOpponentIndex >= seasonState.allOpponents.length
  );

  const btnDisabled = !!(
    (seasonDisabled &&
      (!currentScenario || !currentScenario.gameButtonAction)) ||
    (phase.phase !== GamePhases.READY &&
      phase.phase !== GamePhases.GAME_ON &&
      (!currentScenario || !currentScenario.gameButtonAction))
  );

  const gameButtonClicked = () => {
    if (seasonDisabled && !currentScenario) {
      return;
    }

    if (currentScenario && currentScenario.gameButtonAction) {
      currentScenario.gameButtonAction(team, history);
      return;
    }

    if (phase.phase === GamePhases.GAME_ON) {
      onCheer();
    } else {
      onStartGame();
    }
  };

  useKeydown(
    'Space',
    () => {
      if (btnDisabled) {
        return;
      }
      gameButtonClicked();
    },
    [btnDisabled, gameButtonClicked]
  );

  useEffect(() => {
    if (phase.phase === GamePhases.GAME_ON) {
      cheerAudioRef.current.currentTime = 0;
      cheerAudioRef.current.play();
    } else {
      cheerAudioRef.current.pause();
    }
  }, [phase.phase]);

  return (
    <>
      <audio loop ref={(el) => (cheerAudioRef.current = el)}>
        <source src={cheeringAudio} type="audio/mpeg" />
      </audio>
      <div
        onClick={() => {
          if (!btnDisabled) {
            gameButtonClicked();
          }
        }}
        style={{
          cursor: btnDisabled ? 'initial' : 'pointer',
          opacity: !seasonDisabled ? 1 : 0.75,
        }}
      >
        <motion.span
          style={{ display: 'inline-block', transformOrigin: 'bottom' }}
          animate={animationState}
          transition={{ default: { duration: 1 } }}
        >
          <GameButtonSvg
            animationState={animationState}
            phase={phase.phase}
            currentScenario={currentScenario}
            cheerLevel={cheerLevel}
          />
        </motion.span>
      </div>
    </>
  );
};
