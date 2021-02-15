import { useDispatch } from 'react-redux';
import { toggleOverlay, setStudent, releasePlayer } from '@redux/actions';
import { updateStudentById } from '../../api-helper';
import {
  PlayerCard,
  OverlayBoard,
  ConfirmReleaseOverlay,
  TradePlayerOverlay,
  PlayerChangeSuccessOverlay,
} from '@components';
import { PlayerAssignments } from '@data/players/players';
import { cloneDeep } from 'lodash';
import '@css/components/overlay-btns.css';

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

    const playersCopy = cloneDeep(student.players);
    playersCopy.splice(
      playersCopy.findIndex((p) => p._id === player._id),
      1,
      player
    );

    console.log('PLAYERS COPY:::: ', playersCopy);

    updateStudentById(student._id, {
      [prevAssignment]: null,
      players: playersCopy,
    })
      .then((res) => {
        console.log('UPDATE RES:::: ', res);
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
          <div className='overlay-buttons-wrap' style={{ marginTop: '3rem' }}>
            <div className={`box-shadow overlay-btn`} onClick={confirmTrade}>
              <div className='overlay-btn-inner'>
                <span className='outline-black'>Trade</span>
              </div>
            </div>
            <div className={`box-shadow overlay-btn`} onClick={confirmRelease}>
              <div className='overlay-btn-inner'>
                <span className='outline-black'>Release</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </OverlayBoard>
  );
};
