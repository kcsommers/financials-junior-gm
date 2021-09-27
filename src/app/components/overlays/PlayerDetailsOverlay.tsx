import { useDispatch, batch } from 'react-redux';
import {
  toggleOverlay,
  setStudent,
  releasePlayer,
  setObjectiveComplete,
} from '@redux';
import {
  PlayerCard,
  OverlayBoard,
  ConfirmReleaseOverlay,
  TradePlayerOverlay,
  PlayerChangeSuccessOverlay,
  Button,
} from '@components';
import {
  handleReleasePlayer,
  startingLineupFull,
} from '@data/players/players-utils';
import { Objectives } from '@data/objectives/objectives';

export const PlayerDetailsOverlay = ({
  player,
  student,
  seasonState,
  isDisabled = false,
  includeActions = true,
}: any) => {
  const dispatch = useDispatch();

  const onCancel = () => {
    dispatch(
      toggleOverlay({
        isOpen: false,
        template: null,
      })
    );
  };

  const releaseConfirmed = () => {
    handleReleasePlayer(player, student)
      .then(({ updatedStudent, updatedPlayer, prevAssignment }) => {
        batch(() => {
          dispatch(
            releasePlayer({ player: updatedPlayer, prevAssignment, student })
          );
          dispatch(setStudent(updatedStudent));
          dispatch(
            toggleOverlay({
              isOpen: true,
              template: (
                <PlayerChangeSuccessOverlay
                  message={`${updatedPlayer.playerName} has been released!`}
                  player={updatedPlayer}
                />
              ),
              canClose: true,
            })
          );
          const objectiveComplete = startingLineupFull(updatedStudent);
          dispatch(
            setObjectiveComplete({
              objectiveType: Objectives.FILL_TEAM,
              isComplete: objectiveComplete,
            })
          );
        });
      })
      .catch((err) => console.error(err));
  };

  const confirmTrade = () => {
    dispatch(
      toggleOverlay({
        isOpen: true,
        template: (
          <TradePlayerOverlay
            releasingPlayer={player}
            student={student}
            isDisabled={isDisabled}
          />
        ),
      })
    );
  };

  const confirmRelease = () => {
    dispatch(
      toggleOverlay({
        isOpen: true,
        template: (
          <ConfirmReleaseOverlay
            confirm={releaseConfirmed}
            cancel={onCancel}
            player={player}
            isDisabled={isDisabled}
          />
        ),
      })
    );
  };

  return (
    <OverlayBoard>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          textAlign: 'center',
          pointerEvents: isDisabled ? 'none' : 'auto',
        }}
      >
        <div className="player-details-player-wrap">
          <PlayerCard player={player} size="large" />
        </div>
        {includeActions && (
          <div
            style={{
              marginTop: '3rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              width: '100%',
            }}
          >
            {seasonState && seasonState.seasonActive ? (
              <Button text="Trade" onClick={confirmTrade} />
            ) : null}

            {seasonState && !seasonState.seasonActive && (
              <Button text="Release" onClick={confirmRelease} />
            )}
          </div>
        )}
      </div>
    </OverlayBoard>
  );
};
