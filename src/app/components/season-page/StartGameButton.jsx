import { ReactSVG } from 'react-svg';
import play from '@images/icons/play.svg';
import hockeySticksButton from '@images/icons/hockey-sticks-button.svg';
import { GamePhases } from '@data/season/season';

export const StartGameButton = ({ onClick, gameBlockState }) => {
  const { currentPhase } = gameBlockState;

  return (
    <div
      onClick={() => {
        if (!gameBlockState.blockStarted) {
          onClick();
        }
      }}
      style={{ cursor: 'pointer' }}
    >
      <ReactSVG
        src={
          currentPhase.phase === GamePhases.READY ? play : hockeySticksButton
        }
      />
    </div>
  );
};
