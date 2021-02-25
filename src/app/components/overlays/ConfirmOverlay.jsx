import { ReactSVG } from 'react-svg';
import { OverlayBoard } from '@components';
import cancelBig from '@images/icons/cancel-big.svg';
import confirmBig from '@images/icons/confirm-big.svg';
import '@css/components/ConfirmOverlay.css';

export const ConfirmOverlay = ({ children, message, cancel, confirm }) => {
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
          padding: '2rem 0',
        }}
      >
        {children && <div className='confirm-overlay-top'>{children}</div>}
        <div className='confirm-overlay-bottom'>
          <p className='confirm-message'>{message}</p>
          <div
            className='confirm-options'
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
          >
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
                onClick={confirm}
              />
            </div>
          </div>
        </div>
      </div>
    </OverlayBoard>
  );
};
