import { OverlayBoard, Button } from '@components';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toggleOverlay } from '@redux/actions';

export const InsufficientFundsOverlay = ({
  student,
  signingPlayer,
  releasingPlayer,
  budget,
  onUseRollover,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();

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

  const useRolloverBudget = () => {
    let totalBudget = budget - signingPlayer.playerCost;
    if (releasingPlayer) {
      totalBudget += releasingPlayer.playerCost;
    }

    const newRolloverBudget = Math.max(
      student.rollOverBudget - Math.abs(totalBudget),
      0
    );
    onUseRollover(signingPlayer, true, newRolloverBudget);
  };

  const showRolloverBudget = () => {
    let totalBudget = budget - signingPlayer.playerCost;
    if (releasingPlayer) {
      totalBudget += releasingPlayer.playerCost;
    }

    return !!(
      +student.rollOverBudget && +student.rollOverBudget + totalBudget >= 0
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
            className='color-primary'
            style={{ marginBottom: '2rem', fontSize: '2.15rem' }}
          >
            You don't have enough money in your budget for this player!
          </h3>
          <p className='color-primary' style={{ fontSize: '1.75rem' }}>
            You'll have to find a way to increase your budget.
          </p>
        </div>
        {showRolloverBudget() && (
          <div
            style={{
              marginTop: '0rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              width: '100%',
            }}
          >
            <Button
              text='Use Rollover Budget'
              onClick={useRolloverBudget}
              background='#002f6c'
            />
          </div>
        )}
        <div
          style={{
            marginTop: '3rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            width: '100%',
          }}
        >
          <Button text='Back to Team' onClick={backToTeam} />
          <Button text='Go to Budget' onClick={goToBudget} />
        </div>
      </div>
    </OverlayBoard>
  );
};
