import { useSelector } from 'react-redux';
import { TeamAssignments } from '@data/players/players';
import { getAvailableSlots } from '@data/players/players-utils';
import { GameButtonSvg } from './GameButtonSvg';
import { useHistory } from 'react-router-dom';

export const GameButton = ({
  onClick,
  gameBlockState,
  team,
  currentScenario,
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
      onClick={gameButtonClicked}
      style={{
        cursor: !seasonDisabled || currentScenario ? 'pointer' : 'initial',
        opacity: !seasonDisabled ? 1 : 0.75,
      }}
    >
      <GameButtonSvg
        phase={currentPhase.phase}
        currentScenario={currentScenario}
      />
    </div>
  );
};
