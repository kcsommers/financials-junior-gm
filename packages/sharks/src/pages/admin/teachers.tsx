import { TeacherBrowser } from '@statrookie/core/src/admin/TeacherBrowser';
import { useAuth } from '@statrookie/core/src/auth/context/auth-context';
import { Teacher } from '@statrookie/core/src/auth/users/teacher.interface';
import { ProtectedRoute } from '@statrookie/core/src/components/ProtectedRoute';
import ArrowLeft from '@statrookie/core/src/components/svg/arrow-left-solid.svg';
import { ApiHelper } from '@statrookie/core/src/server/api/api-helper';
import classnames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../constants/api-base-url';
import styles from '../styles/admin.module.scss';

const TeachersPage = () => {
  const { logUserOut } = useAuth();
  const router = useRouter();

  const [allTeachers, setAllTeachers] = useState<{
    success: boolean;
    data: Teacher[];
  }>();

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
            href="/admin"
          >
            {/* @ts-ignore */}
            <ArrowLeft fill="#F3901D" width={15} />
            <span className="inline-block ml-2">Go Back</span>
          </Link>
          <TeacherBrowser
            allTeachers={allTeachers?.data || []}
            apiBaseUrl={API_BASE_URL}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default TeachersPage;
