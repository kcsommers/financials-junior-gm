import { useDispatch } from 'react-redux';
import { toggleOverlay, updateStudent, releasePlayer } from '@redux/actions';
import {
  PlayerCard,
  OverlayBoard,
  ConfirmReleaseOverlay,
  TradePlayerOverlay,
  PlayerChangeSuccessOverlay,
} from '@components';
import '@css/components/team-page/PlayerDetailsOverlay.css';
import { PlayerAssignments } from '@data/data';
import { cloneDeep } from 'lodash';
import { updatePlayerOnServer } from '@data/services/players-service';
import { updateStudentOnServer } from '@data/services/student-service';

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
    const clonedStudent = cloneDeep(student);
    clonedStudent[player.playerPosition] = null;

    Promise.all([
      updatePlayerOnServer.bind(this, player, {
        playerAssignment: PlayerAssignments.Market,
      }),
      updateStudentOnServer.bind(this, clonedStudent),
    ])
      .then((res) => {
        dispatch(releasePlayer(player, prevAssignment));
        dispatch(updateStudent({ [prevAssignment]: null }));
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
          <PlayerCard player={player} isLarge={true} />
        </div>
        {includeActions && (
          <div className='player-overlay-buttons-wrap'>
            <div
              className={`box-shadow player-overlay-btn`}
              onClick={confirmTrade}
            >
              <div className='player-overlay-btn-inner'>
                <span className='outline-black'>Trade</span>
              </div>
            </div>
            <div
              className={`box-shadow player-overlay-btn`}
              onClick={confirmRelease}
            >
              <div className='player-overlay-btn-inner'>
                <span className='outline-black'>Release</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </OverlayBoard>
  );
};
