import { useDispatch, batch, useSelector } from 'react-redux';
import {
  toggleOverlay,
  setStudent,
  releasePlayer,
  signPlayer,
  gameBlockEnded,
  removeObjective,
} from '@redux/actions';
import { updateStudentById } from '../../api-helper';
import {
  PlayerCard,
  OverlayBoard,
  ConfirmReleaseOverlay,
  TradePlayerOverlay,
  PlayerChangeSuccessOverlay,
  Button,
  ConfirmOverlay,
} from '@components';
import { PlayerAssignments, PlayerPositions } from '@data/players/players';
import {
  getPlayerPositon,
  getAssignmentsByPosition,
  handleSignPlayer,
  getOpenAssignment,
} from '@data/players/players-utils';
import { cloneDeep } from 'lodash';

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
    const prevAssignment = player.playerAssignment;
    const prevPosition = getPlayerPositon(prevAssignment);
    player.playerAssignment =
      prevPosition === PlayerPositions.BENCH
        ? PlayerAssignments.OFFERED_SCOUT
        : PlayerAssignments.MARKET;

    const playersCopy = cloneDeep(student.players);

    playersCopy.splice(
      playersCopy.findIndex((p) => p._id === player._id),
      1,
      player
    );

    updateStudentById(student._id, {
      [prevAssignment]: null,
      players: playersCopy,
    })
      .then((res) => {
        dispatch(releasePlayer(player, prevAssignment, student));
        dispatch(setStudent(res.updatedStudent));
        dispatch(
          toggleOverlay({
            isOpen: true,
            template: (
              <PlayerChangeSuccessOverlay
                message={`${player.playerName} has been released!`}
                player={player}
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
