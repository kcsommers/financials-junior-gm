import { useDispatch } from 'react-redux';
import { toggleOverlay, setStudent, releasePlayer } from '@redux/actions';
import { updateStudentById } from '../../api-helper';
import {
  PlayerCard,
  OverlayBoard,
  ConfirmReleaseOverlay,
  TradePlayerOverlay,
  PlayerChangeSuccessOverlay,
  Button,
} from '@components';
import { PlayerAssignments } from '@data/players/players';
import { cloneDeep } from 'lodash';

export const PlayerDetailsOverlay = ({
  player,
  student,
  includeActions = true,
}) => {
  const dispatch = useDispatch();

  const releaseCancelled = () => {
    dispatch(
      toggleOverlay({
        isOpen: true,
        template: null,
      })
    );
  };

  const releaseConfirmed = () => {
    const prevAssignment = player.playerAssignment;
    player.playerAssignment = PlayerAssignments.MARKET;
    //logic for player is released
    const playersCopy = cloneDeep(student.players);
    //
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
        dispatch(releasePlayer(player, prevAssignment));
        dispatch(setStudent(res.updatedStudent));
        dispatch(
          toggleOverlay({
            isOpen: true,
            template: (
              <PlayerChangeSuccessOverlay
                message='Player has been released!'
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
            cancel={releaseCancelled}
            player={player}
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
            <Button text='Trade' onClick={confirmTrade} />
            <Button text='Release' onClick={confirmRelease} />
          </div>
        )}
      </div>
    </OverlayBoard>
  );
};
