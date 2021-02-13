import {
  OverlayBoard,
  TeamBudgetState,
  PlayerCard,
  MarketPlayersBoard,
} from '@components';
import { getPlayerPositon } from '@utils';

export const TradePlayerOverlay = ({ player }) => {
  const confirmTrade = (otherPlayer) => {
    console.log('OTHER PLAYER:::: ', otherPlayer);
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
            <TeamBudgetState title='Changes to Rank and Budget' />
          </div>
          <div style={{ flex: 1 }}>
            <PlayerCard isLarge={true} player={player} />
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
            initialPosition={getPlayerPositon(player.playerAssignment)}
            onPlayerCardClick={confirmTrade}
          />
        </div>
      </div>
    </OverlayBoard>
  );
};
