import { OverlayBoard, Button } from '@components';
import { useHistory } from 'react-router-dom';
import { toggleOverlay, useAppDispatch } from '@redux';

export const InsufficientFundsOverlay = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const goToBudget = () => {
    dispatch(
      toggleOverlay({
        isOpen: false,
        template: null,
      })
    );
    history.push('/budget');
  };

  const backToTeam = () => {
    dispatch(
      toggleOverlay({
        isOpen: false,
        template: null,
      })
    );
  };

  return (
    <OverlayBoard>
      <div
        style={{
          width: '100%',
          height: '100%',
          padding: '6rem 0 3rem 0',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <h3
            className="color-primary"
            style={{ marginBottom: '2rem', fontSize: '2.15rem' }}
          >
            You don't have enough money in your budget for this player!
          </h3>
          <p className="color-primary" style={{ fontSize: '1.75rem' }}>
            You'll have to find a way to increase your budget.
          </p>
        </div>
        <div
          style={{
            marginTop: '3rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            width: '100%',
          }}
        >
          <Button text="Back to Team" onClick={backToTeam} />
          <Button text="Go to Budget" onClick={goToBudget} />
        </div>
      </div>
    </OverlayBoard>
  );
};
