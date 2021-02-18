import {
  OverlayBoard,
  TeamBudgetState,
  MarketPlayersBoard,
  PlayerChangeSuccessOverlay,
} from '@components';
import { useDispatch, useSelector } from 'react-redux';
import {
  toggleOverlay,
  signPlayer,
  setStudent,
  gameBlockEnded,
} from '@redux/actions';
import { ConfirmSignOverlay } from './ConfirmSignOverlay';
import { getPlayerPositon } from '@utils';
import { updateStudentById } from '../../api-helper';
import { cloneDeep } from 'lodash';
import '@css/components/team-page/SignPlayerOverlay.css';

const getAvailableSlots = (props, team) => {
  return props.reduce((total, p) => {
    if (!team[p]) {
      total++;
    }
    return total;
  }, 0);
};

const offense = ['fOne', 'fTwo', 'fThree'];
const defense = ['dOne', 'dTwo'];
const goalie = ['gOne'];

export const SignPlayerOverlay = ({ team, assignment, student }) => {
  const dispatch = useDispatch();

  const currentScenario = useSelector((state) => state.season.currentScenario);

  const availableSlots = {
    forwards: getAvailableSlots(offense, team),
    defender: getAvailableSlots(defense, team),
    goalie: getAvailableSlots(goalie, team),
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

    const playersCopy = cloneDeep(student.players);
    playersCopy.splice(
      playersCopy.findIndex((p) => p._id === signedPlayer._id),
      1,
      signedPlayer
    );

    // const p1 = new Promise((res) => res(true));
    // p1.then((res) => {
    //   const updatedStudent = cloneDeep(student);
    //   updatedStudent[assignment] = null;
    //   updatedStudent.players = playersCopy;
    //   dispatch(signPlayer(signedPlayer, assignment));
    //   dispatch(setStudent(res.updatedStudent));
    //   dispatch(
    //     toggleOverlay({
    //       isOpen: true,
    //       template: (
    //         <PlayerChangeSuccessOverlay
    //           player={signedPlayer}
    //           message=' Player has been signed!'
    //         />
    //       ),
    //     })
    //   );
    //   // if theres an active season scenario, check that the team is full
    //   // and end the current game block if so
    //   if (currentScenario) {
    //     const clonedTeam = cloneDeep(team);
    //     clonedTeam[assignment] = signedPlayer;
    //     if (
    //       getAvailableSlots([...offense, ...defense, ...goalie], clonedTeam) ===
    //       0
    //     ) {
    //       dispatch(gameBlockEnded());
    //     }
    //   }
    // }).catch((err) => console.error(err));

    updateStudentById(student._id, {
      [assignment]: signedPlayer._id,
      players: playersCopy,
    })
      .then((res) => {
        dispatch(signPlayer(signedPlayer, assignment));
        dispatch(setStudent(res.updatedStudent));
        dispatch(
          toggleOverlay({
            isOpen: true,
            template: (
              <PlayerChangeSuccessOverlay
                player={signedPlayer}
                message=' Player has been signed!'
              />
            ),
          })
        );
        // if theres an active season scenario, check that the team is full
        // and end the current game block if so
        if (currentScenario) {
          const clonedTeam = cloneDeep(team);
          clonedTeam[assignment] = signedPlayer;
          if (
            getAvailableSlots(
              [...offense, ...defense, ...goalie],
              clonedTeam
            ) === 0
          ) {
            dispatch(gameBlockEnded());
          }
        }
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

        <div className='market-players-board-container'>
          <MarketPlayersBoard
            initialPosition={getPlayerPositon(assignment)}
            onPlayerCardClick={confirmSign}
            student={student}
          />
        </div>
      </div>
    </OverlayBoard>
  );
};
