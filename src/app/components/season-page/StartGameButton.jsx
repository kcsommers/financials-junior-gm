import { GamePhases } from '@data/season/season';
import { useSelector } from 'react-redux';
import { TeamAssignments } from '@data/players/players';
import { getAvailableSlots } from '@data/players/players-utils';
import { StartGameButtonSvg } from './StartGameButtonSvg';

export const StartGameButton = ({ onClick, gameBlockState, team }) => {
  const currentScenario = useSelector((state) => state.season.currentScenario);
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

  return (
    <div
      onClick={() => {
        if (
          !seasonDisabled &&
          !currentScenario &&
          currentPhase.phase === GamePhases.READY
        ) {
          onClick();
        }
      }}
      style={{
        cursor: !seasonDisabled ? 'pointer' : 'initial',
        opacity: !seasonDisabled ? 1 : 0.75,
      }}
    >
      <StartGameButtonSvg phase={currentPhase.phase} />
    </div>
  );
};
