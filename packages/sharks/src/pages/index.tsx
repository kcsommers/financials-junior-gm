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
          <Button
            text="Student"
            onClick={() => {
              router.push('/login/student');
            }}
          />
        </div>
        <div style={{ margin: '2rem 0' }}>
          <Button
            text="Teachers"
            background="#002f6c"
            onClick={() => {
              router.push('/login/teacher');
            }}
          />
        </div>
        <div>
          <Button
            text="Registration"
            background="#070707"
            onClick={() => {
              router.push('/register/teacher');
            }}
          />
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
