import { useState } from 'react';
import { PlayerCard, OverlayBoard, TeamBudgetState } from '@components';
import { useSelector, useDispatch } from 'react-redux';
import { toggleOverlay, signPlayer, updateStudent } from '@redux/actions';
import { ConfirmSignOverlay } from './ConfirmSignOverlay';
import { updatePlayerOnServer } from '@data/services/players-service';
import { updateStudentOnServer } from '@data/services/student-service';
import { getPlayerPositon } from '@utils';
import { PlayerPositions } from '@data/data';
import '@css/components/team-page/SignPlayerOverlay.css';

const getAvailableSlots = (props, team) => {
  return props.reduce((total, p) => {
    if (!team[p]) {
      total++;
    }
    return total;
  }, 0);
};

const getPlayerCardStyles = (arrLength, playerIndex) => {
  let scale = 1.15;
  let marginRight = '2rem';
  if (arrLength > 5 && arrLength < 7) {
    scale = 1;
    marginRight = '1rem';
  } else if (arrLength > 5) {
    scale = 0.85;
    marginRight = '0.5rem';
  }

  if (playerIndex === arrLength - 1) {
    marginRight = '0rem';
  }

  return {
    transform: `scale(${scale})`,
    marginRight,
  };
};

export const SignPlayerOverlay = ({ team, assignment, student }) => {
  const dispatch = useDispatch();

  const marketPlayers = useSelector((state) => state.players.marketPlayers);
  const [currentView, setCurrentView] = useState({
    players: marketPlayers.forward,
    title: 'Forwards you can sign',
    position: 'forward',
  });

  const availableSlots = {
    forwards: getAvailableSlots(['fOne', 'fTwo', 'fThree'], team),
    defender: getAvailableSlots(['dOne', 'dTwo'], team),
    goalie: getAvailableSlots(['gOne'], team),
    bench: getAvailableSlots(['benchOne', 'benchTwo', 'benchThree'], team),
  };

  const signCancelled = () => {
    dispatch(
      toggleOverlay({
        isOpen: true,
        template: (
          <SignPlayerOverlay
            team={team}
            assignment={assignment}
            student={student}
          />
        ),
      })
    );
  };

  const signConfirmed = (signedPlayer) => {
    signedPlayer.playerAssignment = assignment;

    Promise.all([
      updatePlayerOnServer.bind(this, student, { [assignment]: signedPlayer }),
      updateStudentOnServer.bind(this, signedPlayer),
    ])
      .then((res) => {
        dispatch(signPlayer(signedPlayer, assignment));
        dispatch(updateStudent({ [assignment]: signedPlayer }));
        dispatch(
          toggleOverlay({
            isOpen: false,
            template: null,
          })
        );
      })
      .catch((err) => console.error(err));
  };

  const confirmSign = (player) => {
    dispatch(
      toggleOverlay({
        isOpen: true,
        template: (
          <ConfirmSignOverlay
            player={player}
            position={assignment}
            confirm={signConfirmed.bind(this, player)}
            cancel={signCancelled}
          />
        ),
      })
    );
  };

  const activePosition = getPlayerPositon(assignment);
  const forwardsActive =
    activePosition === PlayerPositions.FORWARD ||
    activePosition === PlayerPositions.BENCH;
  const goaliesActive =
    activePosition === PlayerPositions.GOALIE ||
    activePosition === PlayerPositions.BENCH;
  const defendersActive =
    activePosition === PlayerPositions.DEFENDER ||
    activePosition === PlayerPositions.BENCH;

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
            <TeamBudgetState />
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
                forwardsActive ? '' : ' disabled'
              }`}
              onClick={() => {
                if (forwardsActive) {
                  setCurrentView({
                    players: marketPlayers.forward,
                    title: 'Forwards you can sign',
                    position: 'forward',
                  });
                }
              }}
            >
              <div className='to-sign-tab-btn-inner'>
                <span className='outline-black'>Forwards</span>
              </div>
            </div>
            <div
              className={`box-shadow to-sign-tab-btn${
                defendersActive ? '' : ' disabled'
              }`}
              onClick={() => {
                if (defendersActive) {
                  setCurrentView({
                    players: marketPlayers.defender,
                    title: 'Defenders you can sign',
                    position: 'defender',
                  });
                }
              }}
            >
              <div className='to-sign-tab-btn-inner'>
                <span className='outline-black'>Defender</span>
              </div>
            </div>
            <div
              className={`box-shadow to-sign-tab-btn${
                goaliesActive ? '' : ' disabled'
              }`}
              onClick={() => {
                if (goaliesActive) {
                  setCurrentView({
                    players: marketPlayers.goalie,
                    title: 'Goalies you can sign',
                    position: 'goalie',
                  });
                }
              }}
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
                  style={getPlayerCardStyles(currentView.players.length, i)}
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
