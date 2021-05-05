import exitBtn from '@images/exit-btn.svg';
import refreshBtn from '@images/refresh-btn.svg';
import { logout } from '../../api-helper';
import { useHistory } from 'react-router-dom';
import {
  setLoginState,
  toggleOverlay,
  setStudent,
  initializeSeason,
  setInitialPlayersState,
  initializeObjectives,
} from '@redux/actions';
import { useDispatch, batch, useSelector } from 'react-redux';
import { clearSessionStorage } from '@data/auth/auth';
import { ConfirmOverlay } from '@components';
import { resetSeason } from '@data/season/season-utils';
import '@css/components/home-page/Navigation.css';
import { updateStudentTimeSpent } from '../../data/student/student-utils';

export const Navigation = ({ tutorialActive, student }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { startTime } = useSelector((state) => state.studentState);

  const resetSeasonConfirmed = () => {
    resetSeason(+student.level, +student.level, student)
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
          dispatch(initializeObjectives(updatedStudent, true));
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
            message="Would you like to restart the season?"
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
    const _logout = () => {
      logout()
        .then(() => {
          clearSessionStorage();

          dispatch(setLoginState(false, ''));
          history.push('/dashboard');
        })
        .catch((err) => console.error(err));
    };

    updateStudentTimeSpent(student, startTime)
      .then(() => {
        _logout();
      })
      .catch((err) => {
        console.error(err);
        _logout();
      });
  };

  const logoutOverlay = () => {
    dispatch(
      toggleOverlay({
        isOpen: true,
        template: (
          <ConfirmOverlay
            message="Are you sure you would like to logout?"
            subMessage="All your changes have been saved for next time."
            cancel={() => {
              dispatch(
                toggleOverlay({
                  isOpen: false,
                  template: null,
                })
              );
            }}
            confirm={doLogout}
          ></ConfirmOverlay>
        ),
      })
    );
  };

  return (
    <div
      className="nav-container"
      style={{
        position: 'relative',
        // zIndex: tutorialActive ? 0 : 1,
      }}
    >
      <div className="exit-stick-box">
        <img
          src={exitBtn}
          alt="Exit"
          onClick={logoutOverlay}
          style={{ cursor: 'pointer' }}
        />
      </div>

      <div className="home-title-box">
        <h1 className="page-title">HOME</h1>
      </div>

      <div className="settings-link-box">
        <img
          src={refreshBtn}
          alt="Reset"
          style={{
            width: '65px',
            cursor: 'pointer',
            display: 'inline-block',
            zIndex: tutorialActive ? '0' : '1',
            position: 'relative',
          }}
          title="Reset Season"
          onClick={confirmResetSeason}
        />
      </div>
    </div>
  );
};
