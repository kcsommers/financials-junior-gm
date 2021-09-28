import { Objectives } from '@data/objectives/objectives';
import { GameButtonSvg } from './GameButtonSvg';
import { useHistory } from 'react-router-dom';
import { GamePhases } from '@data/season/season';
import { motion } from 'framer-motion';
import { startingLineupFull } from '@data/players/players-utils';

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

  return (
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
          phase={phase.phase}
          currentScenario={currentScenario}
          cheerLevel={cheerLevel}
        />
      </motion.span>
    </div>
  );
};
