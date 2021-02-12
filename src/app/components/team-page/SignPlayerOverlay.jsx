import { useState } from 'react';
import AvailableForwards from './../sign-page/AvailableForwards';
import { PlayerCard, OverlayBoard, LevelStick } from '@components';

export const SignPlayerOverlay = ({ availableSlots, position }) => {
  const [currentView, setCurrentView] = useState(<AvailableForwards />);

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
        <div className='sign-player-overlay-top' style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <div className='level-sticks-card'>
              <div className='level-sticks-card-inner'>
                <LevelStick type='teamRank' />
                <LevelStick type='budget' />
              </div>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div className='team-slots-board'>
              <div
                className='team-slots-board-row'
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span
                  className='color-primary'
                  style={{ fontSize: '1.5rem', fontWeight: 'bold' }}
                >
                  Forwards:
                </span>
                <span className='color-accent' style={{ fontSize: '1.5rem' }}>
                  {availableSlots.forwards}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className='to-sign-container'>{currentView}</div>
      </div>
    </OverlayBoard>
  );
};
