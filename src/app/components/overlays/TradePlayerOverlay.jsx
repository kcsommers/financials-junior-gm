import {
  OverlayBoard,
  TeamBudgetState,
  PlayerCard,
  MarketPlayersBoard,
} from '@components';
import { useDispatch } from 'react-redux';
import { toggleOverlay, tradePlayer, setStudent } from '@redux/actions';
import { ConfirmTradeOverlay } from './ConfirmTradeOverlay';
import { PlayerDetailsOverlay } from './PlayerDetailsOverlay';
import { PlayerAssignments, PlayerPositions } from '@data/players/players';
import {
  getPlayerPositon,
  handleTradePlayers,
} from '@data/players/players-utils';
import { cloneDeep } from 'lodash';
import { updateStudentById } from '../../api-helper';
import { PlayersTradedOverlay } from './PlayersTradedOverlay';

export const TradePlayerOverlay = ({ releasingPlayer, student }) => {
  const dispatch = useDispatch();

  const tradeCancelled = () => {
    dispatch(
      toggleOverlay({
        isOpen: true,
        template: (
          <PlayerDetailsOverlay player={releasingPlayer} student={student} />
        ),
      })
    );
  };

  const tradeConfirmed = (signingPlayer, newRolloverBudget) => {
    handleTradePlayers(
      signingPlayer,
      releasingPlayer,
      student,
      newRolloverBudget
    )
      .then(
        ({ updatedSignedPlayer, updatedReleasedPlayer, updatedStudent }) => {
          dispatch(
            tradePlayer(
              updatedReleasedPlayer,
              updatedSignedPlayer,
              updatedStudent
            )
          );
          dispatch(setStudent(updatedStudent));
          dispatch(
            toggleOverlay({
              isOpen: true,
              template: (
                <PlayersTradedOverlay
                  releasedPlayer={updatedReleasedPlayer}
                  signedPlayer={updatedSignedPlayer}
                />
              ),
              canClose: true,
            })
          );
        }
      )
      .catch((err) => console.error(err));
  };

  const confirmTrade = (signingPlayer, skipConfirm, newRolloverBudget) => {
    if (skipConfirm) {
      tradeConfirmed(signingPlayer, newRolloverBudget);
      return;
    }

    dispatch(
      toggleOverlay({
        isOpen: true,
        template: (
          <ConfirmTradeOverlay
            releasingPlayer={releasingPlayer}
            signingPlayer={signingPlayer}
            cancel={tradeCancelled}
            confirm={tradeConfirmed.bind(this, signingPlayer, undefined)}
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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          textAlign: 'center',
          padding: '3rem 0',
        }}
      >
        <div style={{ display: 'flex', width: '100%' }}>
          <div style={{ flex: 1 }}>
            <TeamBudgetState />
          </div>
          <div style={{ flex: 1 }}>
            <PlayerCard size='medium' player={releasingPlayer} />
          </div>
        </div>
        <div
          className='market-players-board-container'
          style={{
            width: '100%',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <MarketPlayersBoard
            initialPosition={getPlayerPositon(releasingPlayer.playerAssignment)}
            onPlayerCardClick={confirmTrade}
            student={student}
            releasingPlayer={releasingPlayer}
          />
        </div>
      </div>
    </OverlayBoard>
  );
};
