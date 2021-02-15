import backBtn from '@images/back-btn.svg';
import { useHistory } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

export const BackButton = ({ path }) => {
  const history = useHistory();

  return (
    <div
      onClick={() => {
        if (path) {
          history.push(path);
        } else {
          history.goBack();
        }
      }}
      style={{
        display: 'inline-block',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ReactSVG src={backBtn} />
      <span
        style={{
          color: '#121210',
          fontSize: '0.8rem',
          maginTop: '-10px',
          fontWeight: 'bold',
        }}
      >
        Back
      </span>
    </div>
  );
};
