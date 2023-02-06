import financialsLogo from '@images/financials-logo-big.svg';
import { Button } from '@statrookie/core/src/components/Button';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default () => {
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
      <div style={{ width: '100%' }}>
        {/* <img src={financialsLogo} alt="Financials Junior GM Program logo" /> */}
      </div>

      <div
        className="dash-btn-list"
        style={{
          flex: 1,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
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
