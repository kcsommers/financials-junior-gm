import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from '@statrookie/core/dist/bundles';
import { ProtectedRoute } from '@statrookie/core/src/components/ProtectedRoute';
import { environments } from '../../environments';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const BASE_URL = environments[process.env.NODE_ENV].API_BASE_URL;

const AdminPage = () => {
  const { logUserOut } = useAuth();
  const router = useRouter();

  return (
    <ProtectedRoute apiBaseUrl={BASE_URL}>
      <div className="page-container admin-page-container">
        <div className="admin-page-header">
          <Link href="/admin">
            <h1>Financials Junior GM Admin</h1>
          </Link>
          <button
            className="btn-accent"
            onClick={() => {
              logUserOut();
              router.push('/');
            }}
          >
            Logout
          </button>
        </div>
        <div className="admin-page-body-container">
          <div
            className="justify-center inline-flex items-center mb-4 cursor-pointer"
            role="button"
            style={{
              fontSize: '0.95rem',
              color: '#F3901D',
            }}
            onClick={() => {
              router.back();
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <span className="inline-block ml-2">Go Back</span>
          </div>
          {/* <Switch>
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
          </Switch> */}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminPage;
