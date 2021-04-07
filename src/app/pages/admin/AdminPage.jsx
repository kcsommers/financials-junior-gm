import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllTeachers, getAllStudents } from '../../api-helper';
import { LoadingSpinner } from '@components';
import { Link, Route, Switch } from 'react-router-dom';
import { TeacherBrowser } from './TeacherBrowser';
import { logout } from './../../api-helper';
import { clearSessionStorage } from '@data/auth/auth';
import { setLoginState } from '@redux/actions';
import { formatNumber } from '@utils';
import '@css/pages/AdminPage.css';

export const AdminPage = ({ history }) => {
  const dispatch = useDispatch();

  const [allTeachers, setAllTeachers] = useState(null);

  const [allStudents, setAllStudents] = useState(null);

  const doLogout = () => {
    logout()
      .then(() => {
        clearSessionStorage();

        dispatch(setLoginState(false, ''));
        history.push('/dashboard');
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getAllTeachers()
      .then((res) => {
        setAllTeachers(res.data);
      })
      .catch((err) => console.error(err));

    getAllStudents()
      .then((res) => {
        setAllStudents(res.data);
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
        <Switch>
          <Route
            path="/admin/teachers"
            render={(props) => (
              <TeacherBrowser {...props} allTeachers={allTeachers} />
            )}
          />
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
              </div>
            )}
          />
        </Switch>
      </div>
    </div>
  );
};
