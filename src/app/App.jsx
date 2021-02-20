import { useState } from 'react';
import { useDispatch, batch } from 'react-redux';
import { AppRouter } from './AppRouter';
import {
  setStudent,
  setInitialPlayersState,
  initializeSeason,
} from '@redux/actions';
import { getCurrentUser } from './api-helper';
import { getIsLoggedIn, UserRoles } from '@data/auth/auth';
import '@css/App.css';

const App = () => {
  const dispatch = useDispatch();

  const [isLoggedIn, setIsLoggedIn] = useState(getIsLoggedIn());
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const initializeStudent = (student) => {
    batch(() => {
      dispatch(setStudent(student));
      dispatch(setInitialPlayersState(student.players, student));
      dispatch(initializeSeason(student));
    });
  };

  const onLogin = (user) => {
    setIsLoggedIn(true);
    if (user.role === UserRoles.STUDENT) {
      initializeStudent(user);
    }
  };

  if (isLoggedIn) {
    console.log('GETTING CURRENT USER:::: ');
    getCurrentUser()
      .then((res) => {
        if (!res || !res.data) {
          throw res;
        }

        if (res.data.role === UserRoles.STUDENT) {
          initializeStudent(res.data);
        }
      })
      .catch((err) => {
        console.error('Unexpected error fetching current user', err);
        setShouldRedirect(true);
      });
  }

  return (
    <div className='app-container'>
      <AppRouter
        isLoggedIn={isLoggedIn}
        shouldRedirect={shouldRedirect}
        onLogin={onLogin}
      />
    </div>
  );
};
export default App;
