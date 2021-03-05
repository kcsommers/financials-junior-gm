import { TeamAssignments } from '@data/players/players';
import { getAvailableSlots } from '@data/players/players-utils';
import { GameButtonSvg } from './GameButtonSvg';
import { useHistory } from 'react-router-dom';
import { GamePhases } from '@data/season/season';
import { motion } from 'framer-motion';

export const GameButton = ({
  onClick,
  gameBlockState,
  team,
  currentScenario,
  animationState,
}) => {
  const history = useHistory(';');
  const { currentPhase } = gameBlockState;

  const seasonDisabled =
    getAvailableSlots(
      [
        ...TeamAssignments.offense,
        ...TeamAssignments.defense,
        ...TeamAssignments.goalie,
      ],
      team
    ) > 0;

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
