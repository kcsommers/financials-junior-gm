import { OverlayBoard } from '@components';
import { useHistory } from 'react-router-dom';
import '@css/components/overlay-btns.css';

export const InsufficientFundsOverlay = () => {
  const history = useHistory();

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
            You can either adjust your savings or release a player to increase
            your budget.
          </p>
        </div>
        <div className='overlay-buttons-wrap'>
          <div
            className={`box-shadow overlay-btn`}
            onClick={() => history.push('/team')}
          >
            <div className='overlay-btn-inner'>
              <span className='outline-black'>Back to Team</span>
            </div>
          </div>
          <div
            className={`box-shadow overlay-btn`}
            onClick={() => history.push('/budget')}
          >
            <div className='overlay-btn-inner'>
              <span className='outline-black'>Go to Budget</span>
            </div>
          </div>
        </div>
      </div>
    </OverlayBoard>
  );
};
