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
import { TeamAssignments, getAvailableSlots } from '@data/players/players';
import '@css/components/team-page/SignPlayerOverlay.css';

export const SignPlayerOverlay = ({ team, assignment, student }) => {
  const dispatch = useDispatch();

  const { currentScenario, completedGames } = useSelector(
    (state) => state.season
  );

  const availableSlots = {
    forwards: getAvailableSlots(TeamAssignments.offense, team),
    defender: getAvailableSlots(TeamAssignments.defense, team),
    goalie: getAvailableSlots(TeamAssignments.goalie, team),
    bench: getAvailableSlots(TeamAssignments.bench, team),
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
              [
                ...TeamAssignments.offense,
                ...TeamAssignments.defense,
                ...TeamAssignments.goalie,
              ],
              clonedTeam
            ) === 0
          ) {
            const studentSeasons = cloneDeep(student.seasons);
            if (studentSeasons[(student.level || 1) - 1]) {
              studentSeasons[(student.level || 1) - 1].push(completedGames);
            } else {
              studentSeasons[(student.level || 1) - 1] = [completedGames];
            }
            // dispatch(gameBlockEnded());

            updateStudentById(student._id, {
              seasons: studentSeasons,
            })
              .then((res) => {
                dispatch(gameBlockEnded());
              })
              .catch((err) => console.error(err));
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
