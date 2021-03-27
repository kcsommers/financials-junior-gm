import { useDispatch, batch } from 'react-redux';
import {
  toggleOverlay,
  setStudent,
  releasePlayer,
  signPlayer,
  removeObjective,
  setObjectiveComplete,
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
import {
  getAssignmentsByPosition,
  handleSignPlayer,
  getOpenAssignment,
  handleReleasePlayer,
  startingLineupFull,
} from '@data/players/players-utils';
import { Objectives } from '@data/objectives/objectives';

export const PlayerDetailsOverlay = ({
  player,
  student,
  seasonState,
  isDisabled,
  includeActions = true,
}) => {
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
          const objectiveComplete = startingLineupFull(updatedStudent);
          dispatch(
            setObjectiveComplete(Objectives.FILL_TEAM, objectiveComplete)
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

          const objectiveComplete = startingLineupFull(updatedStudent);
          if (seasonState && seasonState.currentScenario && objectiveComplete) {
            // @TODO
            dispatch(removeObjective(Objectives.SEASON_SCENARIO));
          } else {
            dispatch(
              setObjectiveComplete(Objectives.FILL_TEAM, objectiveComplete)
            );
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
            message={`Are you sure you want to add ${player.playerName} to the starting lineup?`}
            cancel={onCancel}
            confirm={moveToStartingLineupConfirmed}
            isDisabled={isDisabled}
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
          pointerEvents: isDisabled ? 'none' : 'auto',
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
            {seasonState && seasonState.seasonActive ? (
              <Button text='Trade' onClick={confirmTrade} />
            ) : null}

            {seasonState && !seasonState.seasonActive && (
              <Button text='Release' onClick={confirmRelease} />
            )}
          </div>
        )}
      </div>
    </OverlayBoard>
  );
};
