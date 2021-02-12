import { ReactSVG } from 'react-svg';
import binoculars from '@images/icons/binoculars.svg';
import confirmBig from '@images/icons/confirm-big.svg';
import { OverlayBoard } from '../OverlayBoard';

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
          <ReactSVG
            src={binoculars}
            className='binos'
            style={{ marginRight: '2rem' }}
          />
          <ReactSVG
            src={confirmBig}
            className='con-big'
            style={{ marginLeft: '2rem' }}
          />
        </div>
        <h2 className='color-primary' style={{ marginTop: '2rem' }}>
          The players you scouted can now be signed!
        </h2>
      </div>
    </OverlayBoard>
  );
};
