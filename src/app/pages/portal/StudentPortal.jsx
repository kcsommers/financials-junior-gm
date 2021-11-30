import { useState, useCallback, useEffect, useRef } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import {
  setStudent,
  initializeSeason,
  setInitialPlayersState,
  initializeObjectives,
  setStartTime,
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
import { updateStudentTimeSpent } from '../../data/student/student-utils';

export const StudentPortal = ({
  screen,
  isLoggedIn,
  userRole,
  pageName,
  history,
}) => {
  const dispatch = useDispatch();

  const { student, startTime } = useSelector((state) => state.studentState);

  const [shouldRedirectToDashboard, setShouldRedirectToDashboard] =
    useState(false);

  const isLoggedInRef = useRef(false);
  useEffect(() => {
    if (
      isLoggedInRef.current === isLoggedIn ||
      !isLoggedIn ||
      userRole !== UserRoles.STUDENT
    ) {
      return;
    }

    isLoggedInRef.current = isLoggedIn;
    dispatch(setStartTime());
    const beforeUnloadListener = window.addEventListener(
      'beforeunload',
      (e) => {
        e.preventDefault();
        e.returnValue = false;
        updateStudentTimeSpent(student, startTime)
          .then(() => {})
          .catch((err) => console.error(err));
        return false;
      }
    );

    return () =>
      window.removeEventListener('beforeunload', beforeUnloadListener);
  }, [isLoggedIn, userRole, dispatch, student]);

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
    const _pageVisited = student.pagesVisited.indexOf(pageName) > -1;
    if (_pageVisited) {
      return;
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn || userRole !== UserRoles.STUDENT) {
      setShouldRedirectToDashboard(true);
      return;
    }

    const _handleRedirects = (_student) => {
      if (
        (pageName !== 'home' && !_student.tutorials) ||
        (pageName === 'budget' && !_student.tutorials.home) ||
        (pageName === 'team' && !_student.tutorials.budget) ||
        (pageName === 'season' &&
          !_student.tutorials.season &&
          !startingLineupFull(_student))
      ) {
        history.push('/home');
        return true;
      }
      if (pageName === 'scout' && !_student.tutorials.team) {
        history.push('/team');
        return true;
      }
      return false;
    };

    if (student) {
      _handleRedirects(student);
      return;
    }
    getCurrentUser()
      .then((res) => {
        if (!res || !res.data) {
          throw res;
        }
        const user = res.data;
        if (user.role !== UserRoles.STUDENT) {
          setShouldRedirectToDashboard(true);
          return;
        }
        initializeStudent(user);
        _handleRedirects(user);
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
