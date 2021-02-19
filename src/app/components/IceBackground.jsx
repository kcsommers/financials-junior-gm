import { ReactSVG } from 'react-svg';
import financialsLogo from '@images/financials-logo.svg';
import ice from '@images/field.png';
import { useLocation } from 'react-router-dom';

export const IceBackground = () => {
  const location = useLocation().pathname;
  return (
    <div
      className='ice-background'
      style={{
        background: `url(${ice})`,
        backgroundPosition:
          location === '/home' ? 'center 200px' : 'center 125px',
        backgroundRepeat: 'no-repeat',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 0,
      }}
    >
      {location !== '/dashboard' && (
        <ReactSVG
          src={financialsLogo}
          style={{
            position: 'relative',
            top: location === '/home' ? '200px' : '125px',
          }}
        />
      )}
    </div>
  );
};
