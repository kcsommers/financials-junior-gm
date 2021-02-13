import { ReactSVG } from 'react-svg';
import cancelBig from '@images/icons/cancel-big.svg';
import confirmBig from '@images/icons/confirm-big.svg';
import { LevelStick, PlayerCard, OverlayBoard } from '@components';
import '@css/components/team-page/SignPlayerOverlay.css';

export const ConfirmSignOverlay = ({ player, cancel, confirm }) => {
  return (
    <OverlayBoard>
      <div
        style={{
          width: '100%',
          height: '100%',
          padding: '3rem 0',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div className='signconfirm-sign-overlay-wrap'>
          <div className='sign-player-overlay-top' style={{ display: 'flex' }}>
            <div style={{ flex: 1 }}>
              <p className='color-primary'>Changes to rank and budget</p>
              <div className='level-sticks-card'>
                <div className='level-sticks-card-inner'>
                  <LevelStick type='teamRank' />
                  <LevelStick type='budget' />
                </div>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <PlayerCard isLarge={true} />
            </div>
          </div>

          <p className='sign-player-question'>
            Are you sure you want to sign the following player?
          </p>
          <div className='sign-player-options'>
            <div>
              <p>Cancel</p>
              <ReactSVG
                style={{ cursor: 'pointer' }}
                src={cancelBig}
                onClick={cancel}
              />
            </div>
            <div>
              <p>Confirm</p>
              <ReactSVG
                style={{ cursor: 'pointer' }}
                src={confirmBig}
                onClick={() => confirm(player)}
              />
            </div>
          </div>
        </div>
      </div>
    </OverlayBoard>
  );
};
