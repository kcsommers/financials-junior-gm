import { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import {
  setStudent,
  initializeSeason,
  setInitialPlayersState,
  initializeObjectives,
} from '@redux/actions';
import { UserRoles } from '@data/auth/auth';
import { Redirect } from 'react-router-dom';
import { getCurrentUser } from './../../api-helper';
import { LoadingSpinner } from '@components';
import {
  getAvailableSlots,
  startingLineupFull,
} from '@data/players/players-utils';
import { playerProps } from '@data/players/players';

export const StudentPortal = ({
  screen,
  isLoggedIn,
  userRole,
  pageName,
  history,
}) => {
  const dispatch = useDispatch();

  const { student, startTime } = useSelector((state) => state.studentState);

  useEffect(() => {
    const beforeUnloadListener = window.addEventListener(
      'beforeunload',
      (e) => {
        console.log('EVENT::: ', e);
        e.preventDefault();
        e.returnValue = false;
        return false;
      }
    );

    console.log('STUDENT:::: ', student);

    return () =>
      window.removeEventListener('beforeunload', beforeUnloadListener);
  }, []);

  const [shouldRedirectToDashboard, setShouldRedirectToDashboard] = useState(
    false
  );

  const initializeStudent = useCallback(
    (student) => {
      batch(() => {
        dispatch(setStudent(student));
        dispatch(setInitialPlayersState(student.players, student));
        dispatch(initializeSeason(student));
        dispatch(initializeObjectives(student, false));
      });
    },
    [dispatch]
  );

  useEffect(() => {
    if (!isLoggedIn || userRole !== UserRoles.STUDENT) {
      setShouldRedirectToDashboard(true);
      return;
    }

    if (student) {
      // make sure pages can be visited
      if (
        (pageName !== 'home' && !student.tutorials) ||
        (pageName === 'budget' && !student.tutorials.home) ||
        (pageName === 'team' && !student.tutorials.budget) ||
        (pageName === 'season' &&
          !student.tutorials.season &&
          !startingLineupFull(student))
      ) {
        history.push('/home');
        return;
      }
      if (pageName === 'scout' && !student.tutorials.team) {
        history.push('/team');
        return;
      }
      return;
    }
    getCurrentUser()
      .then((res) => {
        if (!res || !res.data) {
          throw res;
        }
        const user = res.data;
        if (user.role === UserRoles.STUDENT) {
          initializeStudent(user);
          if (
            (pageName !== 'home' && !user.tutorials) ||
            (pageName === 'budget' && !user.tutorials.home) ||
            (pageName === 'team' && !user.tutorials.budget) ||
            (pageName === 'season' &&
              !res.data.season &&
              getAvailableSlots(playerProps, user) > 0)
          ) {
            history.push('/home');
            return;
          }
          if (pageName === 'scout' && !user.tutorials.team) {
            history.push('/team');
            return;
          }
        } else {
          setShouldRedirectToDashboard(true);
        }
      })
      .catch((err) => {
        console.error('Unexpected error fetching current user', err);
        setShouldRedirectToDashboard(true);
      });
  }, [isLoggedIn, initializeStudent, student, userRole, pageName, history]);

  if (shouldRedirectToDashboard) {
    return <Redirect to="dashboard" />;
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
