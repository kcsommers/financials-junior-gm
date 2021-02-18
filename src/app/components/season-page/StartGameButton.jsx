import { ReactSVG } from 'react-svg';
import play from '@images/icons/play.svg';
import hockeySticksButton from '@images/icons/hockey-sticks-button.svg';
import { GamePhases } from '@data/season/season';
import { useSelector } from 'react-redux';
import { TeamAssignments, getAvailableSlots } from '@data/players/players';
import { motion } from 'framer-motion';

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
      {currentPhase.phase === GamePhases.READY && (
        <motion.div>
          <ReactSVG src={play} />
        </motion.div>
      )}
      {currentPhase.phase !== GamePhases.READY && (
        <motion.div>
          <ReactSVG src={hockeySticksButton} />
        </motion.div>
      )}
    </div>
  );
};
