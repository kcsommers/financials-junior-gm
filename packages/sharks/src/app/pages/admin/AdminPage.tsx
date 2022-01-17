import { useEffect, useState } from 'react';
import { LoadingSpinner } from '@components';
import { Link, Route, Switch } from 'react-router-dom';
import { TeacherBrowser } from './TeacherBrowser';
import { ApiHelper, clearAuthStorage } from '@statrookie/core';
import { setLoginState, useAppDispatch } from '@redux';
import { formatNumber } from '@utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';
import '@css/pages/AdminPage.css';
import { BASE_URL } from 'app/api';

export const AdminPage = ({ history }) => {
  const dispatch = useAppDispatch();

  const [allTeachers, setAllTeachers] = useState<any[]>();

  const [allStudents, setAllStudents] = useState<any[]>();

  const [totalTimeSpent, setTotalTimeSpent] = useState<string>();

  const doLogout = () => {
    ApiHelper.logout()
      .then(() => {
        clearAuthStorage();

        dispatch(setLoginState({ isLoggedIn: false, userRole: '' }));
        history.push('/dashboard');
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    ApiHelper.getAllTeachers(BASE_URL)
      .then((res) => {
        setAllTeachers(res.data);
      })
      .catch((err) => console.error(err));

    ApiHelper.getAllStudents(BASE_URL)
      .then((res) => {
        setAllStudents(res.data);
      })
      .catch((err) => console.error(err));

    ApiHelper.getTimeSpent(BASE_URL)
      .then((res) => {
        setTotalTimeSpent(
          moment.duration(res.totalTimeSpent).asHours().toFixed(2)
        );
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="page-container admin-page-container">
      <div className="admin-page-header">
        <Link to="/admin">
          <h1>Financials Junior GM Admin</h1>
        </Link>
        <button className="btn-accent" onClick={doLogout}>
          Logout
        </button>
      </div>
      <div className="admin-page-body-container">
        <div
          style={{
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '0.95rem',
            color: '#F3901D',
            marginBottom: '1rem',
            cursor: 'pointer',
          }}
          onClick={() => {
            history.goBack();
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <span
            style={{
              display: 'inline-block',
              marginLeft: '0.5rem',
            }}
          >
            Go Back
          </span>
        </div>
        <Switch>
          {/* <Route
            path="/admin/teachers"
            render={(props) => (
              <TeacherBrowser {...props} allTeachers={allTeachers} />
            )}
          /> */}
          <Route
            exact
            path="/admin"
            render={() => (
              <div className="admin-totals-wrap">
                <div className="admin-total-wrap box-shadow">
                  <div className="admin-total-left">
                    {allTeachers ? (
                      <span>{formatNumber(allTeachers.length)}</span>
                    ) : (
                      <LoadingSpinner size="small" />
                    )}{' '}
                    Total Teachers
                  </div>
                  <div className="admin-total-right">
                    <button
                      className="btn-primary"
                      onClick={() => {
                        history.push('/admin/teachers');
                      }}
                    >
                      View Teachers
                    </button>
                  </div>
                </div>
                <div className="admin-total-wrap box-shadow">
                  <div className="admin-total-left">
                    {allStudents ? (
                      <span>{formatNumber(allStudents.length)}</span>
                    ) : (
                      <LoadingSpinner size="small" />
                    )}{' '}
                    Total Students
                  </div>
                </div>

                <div className="admin-total-wrap box-shadow">
                  <div className="admin-total-left">
                    {totalTimeSpent ? (
                      <span>{totalTimeSpent} Hours</span>
                    ) : (
                      <LoadingSpinner size="small" />
                    )}{' '}
                    Total Time Spent
                  </div>
                </div>
              </div>
            )}
          />
        </Switch>
      </div>
    </div>
  );
};
