import { useState } from 'react';
import { useDispatch, batch } from 'react-redux';
import { AppRouter } from './AppRouter';
import {
  setStudent,
  setInitialPlayersState,
  initializeSeason,
} from '@redux/actions';
import { getCurrentUser } from './api-helper';
import { getIsLoggedIn, UserRoles, getUserRole } from '@data/auth/auth';
import '@css/App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(getIsLoggedIn());
  const [userRole, setUserRole] = useState(getUserRole());

  const onLogin = (user) => {
    if (user) {
      setIsLoggedIn(true);
      setUserRole(user.role);
    }
  };

  return (
    <div className='app-container'>
      <AppRouter
        isLoggedIn={isLoggedIn}
        onLogin={onLogin}
        userRole={userRole}
      />
    </div>
  );
};
export default App;
