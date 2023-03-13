import classnames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { TeacherBrowser } from '../../admin/TeacherBrowser';
import { useAuth } from '../../auth/context/auth-context';
import { Teacher } from '../../auth/users/teacher.interface';
import ArrowLeft from '../../components/svg/arrow-left-solid.svg';
import { ApiHelper } from '../../api/api-helper';
import styles from './admin.module.scss';

type TeachersPageProps = {
  apiBaseUrl: string;
};

export const CoreTeachersPage = ({ apiBaseUrl }: TeachersPageProps) => {
  const { logUserOut } = useAuth();
  const router = useRouter();

  const [allTeachers, setAllTeachers] = useState<Teacher[]>();

  const doLogout = () => {
    ApiHelper.logout(apiBaseUrl)
      .then(() => {
        logUserOut();
        router.push('/');
      })
      .catch((err: any) => console.error(err));
  };

  useEffect(() => {
    ApiHelper.getAllTeachers(apiBaseUrl)
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
          apiBaseUrl={apiBaseUrl}
        />
      </div>
    </div>
  );
};
