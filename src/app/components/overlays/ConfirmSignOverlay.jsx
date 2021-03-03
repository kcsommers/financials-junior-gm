import { PlayerCard, ConfirmOverlay, TeamBudgetState } from '@components';
import '@css/components/team-page/SignPlayerOverlay.css';

export const ConfirmSignOverlay = ({ cancel, confirm, player, isDisabled }) => {
  return (
    <ConfirmOverlay
      message='Are you sure you want to sign this player?'
      cancel={cancel}
      confirm={confirm}
      isDisabled={isDisabled}
    >
      <div style={{ display: 'flex', padding: '2rem 3rem 0 3rem' }}>
        <div style={{ flex: 1 }}>
          <TeamBudgetState changes={[player.playerCost, player.overallRank]} />
        </div>
        <div style={{ flex: 1 }}>
          <PlayerCard size='medium' player={player} />
        </div>
      </div>
    </ConfirmOverlay>
  );
};
