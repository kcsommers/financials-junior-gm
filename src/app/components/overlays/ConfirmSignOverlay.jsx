import { PlayerCard, ConfirmOverlay, TeamBudgetState } from '@components';
import '@css/components/team-page/SignPlayerOverlay.css';

export const ConfirmSignOverlay = ({ cancel, confirm }) => {
  return (
    <ConfirmOverlay
      message='Are you sure you want to sign the following player?'
      cancel={cancel}
      confirm={confirm}
    >
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <TeamBudgetState title='Changes to rank and budget' />
        </div>
        <div style={{ flex: 1 }}>
          <PlayerCard isLarge={true} />
        </div>
      </div>
    </ConfirmOverlay>
  );
};
