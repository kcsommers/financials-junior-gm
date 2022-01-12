import binoculars from '@images/icons/binoculars.svg';
import confirmBtn from '@images/icons/confirm-big.svg';
import { OverlayBoard } from '@components';

export const ScoutingCompleteOverlay = () => {
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
        }}
      >
        <h2 className='color-primary' style={{ marginBottom: '2rem' }}>
          Nice job Scouting!
        </h2>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={binoculars}
            alt='Binoculars'
            style={{ marginRight: '2rem', display: 'inline-block' }}
          />
          <img
            src={confirmBtn}
            alt='Checkmark'
            style={{ marginLeft: '2rem', display: 'inline-block' }}
          />
        </div>
        <h2 className='color-primary' style={{ marginTop: '2rem' }}>
          The players you scouted can now be signed!
        </h2>
      </div>
    </OverlayBoard>
  );
};
