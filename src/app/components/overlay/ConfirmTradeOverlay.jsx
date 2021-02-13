import { TeamBudgetState, ConfirmOverlay, PlayerCard } from '@components';

export const ConfirmTradeOverlay = ({ cancel, confirm, player }) => {
  return (
    <ConfirmOverlay
      message='Are you sure you want to release the following player?'
      cancel={cancel}
      confirm={confirm}
    >
      <div className='confirm-release-overlay'>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <TeamBudgetState title='Changes to Rank and Budget' />
          </div>
          <div style={{ flex: 1 }}>
            <PlayerCard isLarge={true} player={player} />
          </div>
        </div>
      </div>
    </ConfirmOverlay>
  );
};
