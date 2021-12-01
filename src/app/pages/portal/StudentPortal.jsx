import { LoadingSpinner } from '@components';
import { UserRoles } from '@data/auth/auth';
import { startingLineupFull } from '@data/players/players-utils';
import {
  initializeObjectives,
  initializeSeason,
  setInitialPlayersState,
  setStartTime,
  setStudent,
} from '@redux/actions';
import { useCallback, useEffect, useRef, useState } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { updateStudentTimeSpent } from '../../data/student/student-utils';
import { getCurrentUser, updateStudentById } from './../../api-helper';

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
    if (!isLoggedIn || userRole !== UserRoles.STUDENT) {
      setShouldRedirectToDashboard(true);
      return;
    }

    const _handleRedirects = (_student) => {
      const _pagesVisited = _student.pagesVisited || [];
      if (_student.level === 1) {
        if (
          (pageName !== 'home' && !_student.tutorials) ||
          (pageName === 'budget' && !_student.tutorials.home) ||
          (pageName === 'team' && !_student.tutorials.budget) ||
          (pageName === 'season' &&
            !_student.tutorials.season &&
            !startingLineupFull(_student))
        ) {
          history.push('/home');
          return;
        }
        if (pageName === 'scout' && !_student.tutorials.team) {
          history.push('/team');
          return;
        }
      } else {
        console.log('pages visited:::: ', _pagesVisited);
        if (
          (pageName !== 'home' && !_pagesVisited.includes('home')) ||
          (pageName === 'team' && !_pagesVisited.includes('budget'))
        ) {
          history.push('/home');
          return;
        }
      }
      if (_pagesVisited.includes(pageName)) {
        return;
      }
      _pagesVisited.push(pageName);
      updateStudentById(_student._id, { pagesVisited: _pagesVisited })
        .then((res) => {
          dispatch(setStudent(res.updatedStudent));
        })
        .catch((err) => console.error(err));
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
