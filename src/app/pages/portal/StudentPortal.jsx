import { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import {
  setStudent,
  initializeSeason,
  setInitialPlayersState,
} from '@redux/actions';
import { UserRoles } from '@data/auth/auth';
import { Redirect } from 'react-router-dom';
import { getCurrentUser } from './../../api-helper';
import { LoadingSpinner } from '@components';

export const StudentPortal = ({ screen, isLoggedIn, userRole }) => {
  const dispatch = useDispatch();

  const student = useSelector((state) => state.studentState.student);

  const [shouldRedirect, setShouldRedirect] = useState(false);

  const initializeStudent = useCallback(
    (student) => {
      batch(() => {
        dispatch(setStudent(student));
        dispatch(setInitialPlayersState(student.players, student));
        dispatch(initializeSeason(student));
      });
    },
    [dispatch]
  );

  useEffect(() => {
    if (!isLoggedIn || userRole !== UserRoles.STUDENT) {
      setShouldRedirect(true);
      return;
    }

    if (student) {
      return;
    }
    console.log('[studentProtal] GETTING CURRENT:::: ');
    getCurrentUser()
      .then((res) => {
        if (!res || !res.data) {
          throw res;
        }

        if (res.data.role === UserRoles.STUDENT) {
          initializeStudent(res.data);
        } else {
          setShouldRedirect(true);
        }
      })
      .catch((err) => {
        console.error('Unexpected error fetching current user', err);
        setShouldRedirect(true);
      });
  }, [isLoggedIn, initializeStudent, student, userRole]);

  if (shouldRedirect) {
    return <Redirect to='dashboard' />;
  }

  return student ? (
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
