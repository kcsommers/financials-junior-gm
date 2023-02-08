import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from '@statrookie/core/src/auth/context/auth-context';
import { Student } from '@statrookie/core/src/auth/users/student.interface';
import { Teacher } from '@statrookie/core/src/auth/users/teacher.interface';
import { LoadingSpinner } from '@statrookie/core/src/components/LoadingSpinner';
import { ProtectedRoute } from '@statrookie/core/src/components/ProtectedRoute';
import { ApiHelper } from '@statrookie/core/src/server/api/api-helper';
import { formatNumber } from '@statrookie/core/src/utils/format-number';
import classnames from 'classnames';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../constants/api-base-url';
import styles from '../styles/admin.module.scss';

const AdminPage = () => {
  const { logUserOut } = useAuth();
  const router = useRouter();

  const [allTeachers, setAllTeachers] = useState<Teacher[]>();
  const [allStudents, setAllStudents] = useState<Student[]>();
  const [totalTimeSpent, setTotalTimeSpent] = useState<string>();

  const doLogout = () => {
    ApiHelper.logout(API_BASE_URL)
      .then(() => {
        logUserOut();
        router.push('/');
      })
      .catch((err: any) => console.error(err));
  };

  useEffect(() => {
    ApiHelper.getAllTeachers(API_BASE_URL)
      .then((res) => {
        setAllTeachers(res.data);
      })
      .catch((err) => console.error(err));

    ApiHelper.getAllStudents(API_BASE_URL)
      .then((res) => {
        setAllStudents(res.data);
      })
      .catch((err) => console.error(err));

    ApiHelper.getTimeSpent(API_BASE_URL)
      .then((res) => {
        setTotalTimeSpent(
          moment
            .duration(res.data?.totalTimeSpent || 0)
            .asHours()
            .toFixed(2)
        );
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <ProtectedRoute apiBaseUrl={API_BASE_URL}>
      <div
        className={classnames('page-container', styles.admin_page_container)}
      >
        <div className={styles.admin_page_header}>
          <Link href="/admin">
            <h1>Financials Junior GM Admin</h1>
          </Link>
          <button className="btn-accent text-base" onClick={doLogout}>
            Logout
          </button>
        </div>
        <div className={styles.admin_page_body_container}>
          <Link
            className="justify-center inline-flex items-center mb-4 cursor-pointer text-sm"
            style={{ color: '#F3901D' }}
            href="/admin/login"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <span className="inline-block ml-2">Go Back</span>
          </Link>
          <div className={styles.admin_totals_wrap}>
            <div className={classnames(styles.admin_total_wrap, 'box-shadow')}>
              <div className={styles.admin_total_left}>
                {allTeachers ? (
                  <span>{formatNumber(allTeachers.length)}</span>
                ) : (
                  <LoadingSpinner size="small" />
                )}{' '}
                Total Teachers
              </div>
              <Link href="/admin/teachers" className="btn-primary text-base">
                View Teachers
              </Link>
            </div>
            <div className={classnames(styles.admin_total_wrap, 'box-shadow')}>
              <div className={styles.admin_total_left}>
                {allStudents ? (
                  <span>{formatNumber(allStudents.length)}</span>
                ) : (
                  <LoadingSpinner size="small" />
                )}{' '}
                Total Students
              </div>
            </div>

            <div className={classnames(styles.admin_total_wrap, 'box-shadow')}>
              <div className={styles.admin_total_left}>
                {totalTimeSpent ? (
                  <span>{totalTimeSpent} Hours</span>
                ) : (
                  <LoadingSpinner size="small" />
                )}{' '}
                Total Time Spent
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminPage;
