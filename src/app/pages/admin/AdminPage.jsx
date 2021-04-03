import { useEffect, useState } from 'react';
import { getAllTeachers, getAllStudents } from '../../api-helper';
import { LoadingSpinner } from '@components';
import { Route, Switch } from 'react-router-dom';
import { TeacherBrowser } from './TeacherBrowser';
import { TeacherDetails } from './TeacherDetails';
import '@css/pages/AdminPage.css';

export const AdminPage = ({ history }) => {
  const [allTeachers, setAllTeachers] = useState(null);
  const [allStudents, setAllStudents] = useState(null);

  const logout = () => {
    console.log('LOUGGOUT::::');
  };

  useEffect(() => {
    getAllTeachers()
      .then((res) => {
        console.log('TEACHRES:::: ', res);
        setAllTeachers(res.data);
      })
      .catch((err) => console.error(err));

    getAllStudents()
      .then((res) => {
        console.log('STUDENTs:::: ', res);
        setAllStudents(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className='page-container admin-page-container'>
      <div className='admin-page-header'>
        <h1>Financials Junior GM Admin</h1>
        <button className='btn-accent' onClick={logout}>
          Logout
        </button>
      </div>
      <div className='admin-page-body-container'>
        <Switch>
          <Route
            path='/admin/teachers/:id'
            render={(props) => <TeacherDetails {...props} />}
          />
          <Route
            path='/admin/teachers'
            render={(props) => (
              <TeacherBrowser {...props} allTeachers={allTeachers} />
            )}
          />
          <Route
            exact
            path='/admin'
            render={() => (
              <div className='admin-totals-wrap'>
                <div className='admin-total-wrap box-shadow'>
                  <div className='admin-total-left'>
                    {allTeachers ? (
                      <span>{allTeachers.length}</span>
                    ) : (
                      <LoadingSpinner size='small' />
                    )}{' '}
                    Total Teachers
                  </div>
                  <div className='admin-total-right'>
                    <button
                      className='btn-primary'
                      onClick={() => {
                        history.push('/admin/teachers');
                      }}
                    >
                      Browse Teachers
                    </button>
                  </div>
                </div>
                <div className='admin-total-wrap box-shadow'>
                  <div className='admin-total-left'>
                    {allStudents ? (
                      <span>{allStudents.length}</span>
                    ) : (
                      <LoadingSpinner size='small' />
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
