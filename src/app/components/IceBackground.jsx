import { ReactSVG } from 'react-svg';
import financialsLogo from '@images/financials-logo.svg';
import ice from '@images/field.png';

export const IceBackground = () => {
  return (
    <div
      className='ice-background'
      style={{
        background: `url(${ice})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'absolute',
        top: '125px',
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: -1,
      }}
    >
      <ReactSVG src={financialsLogo} />
    </div>
  );
};
