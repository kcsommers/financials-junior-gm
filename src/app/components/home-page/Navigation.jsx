import exitBtn from '@images/exit-btn.svg';
import settingsBtn from '@images/settings-btn.svg';
import { logout } from '../../api-helper';
import { useHistory } from 'react-router-dom';
import { destroySession } from '@redux/actions';
import { useDispatch } from 'react-redux';
import {
  LOGIN_STORAGE_KEY,
  USER_ROLE_STORAGE_KEY,
  STUDENT_ID_STORAGE_KEY,
} from '@data/auth/auth';
import '@css/components/home-page/Navigation.css';

export const Navigation = ({ tutorialActive }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const doLogout = () => {
    logout()
      .then(() => {
        localStorage.setItem(LOGIN_STORAGE_KEY, false);
        localStorage.setItem(USER_ROLE_STORAGE_KEY, '');
        localStorage.setItem(STUDENT_ID_STORAGE_KEY, '');
        dispatch(destroySession());
        history.push('/dashboard');
      })
      .catch((err) => console.error(err));
  };

  return (
    <div
      className='nav-container'
      style={{
        position: 'relative',
        // zIndex: tutorialActive ? 0 : 1,
      }}
    >
      <div className='exit-stick-box'>
        <img
          src={exitBtn}
          alt='Exit'
          onClick={doLogout}
          style={{ cursor: 'pointer' }}
        />
      </div>

      <div className='home-title-box'>
        <h1 className='page-title'>HOME</h1>
      </div>

      {
        <div style={{ opacity: 0 }} className='settings-link-box'>
          <img src={settingsBtn} alt='Settings' />
        </div>
      }
    </div>
  );
};
