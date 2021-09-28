import { OverlayBoard, PlayerCard, TeamBudgetState } from '@components';
import arrowRight from '@images/icons/arrow-right.svg';
import arrowLeft from '@images/icons/arrow-left.svg';

export const PlayersTradedOverlay = ({ signedPlayer, releasedPlayer }) => {
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
          padding: '4rem 0',
        }}
      >
        <h2 className='color-primary' style={{ marginBottom: '2rem' }}>
          Players have been traded!
        </h2>
        <div className='confirm-trade-overlay'>
          <div style={{ display: 'flex', padding: '2rem 0rem 0 3rem' }}>
            <div style={{ flex: 1 }}>
              <TeamBudgetState />
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
                <PlayerCard player={releasedPlayer} size='medium' />
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
                <img src={arrowRight} alt='Arrow Right' />
                <img src={arrowLeft} alt='Arrow Left' />
              </div>
              <div style={{ flex: 1 }}>
                <h4 className='color-primary'>IN</h4>
                <PlayerCard player={signedPlayer} size='medium' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </OverlayBoard>
  );
};
