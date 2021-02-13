import { ReactSVG } from 'react-svg';
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
        <div
          className='player-released-overlay-body'
          style={{
            display: 'flex',
            flex: 1,
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', flex: 1 }}>
            <div style={{ flex: 1 }}>
              <TeamBudgetState isLarge={true} />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ flex: 1 }}>
                <h4 className='color-accent'>OUT</h4>
                <PlayerCard player={releasedPlayer} />
              </div>
              <div style={{ flex: 1 }}>
                <h4 className='color-primary'>IN</h4>
                <PlayerCard player={signedPlayer} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </OverlayBoard>
  );
};
