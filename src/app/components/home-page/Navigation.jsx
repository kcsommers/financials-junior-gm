import exitBtn from '@images/exit-btn.svg';
import refreshBtn from '@images/refresh-btn.svg';
import { logout } from '../../api-helper';
import { useHistory } from 'react-router-dom';
import {
  destroySession,
  toggleOverlay,
  setStudent,
  initializeSeason,
  setInitialPlayersState,
  initializeObjectives,
} from '@redux/actions';
import { useDispatch, batch } from 'react-redux';
import {
  LOGIN_STORAGE_KEY,
  USER_ROLE_STORAGE_KEY,
  STUDENT_ID_STORAGE_KEY,
} from '@data/auth/auth';
import { ConfirmOverlay } from '@components';
import { resetSeason } from '@data/season/season';
import '@css/components/home-page/Navigation.css';

export const Navigation = ({ tutorialActive, student }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const resetSeasonConfirmed = () => {
    resetSeason(+student.level, student)
      .then((updatedStudent) => {
        batch(() => {
          dispatch(setStudent(updatedStudent));
          dispatch(
            setInitialPlayersState(updatedStudent.players, updatedStudent)
          );
          dispatch(initializeSeason(updatedStudent));
          dispatch(
            toggleOverlay({
              isOpen: false,
              template: null,
            })
          );
          dispatch(initializeObjectives(updatedStudent));
        });
      })
      .catch((err) => console.error(err));
  };

  const confirmResetSeason = () => {
    dispatch(
      toggleOverlay({
        isOpen: true,
        template: (
          <ConfirmOverlay
            message='Would you like to restart the season?'
            cancel={() => {
              dispatch(
                toggleOverlay({
                  isOpen: false,
                  template: null,
                })
              );
            }}
            confirm={resetSeasonConfirmed}
          ></ConfirmOverlay>
        ),
      })
    );
  };

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

      <div className='settings-link-box'>
        <img
          src={refreshBtn}
          alt='Reset'
          style={{
            width: '65px',
            cursor: 'pointer',
            display: 'inline-block',
            zIndex: tutorialActive ? '0' : '1',
            position: 'relative',
          }}
          title='Reset Season'
          onClick={confirmResetSeason}
        />
      </div>
    </div>
  );
};
