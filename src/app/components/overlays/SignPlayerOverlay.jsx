import {
  OverlayBoard,
  TeamBudgetState,
  MarketPlayersBoard,
  PlayerChangeSuccessOverlay,
} from '@components';
import { useDispatch, useSelector, batch } from 'react-redux';
import {
  toggleOverlay,
  signPlayer,
  setStudent,
  gameBlockEnded,
  removeObjective,
} from '@redux/actions';
import { ConfirmSignOverlay } from './ConfirmSignOverlay';
import { TeamAssignments } from '@data/players/players';
import {
  getAvailableSlots,
  getPlayerPositon,
  handleSignPlayer,
} from '@data/players/players-utils';
import '@css/components/team-page/SignPlayerOverlay.css';

export const SignPlayerOverlay = ({ assignment }) => {
  const dispatch = useDispatch();
  console.log(assignment)
  const student = useSelector((state) => state.studentState.student)
  const team = useSelector((state) => state.players.teamPlayers)
  const { currentScenario, completedGames } = useSelector(
    (state) => state.season
  );

  const seasonState = useSelector((state) => state.season);
  const { currentObjectives } = useSelector((state) => state.objectives);

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

  const signConfirmed = (signedPlayer, newRolloverBudget) => {
    const prevAssignment = signedPlayer.playerAssignment;
    handleSignPlayer(
      signedPlayer,
      assignment,
      student,
      seasonState,
      newRolloverBudget
    ).then(({ updatedStudent, updatedPlayer }) => {
      batch(() => {
        dispatch(signPlayer(updatedPlayer, prevAssignment, updatedStudent));
        dispatch(setStudent(updatedStudent));
        dispatch(
          toggleOverlay({
            isOpen: true,
            template: (
              <PlayerChangeSuccessOverlay
                player={updatedPlayer}
                message={`${updatedPlayer.playerName} has been signed!`}
              />
            ),
          })
        );
        if (seasonState.currentScenario) {
          dispatch(gameBlockEnded());
          dispatch(removeObjective(currentObjectives[0]));
        }
      });
    });
  };

  const confirmSign = (player, skipConfirm, newRolloverBudget) => {
    if (skipConfirm) {
      signConfirmed(player, newRolloverBudget);
      return;
    }

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
