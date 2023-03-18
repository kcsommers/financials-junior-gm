import classnames from 'classnames';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuth } from '../../auth/context/auth-context';
import { Teacher } from '../../auth/users/teacher.interface';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import ArrowLeft from '../../components/svg/arrow-left-solid.svg';
import { ApiHelper } from '../../api/api-helper';
import { Student } from '../../student/student.interface';
import { formatNumber } from '../../utils/format-number';
import styles from './admin.module.scss';

type AdminPageProps = {
  apiBaseUrl: string;
};

export const CoreAdminPage = ({ apiBaseUrl }: AdminPageProps) => {
  const { logUserOut } = useAuth();
  const router = useRouter();

  const [allTeachers, setAllTeachers] = useState<Teacher[]>();
  const [allStudents, setAllStudents] = useState<Student[]>();
  const [totalTimeSpent, setTotalTimeSpent] = useState<string>();

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

    ApiHelper.getAllStudents(apiBaseUrl)
      .then((res) => {
        setAllStudents(res.data);
      })
      .catch((err) => console.error(err));

    ApiHelper.getTimeSpent(apiBaseUrl)
      .then((res) => {
        setTotalTimeSpent(
          formatNumber(
            moment.duration(res?.totalTimeSpent || 0).asHours()
          ) as string
        );
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
          className="justify-center inline-flex items-center mb-4 cursor-pointer text-sm text-secondary"
          href="/admin/login"
        >
          {/* @ts-ignore */}
          <ArrowLeft width={15} className="fill-secondary" />
          <span className="inline-block ml-2">Go Back</span>
        </Link>
        <div className={styles.admin_totals_wrap}>
          <div
            className={classnames(
              styles.admin_total_wrap,
              'shadow-mat text-foreground'
            )}
          >
            <div className={styles.admin_total_left}>
              {allTeachers ? (
                <span className="text-primary text-4xl">
                  {formatNumber(allTeachers.length)}
                </span>
              ) : (
                <LoadingSpinner size="sm" />
              )}{' '}
              <span className="ml-4 text-4xl">Total Teachers</span>
            </div>
            <Link href="/admin/teachers" className="btn-primary text-base">
              View Teachers
            </Link>
          </div>
          <div
            className={classnames(
              styles.admin_total_wrap,
              'shadow-mat text-foreground'
            )}
          >
            <div className={styles.admin_total_left}>
              {allStudents ? (
                <span className="text-primary text-4xl">
                  {formatNumber(allStudents.length)}
                </span>
              ) : (
                <LoadingSpinner size="sm" />
              )}
              <span className="ml-4 text-4xl">Total Students</span>
            </div>
          </div>

          <div
            className={classnames(
              styles.admin_total_wrap,
              'shadow-mat text-foreground'
            )}
          >
            <div className={styles.admin_total_left}>
              {totalTimeSpent ? (
                <span className="text-primary text-4xl">
                  {totalTimeSpent} Hours
                </span>
              ) : (
                <LoadingSpinner size="sm" />
              )}
              <span className="ml-4 text-4xl">Total Time Spent</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};