import {
  OverlayBoard,
  TeamBudgetState,
  PlayerCard,
  MarketPlayersBoard,
} from '@components';
import { getPlayerPositon } from '@utils';
import { useDispatch } from 'react-redux';
import { toggleOverlay, tradePlayer, updateStudent } from '@redux/actions';
import { ConfirmTradeOverlay } from './ConfirmTradeOverlay';
import { PlayerDetailsOverlay } from './PlayerDetailsOverlay';
import { PlayerAssignments } from '@data/players/players';
import { cloneDeep } from 'lodash';
import { updatePlayerOnServer } from '@data/players/players-service';
import { PlayersTradedOverlay } from './PlayersTradedOverlay';

export const TradePlayerOverlay = ({ releasingPlayer, student }) => {
  const dispatch = useDispatch();

  const tradeCancelled = () => {
    dispatch(
      toggleOverlay({
        isOpen: true,
        template: <PlayerDetailsOverlay />,
      })
    );
  };

  const tradeConfirmed = (signingPlayer) => {
    const prevAssignment = releasingPlayer.playerAssignment;
    releasingPlayer.player = PlayerAssignments.MARKET;
    signingPlayer.playerAssignment = prevAssignment;
    const clonedStudent = cloneDeep(student);
    clonedStudent[prevAssignment] = signingPlayer;

    // Promise.all([
    //   updatePlayerOnServer.bind(this, signingPlayer, {
    //     playerAssignment: PlayerAssignments.Market,
    //   }),
    //   updateStudentOnServer.bind(this, clonedStudent),
    // ])
    //   .then((res) => {
    //     dispatch(tradePlayer(releasingPlayer, signingPlayer));
    //     dispatch(updateStudent({ [prevAssignment]: null }));
    //     dispatch(
    //       toggleOverlay({
    //         isOpen: true,
    //         template: (
    //           <PlayersTradedOverlay
    //             releasedPlayer={releasingPlayer}
    //             signedPlayer={signingPlayer}
    //           />
    //         ),
    //         canClose: true,
    //       })
    //     );
    //   })
    //   .catch((err) => console.error(err));
  };

  const confirmTrade = (signingPlayer) => {
    dispatch(
      toggleOverlay({
        isOpen: true,
        template: (
          <ConfirmTradeOverlay
            releasingPlayer={releasingPlayer}
            signingPlayer={signingPlayer}
            cancel={tradeCancelled}
            confirm={tradeConfirmed.bind(this, signingPlayer)}
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
          />
        </div>
      </div>
    </OverlayBoard>
  );
};
