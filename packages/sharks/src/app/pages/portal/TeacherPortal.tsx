import { useEffect, useCallback, useState } from 'react';
import { Redirect } from 'react-router';
import { setTeacher, useAppDispatch, useAppSelector } from '@redux';
import { ApiHelper, UserRoles } from '@statrookie/core';
import { LoadingSpinner } from '@components';
import { BASE_URL } from 'app/api';

export const TeacherPortal = ({ screen, isLoggedIn, userRole }) => {
  const dispatch = useAppDispatch();

  const teacher = useAppSelector((state) => state.teacherState.teacher);

  const [shouldRedirect, setShouldRedirect] = useState(false);

  const initializeTeacher = useCallback(
    (teacher) => {
      dispatch(setTeacher(teacher));
    },
    [dispatch]
  );

  useEffect(() => {
    if (!isLoggedIn || userRole !== UserRoles.TEACHER) {
      setShouldRedirect(true);
      return;
    }

    if (teacher) {
      return;
    }
    ApiHelper.getCurrentUser(BASE_URL)
      .then((res) => {
        if (!res || !res.data) {
          throw res;
        }

        if (res.data.role === UserRoles.TEACHER) {
          initializeTeacher(res.data);
        } else {
          setShouldRedirect(true);
        }
      })
      .catch((err) => {
        console.error('Unexpected error fetching current user', err);
        setShouldRedirect(true);
      });
  }, [isLoggedIn, initializeTeacher, teacher, userRole]);

  if (shouldRedirect) {
    return <Redirect to="dashboard" />;
  }

  return teacher ? (
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
