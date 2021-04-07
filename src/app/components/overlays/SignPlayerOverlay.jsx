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
  removeObjective,
  setObjectiveComplete,
  removeScenario,
} from '@redux/actions';
import { ConfirmSignOverlay } from './ConfirmSignOverlay';
import { TeamAssignments } from '@data/players/players';
import {
  getAvailableSlots,
  getPlayerPositon,
  handleSignPlayer,
} from '@data/players/players-utils';
import { Objectives } from '@data/objectives/objectives';
import '@css/components/team-page/SignPlayerOverlay.css';

export const SignPlayerOverlay = ({ assignment, isDisabled }) => {
  const dispatch = useDispatch();
  const student = useSelector((state) => state.studentState.student);
  const team = useSelector((state) => state.players.teamPlayers);

  const availableSlots = {
    forwards: getAvailableSlots(TeamAssignments.offense, team),
    defense: getAvailableSlots(TeamAssignments.defense, team),
    goalie: getAvailableSlots(TeamAssignments.goalie, team),
  };

  const signCancelled = () => {
    dispatch(
      toggleOverlay({
        isOpen: true,
        template: <SignPlayerOverlay team={team} assignment={assignment} />,
      })
    );
  };

  const signConfirmed = (signedPlayer) => {
    const prevAssignment = signedPlayer.playerAssignment;

    handleSignPlayer(signedPlayer, assignment, student).then(
      ({ updatedStudent, updatedPlayer, startingLineupFull }) => {
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

          // if the starting lineup is full the fill team
          // and (if applicable) season scenario objectives are complete
          if (startingLineupFull) {
            dispatch(setObjectiveComplete(Objectives.FILL_TEAM, true));
            dispatch(removeObjective(Objectives.SEASON_SCENARIO));
            dispatch(removeScenario());
          }
        });
      }
    );
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
            isDisabled={isDisabled}
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
          pointerEvents: isDisabled ? 'none' : 'auto',
        }}
      >
        <div className='sign-player-overlay-top' style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <TeamBudgetState />
          </div>
          {
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
                  <span className='color-accent'>
                    {availableSlots.forwards}
                  </span>
                </div>
                <div className='team-slots-board-row'>
                  <span className='color-primary'>Defense:</span>
                  <span className='color-accent'>{availableSlots.defense}</span>
                </div>
                <div className='team-slots-board-row'>
                  <span className='color-primary'>Goalie:</span>
                  <span className='color-accent'>{availableSlots.goalie}</span>
                </div>
              </div>
            </div>
          }
        </div>

        <div className='market-players-board-container'>
          <MarketPlayersBoard
            initialPosition={getPlayerPositon(assignment)}
            onPlayerCardClick={confirmSign}
            student={student}
            signAssignment={assignment}
          />
        </div>
      </div>
    </OverlayBoard>
  );
};
