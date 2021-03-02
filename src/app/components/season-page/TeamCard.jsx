import { ReactSVG } from 'react-svg';
export const TeamCard = ({ logo, standing, color }) => {
  return (
    <div
      style={{
        width: '200px',
        height: '167px',
        borderRadius: '10px',
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <ReactSVG src={logo} style={{transform: 'scale(0.85)'}} />
      <span
        style={{
          position: 'absolute',
          top: 0,
          right: '1rem',
          fontSize: '1.5rem',
          color: color,
        }}
      >
        {standing}
      </span>
    </div>
  );
};
