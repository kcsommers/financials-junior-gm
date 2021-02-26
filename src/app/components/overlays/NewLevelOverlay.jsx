import { OverlayBoard } from '@components';
import { addScaleCorrection } from 'framer-motion';
import { ReactSVG } from 'react-svg';

export const NewLevelOverlay = ({ team }) => {
  return (
    <OverlayBoard>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'flex-start',
          flexDirection: 'column',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            textAlign: 'center',
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#006d75',
            position: 'relative',
            transform: '',
            marginTop: '3.5rem',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: '0 3.5rem',
            lineHeight: '3.5rem',
          }}
        >
          Congratulations! You've been promoted!
        </p>
        <p
          style={{
            textAlign: 'center',
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#006d75',
            position: 'relative',
            transform: '',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '1.5rem',
            padding: '0 3.5rem',
            lineHeight: '3.5rem',
          }}
        >
          You are now the General Manager of the
        </p>
        <p
          style={{
            textAlign: 'center',
            fontSize: '2.75rem',
            fontWeight: '900',
            color: '#006d75',
            textShadow: '1px 1px #000000',
            position: 'relative',
            marginTop: '1.5rem',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: '0 3.5rem',
            lineHeight: '3.5rem',
          }}
        >
          {team.nameFull}
        </p>
        <br></br>
        <br></br>
        <ReactSVG
          src={team.logo}
          style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '20px', transform: 'scale(1.5)' }}
        />
        <br></br>
        <p
          style={{
            textAlign: 'center',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#006d75',
            position: 'relative',
            transform: '',
            marginTop: '1.5rem',
            marginRight: 'auto',
            marginLeft: 'auto',
            padding: '0 3.5rem',
            lineHeight: '3.5rem',
          }}
        >
          You now have a larger budget and higher ranked players to sign!
        </p>
        <p
          style={{
            textAlign: 'center',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#006d75',
            position: 'relative',
            transform: '',
            marginRight: 'auto',
            marginLeft: 'auto',
            marginTop: 'rem',
            padding: '0 3.5rem',
            lineHeight: '3.5rem',
          }}
        >
          Remember to try and save $20-30 of your total budget!
        </p>
      </div>
    </OverlayBoard>
  );
};
