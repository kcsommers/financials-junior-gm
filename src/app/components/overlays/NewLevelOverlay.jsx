import { useDispatch, batch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  setStudent,
  initializeSeason,
  setInitialPlayersState,
} from '@redux/actions';
import { OverlayBoard, Button } from '@components';
import { resetSeason } from '@data/season/season';
import sjbarracudalogo from '../../../assets/images/icons/sjbarracuda-logo.svg'
import sjsharkslogo from '../../../assets/images/icons/sharks-logo.svg'
import { ReactSVG } from 'react-svg';

export const NewLevelOverlay = ({ student }) => {
  const dispatch = useDispatch();
  const history = useHistory();

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
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#006d75',
            position: 'relative',
            transform: '',
            marginTop: '1.5rem',
            padding: '0 3.5rem',
            lineHeight: '3.5rem',
          }}
        >
            {/*Should say San Jose Sharks if they are promoted to level 3 */}
          San Jose Barracuda!
        </p>
        {/*Should render sjsharks logo for level 3*/}
        <ReactSVG src={sjbarracudalogo} style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '20px'}}/>
        <p
          style={{
            textAlign: 'center',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#000000',
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
            color: '#000000',
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
