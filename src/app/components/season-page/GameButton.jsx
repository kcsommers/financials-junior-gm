import { Objectives } from '@data/objectives/objectives';
import { GameButtonSvg } from './GameButtonSvg';
import { useHistory } from 'react-router-dom';
import { GamePhases } from '@data/season/season';
import { motion } from 'framer-motion';
import { startingLineupFull } from '@data/players/players-utils';

export const GameButton = ({
  onClick,
  gameBlockState,
  team,
  currentScenario,
  animationState,
  student,
}) => {
  const history = useHistory(';');
  const { currentPhase } = gameBlockState;

  const seasonDisabled = !!(
    !student.objectives ||
    !student.objectives[Objectives.LEARN_BUDGET] ||
    !startingLineupFull(team)
  );

  const btnDisabled =
    (seasonDisabled &&
      (!currentScenario || !currentScenario.gameButtonAction)) ||
    (currentPhase.phase !== GamePhases.READY &&
      (!currentScenario || !currentScenario.gameButtonAction));

  const gameButtonClicked = () => {
    if (seasonDisabled && !currentScenario) {
      return;
    }

    if (currentScenario && currentScenario.gameButtonAction) {
      currentScenario.gameButtonAction(team, history);
      return;
    }

    onClick();
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
          animationState={animationState}
          phase={currentPhase.phase}
          currentScenario={currentScenario}
        />
      </motion.span>
    </div>
  );
};
