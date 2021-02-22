import { useDispatch, batch, useSelector } from 'react-redux';
import {
  toggleOverlay,
  setStudent,
  releasePlayer,
  signPlayer,
  gameBlockEnded,
  removeObjective,
} from '@redux/actions';
import {
  PlayerCard,
  OverlayBoard,
  ConfirmReleaseOverlay,
  TradePlayerOverlay,
  PlayerChangeSuccessOverlay,
  Button,
  ConfirmOverlay,
} from '@components';
import { PlayerPositions } from '@data/players/players';
import {
  getPlayerPositon,
  getAssignmentsByPosition,
  handleSignPlayer,
  getOpenAssignment,
  handleReleasePlayer,
} from '@data/players/players-utils';

export const PlayerDetailsOverlay = ({
  player,
  student,
  seasonState,
  includeActions = true,
}) => {
  const dispatch = useDispatch();
  const { currentObjectives } = useSelector((state) => state.objectives);

  const isBenchPlayer =
    getPlayerPositon(player.playerAssignment) === PlayerPositions.BENCH;

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
        dispatch(releasePlayer(updatedPlayer, prevAssignment, student));
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
      })
      .catch((err) => console.error(err));
  };

  const confirmTrade = () => {
    dispatch(
      toggleOverlay({
        isOpen: true,
        template: (
          <TradePlayerOverlay releasingPlayer={player} student={student} />
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
          />
        ),
      })
    );
  };

  const moveToStartingLineupConfirmed = () => {
    const newAssignment = getOpenAssignment(player.playerPosition, student);
    const prevAssignment = player.playerAssignment;

    handleSignPlayer(player, newAssignment, student, seasonState).then(
      ({ updatedStudent, updatedPlayer }) => {
        batch(() => {
          dispatch(signPlayer(updatedPlayer, prevAssignment, updatedStudent));
          dispatch(setStudent(updatedStudent));
          dispatch(
            toggleOverlay({
              isOpen: true,
              template: (
                <PlayerChangeSuccessOverlay
                  player={updatedPlayer}
                  message={`${updatedPlayer.playerName} is now a starter!`}
                />
              ),
            })
          );
          if (seasonState.currentScenario) {
            dispatch(gameBlockEnded());
            dispatch(removeObjective(currentObjectives[0]));
          }
        });
      }
    );
  };

  const confirmMoveToStartingLineup = () => {
    dispatch(
      toggleOverlay({
        isOpen: true,
        template: (
          <ConfirmOverlay
            message='Are you sure you want to add this player to the starting lineup?'
            cancel={onCancel}
            confirm={moveToStartingLineupConfirmed}
          >
            <div style={{ display: 'flex', padding: '2rem 3rem 0 3rem' }}>
              <div style={{ flex: 1 }}>
                <PlayerCard size='medium' player={player} />
              </div>
            </div>
          </ConfirmOverlay>
        ),
      })
    );
  };

  const positionOpen = (position) => {
    const positionAssignments = getAssignmentsByPosition(position);
    return positionAssignments.some((a) => !student[a]);
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
        }}
      >
        <div className='player-details-player-wrap'>
          <PlayerCard player={player} size='large' />
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
            {isBenchPlayer ? (
              <Button
                text='Add to Starting Lineup'
                onClick={confirmMoveToStartingLineup}
                isDisabled={!positionOpen(player.playerPosition)}
              />
            ) : (
              <Button text='Trade' onClick={confirmTrade} />
            )}

            <Button text='Release' onClick={confirmRelease} />
          </div>
        )}
      </div>
    </OverlayBoard>
  );
};
