import { useState } from 'react';
import AvailableForwards from './../sign-page/AvailableForwards';
import { PlayerCard, OverlayBoard, LevelStick } from '@components';
import { useSelector } from 'react-redux';
import '@css/components/team-page/SignPlayerOverlay.css';

export const SignPlayerOverlay = ({ student, position }) => {
  const signablePlayers = useSelector((state) => state.players.signablePlayers);
  const [currentView, setCurrentView] = useState({
    players: signablePlayers.forward,
    title: 'Forwards you can sign',
    position: 'forward',
  });

  const availableSlots = {
    forwards: 3 - signablePlayers.forward.length,
    defense: 2 - signablePlayers.defense.length,
    goalie: 1 - signablePlayers.goalie.length,
    bench:
      3 -
      ['benchOne', 'benchTwo', 'benchThree'].filter((p) => student[p]).length,
  };

  console.log('PLAEYRS:::: ', currentView.players);

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
            <h3
              className='color-primary'
              style={{
                fontSize: '1.5rem',
              }}
            >
              Spaces On Your Team
            </h3>
            <div className='team-slots-board'>
              <div className='team-slots-board-row'>
                <span className='color-primary'>Forwards:</span>
                <span className='color-accent'>{availableSlots.forwards}</span>
              </div>
              <div className='team-slots-board-row'>
                <span className='color-primary'>Defenders:</span>
                <span className='color-accent'>{availableSlots.defense}</span>
              </div>
              <div className='team-slots-board-row'>
                <span className='color-primary'>Goalie:</span>
                <span className='color-accent'>{availableSlots.goalie}</span>
              </div>
              <div className='team-slots-board-row'>
                <span className='color-primary'>Bench:</span>
                <span className='color-accent'>{availableSlots.bench}</span>
              </div>
            </div>
          </div>
        </div>

        <div className='to-sign-container'>
          <div className='to-sign-btns-container'>
            <div
              className={`box-shadow to-sign-tab-btn${
                currentView.position === 'forward' ? ' active' : ''
              }`}
              onClick={setCurrentView.bind(this, {
                players: signablePlayers.forward,
                title: 'Forwards you can sign',
                position: 'forward',
              })}
            >
              <div className='to-sign-tab-btn-inner'>
                <span className='outline-black'>Forwards</span>
              </div>
            </div>
            <div
              className={`box-shadow to-sign-tab-btn${
                currentView.position === 'defense' ? ' active' : ''
              }`}
              onClick={setCurrentView.bind(this, {
                players: signablePlayers.defense,
                title: 'Defenders you can sign',
                position: 'defense',
              })}
            >
              <div className='to-sign-tab-btn-inner'>
                <span className='outline-black'>Defense</span>
              </div>
            </div>
            <div
              className={`box-shadow to-sign-tab-btn${
                currentView.position === 'goalie' ? ' active' : ''
              }`}
              onClick={setCurrentView.bind(this, {
                players: signablePlayers.goalie,
                title: 'Goalies you can sign',
                position: 'goalie',
              })}
            >
              <div className='to-sign-tab-btn-inner'>
                <span className='outline-black'>Goalies</span>
              </div>
            </div>
          </div>
          <div className='to-sign-inner'>
            <h3 className='color-primary to-sign-title'>{currentView.title}</h3>
            <div className='to-sign-players-wrap'>
              {currentView.players.map((p) => (
                <PlayerCard size='medium' player={p} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </OverlayBoard>
  );
};
