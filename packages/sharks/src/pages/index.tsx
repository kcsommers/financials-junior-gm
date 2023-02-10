import { Button } from '@statrookie/core/src/components/Button';
import Link from 'next/link';
import FinancialsLogo from '../components/svg/financials-logo-big.svg';

const DashboardPage = () => {
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
      <div className="m-auto inline-block py-4">
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
            <Button text="Teachers" bgColorClass="bg-foreground" />
          </Link>
        </div>
        <div>
          <Link href="/teacher/registration">
            <Button text="Registration" bgColorClass="bg-neutral-900" />
          </Link>
        </div>
        <Link className="text-primary text-lg mt-8" href="/admin/login">
          Admin Login
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;
