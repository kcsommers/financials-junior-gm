import { TeamBudgetState, ConfirmOverlay, PlayerCard } from '@components';
import { ReactSVG } from 'react-svg';
import arrowRight from '@images/icons/arrow-right.svg';
import arrowLeft from '@images/icons/arrow-left.svg';

export const ConfirmTradeOverlay = ({
  cancel,
  confirm,
  releasingPlayer,
  signingPlayer,
}) => {
  return (
    <ConfirmOverlay
      message='Are you sure you want to trade these players?'
      cancel={cancel}
      confirm={confirm}
    >
      <div className='confirm-trade-overlay'>
        <div style={{ display: 'flex', padding: '2rem 0rem 0 3rem' }}>
          <div style={{ flex: 1 }}>
            <TeamBudgetState />
            {/* <TeamBudgetState title='Changes to Rank and Budget' /> */}
          </div>
          <div
            style={{
              flex: 1,
              display: 'flex',
              transform: 'scale(0.8)',
              transformOrigin: '20% 0',
            }}
          >
            <div style={{ flex: 1 }}>
              <h4 className='color-accent'>OUT</h4>
              <PlayerCard player={releasingPlayer} size='medium' />
            </div>
            <div
              className='trade-arrows-wrap'
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <ReactSVG src={arrowRight} />
              <ReactSVG src={arrowLeft} />
            </div>
            <div style={{ flex: 1 }}>
              <h4 className='color-primary'>IN</h4>
              <PlayerCard player={signingPlayer} size='medium' />
            </div>
          </div>
        </div>
      </div>
    </ConfirmOverlay>
  );
};
