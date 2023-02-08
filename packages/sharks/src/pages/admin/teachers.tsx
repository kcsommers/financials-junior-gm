import { TeacherBrowser } from '@statrookie/core/src/admin/TeacherBrowser';
import { useAuth } from '@statrookie/core/src/auth/context/auth-context';
import { Teacher } from '@statrookie/core/src/auth/users/teacher.interface';
import { UserRoles } from '@statrookie/core/src/auth/users/user-roles';
import { ProtectedRoute } from '@statrookie/core/src/components/ProtectedRoute';
import ArrowLeft from '@statrookie/core/src/components/svg/arrow-left-solid.svg';
import { ApiHelper } from '@statrookie/core/src/server/api/api-helper';
import classnames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../constants/api-base-url';
import styles from './admin.module.scss';

const TeachersPage = () => {
  const { logUserOut } = useAuth();
  const router = useRouter();

  const [allTeachers, setAllTeachers] = useState<Teacher[]>();

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
    <div
      className={classnames(
        'h-full w-full relative flex flex-col',
        styles.admin_page_container
      )}
    >
      <div className={styles.admin_page_header}>
        <h2 className="text-3xl text-foreground font-bold">
          <Link href="/admin">Financials Junior GM Admin</Link>
        </h2>
        <button className="btn-secondary text-base" onClick={doLogout}>
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
          <ArrowLeft width={15} className="fill-secondary" />
          <span className="inline-block ml-2">Go Back</span>
        </Link>
        <TeacherBrowser
          allTeachers={allTeachers || []}
          apiBaseUrl={API_BASE_URL}
        />
      </div>
    </div>
  );
};

export default () => {
  return (
    <ProtectedRoute
      apiBaseUrl={API_BASE_URL}
      permittedRoles={[UserRoles.ADMIN]}
    >
      <TeachersPage />
    </ProtectedRoute>
  );
};
