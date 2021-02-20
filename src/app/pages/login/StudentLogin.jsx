import { useState } from 'react';
import { ReactSVG } from 'react-svg';
import {
  studentLogin,
  getCurrentUser,
  initPlayersByLevel,
} from '../../api-helper';
import financialsLogo from '@images/financials-logo-big.svg';
import { LoginForm } from '@components';
import {
  LOGIN_STORAGE_KEY,
  UserRoles,
  USER_ROLE_STORAGE_KEY,
  STUDENT_ID_STORAGE_KEY,
} from '@data/auth/auth';
import '@css/pages/Login.css';

export const StudentLogin = ({ history, onLogin }) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  const loginSuccess = (student) => {
    setIsLoggingIn(false);
    localStorage.setItem(LOGIN_STORAGE_KEY, true);
    localStorage.setItem(USER_ROLE_STORAGE_KEY, UserRoles.STUDENT);
    localStorage.setItem(STUDENT_ID_STORAGE_KEY, student._id);

    onLogin(student);
    history.push('/home');
  };

  const doLogin = (userName, password) => {
    setIsLoggingIn(true);

    studentLogin({ userName, password })
      .then((res) => {
        if (!res || !res.success) {
          throw res;
        }

        getCurrentUser()
          .then((studentRes) => {
            const student = studentRes.data;
            if (!studentRes.success || !student) {
              throw studentRes;
            }

            // check for initialized players
            if (student.players && student.players.length) {
              loginSuccess(student);
              return;
            }

            // initialize players on student
            initPlayersByLevel(student.level || 1)
              .then((initializedStudentRes) => {
                if (
                  !initializedStudentRes.success ||
                  !initializedStudentRes.data
                ) {
                  throw initializedStudentRes;
                }

                loginSuccess(student);
              })
              .catch((err) => {
                console.error('Unexpected error initializing players', err);
              });
          })
          .catch((error) => {
            console.error('Unexpected error fetching current user: ', error);
          });
      })
      .catch((error) => {
        setIsLoggingIn(false);
        setLoginError('Unexpected login error. Please try again.');
        console.error(error);
      });
  };

  return (
    <div className='login-page-container'>
      <div>
        <ReactSVG src={financialsLogo} />
      </div>

      <LoginForm
        onLogin={doLogin}
        isLoggingIn={isLoggingIn}
        loginError={loginError}
        history={history}
      />
    </div>
  );
};
