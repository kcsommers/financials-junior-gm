import { ReactSVG } from 'react-svg';
export const TeamCard = ({ logo, rank, color }) => {
  return (
    <div
      style={{
        width: '200px',
        height: '167px',
        borderRadius: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <ReactSVG src={logo} />
      <span
        style={{
          position: 'absolute',
          top: 0,
          right: '1rem',
          fontSize: '1.5rem',
          color: color,
        }}
      >
        {rank}
      </span>
    </div>
  );
};
