import { OverlayBoard } from '@components';
import cancelBig from '@images/icons/cancel-big.svg';
import confirmBig from '@images/icons/confirm-big.svg';
import '@css/components/ConfirmOverlay.css';

export const ConfirmOverlay = ({
  children,
  message,
  subMessage,
  cancel,
  confirm,
  isDisabled,
  position,
  top
}) => {
  return (
    <OverlayBoard  position={position} top={top}>
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
          pointerEvents: isDisabled ? 'none' : 'auto',
        }}
      >
        {children && <div className='confirm-overlay-top'>{children}</div>}
        <div className='confirm-overlay-bottom'>
          <p className='confirm-message'>{message}</p>
          {subMessage && <p className='confirm-message' style={{fontSize: '1rem'}}>{subMessage}</p>}
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
              <img
                src={cancelBig}
                onClick={cancel}
                style={{
                  display: 'inline-block',
                  marginTop: '0.25rem',
                  cursor: 'pointer',
                }}
                alt='Cancel'
              />
            </div>
            <div>
              <p>Confirm</p>
              <img
                src={confirmBig}
                onClick={confirm}
                style={{
                  display: 'inline-block',
                  marginTop: '0.25rem',
                  cursor: 'pointer',
                }}
                alt='Confirm'
              />
            </div>
          </div>
        </div>
      </div>
    </OverlayBoard>
  );
};
