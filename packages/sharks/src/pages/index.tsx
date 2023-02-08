import { Button } from '@statrookie/core/src/components/Button';
import Link from 'next/link';
import { useRouter } from 'next/router';
import FinancialsLogo from '../components/svg/financials-logo-big.svg';

const DashboardPage = () => {
  const router = useRouter();

  return (
    <div
      className="dashboard-container"
      style={{
        textAlign: 'center',
        position: 'relative',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <div className="m-auto inline-block">
        <FinancialsLogo />
      </div>

      <div className="dash-btn-list flex-1 w-full flex flex-col items-center justify-center">
        <div>
          <Link href="/student/login">
            <Button text="Student" />
          </Link>
        </div>
        <div className="my-8">
          <Link href="/teacher/login">
            <Button text="Teachers" background="#002f6c" />
          </Link>
        </div>
        <div>
          <Link href="/teacher/registration">
            <Button text="Registration" background="#070707" />
          </Link>
        </div>
        <Link
          style={{
            fontSize: '1.1rem',
            marginTop: '2rem',
            color: '#00788A',
          }}
          href="/admin/login"
        >
          Admin Login
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;
