import { useState, useEffect } from 'react';
import { setAdmin, useAppDispatch, useAppSelector } from '@redux';
import { UserRoles } from '@statrookie/core';
import { Redirect } from 'react-router-dom';
import { getCurrentUser } from '../../api-helper';
import { LoadingSpinner } from '@components';

export const AdminPortal = ({
  screen,
  isLoggedIn,
  userRole,
  pageName = '',
  history = null,
}) => {
  const dispatch = useAppDispatch();

  const { admin } = useAppSelector((state) => state.adminState);

  const [shouldRedirectToLogin, setShouldRedirectToLogin] = useState(false);

  useEffect(() => {
    if (!isLoggedIn || userRole !== UserRoles.ADMIN) {
      setShouldRedirectToLogin(true);
      return;
    }

    getCurrentUser()
      .then((res) => {
        if (!res || !res.data) {
          throw res;
        }

        const user = res.data;
        if (user.role === UserRoles.ADMIN) {
          dispatch(setAdmin(user));
        } else {
          setShouldRedirectToLogin(true);
        }
      })
      .catch((err) => {
        console.error('Unexpected error fetching current user', err);
        setShouldRedirectToLogin(true);
      });
  }, [isLoggedIn, userRole, pageName, history, dispatch]);

  if (shouldRedirectToLogin) {
    return <Redirect to="admin/login" />;
  }

  return admin ? (
    screen
  ) : (
    <div
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <LoadingSpinner />
    </div>
  );
};
