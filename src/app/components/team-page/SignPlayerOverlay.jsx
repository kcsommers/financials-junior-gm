import { useState } from 'react';
import { PlayerCard, OverlayBoard, LevelStick } from '@components';
import { useSelector, useDispatch } from 'react-redux';
import {
  toggleOverlay,
  removeSignablePlayer,
  playerSigned,
} from '@redux/actions';
import { ConfirmSignOverlay } from './ConfirmSignOverlay';
import '@css/components/team-page/SignPlayerOverlay.css';

const getAvailableSlots = (num, props, student) => {
  return num - props.filter((p) => student[p]).length;
};

export const SignPlayerOverlay = ({ student, position }) => {
  const dispatch = useDispatch();

  const signablePlayers = useSelector((state) => state.players.signablePlayers);
  const [currentView, setCurrentView] = useState({
    players: signablePlayers.forward,
    title: 'Forwards you can sign',
    position: 'forward',
  });

  const availableSlots = {
    forwards: getAvailableSlots(3, ['fOne', 'fTwo', 'fThree'], student),
    defender: getAvailableSlots(2, ['dOne', 'dTwo'], student),
    goalie: getAvailableSlots(1, ['gOne'], student),
    bench: getAvailableSlots(
      3,
      ['benchOne', 'benchTwo', 'benchThree'],
      student
    ),
  };

  const signCancelled = () => {
    dispatch(
      toggleOverlay({
        isOpen: true,
        template: <SignPlayerOverlay student={student} position={position} />,
      })
    );
  };

  const signConfirmed = (player) => {
    dispatch(playerSigned(player, position));
    dispatch(removeSignablePlayer(player));
    dispatch(
      toggleOverlay({
        isOpen: false,
        template: null,
      })
    );
  };

  const confirmSign = (player) => {
    console.log('CONFIGM SIGN');
    dispatch(
      toggleOverlay({
        isOpen: true,
        template: (
          <ConfirmSignOverlay
            player={player}
            position={position}
            confirm={signConfirmed}
            cancel={signCancelled}
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
                <span className='color-accent'>{availableSlots.defender}</span>
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
                currentView.position === 'defender' ? ' active' : ''
              }`}
              onClick={setCurrentView.bind(this, {
                players: signablePlayers.defender,
                title: 'Defenders you can sign',
                position: 'defender',
              })}
            >
              <div className='to-sign-tab-btn-inner'>
                <span className='outline-black'>Defender</span>
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
            <div
              className='to-sign-players-wrap'
              style={
                currentView.players.length > 1
                  ? {
                      justifyContent: 'space-around',
                    }
                  : {}
              }
            >
              {currentView.players.map((p, i) => (
                <div
                  key={i}
                  style={{
                    transform: 'scale(1.15)',
                    marginRight:
                      i !== currentView.players.length - 1 ? '2rem' : '0rem',
                  }}
                >
                  <PlayerCard player={p} onClick={confirmSign.bind(this, p)} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </OverlayBoard>
  );
};
