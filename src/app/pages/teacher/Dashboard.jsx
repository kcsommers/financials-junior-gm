import { Link, useHistory } from 'react-router-dom';
import financialsLogo from '@images/financials-logo-big.svg';
import { Button } from '@components';
import statrookieLogo from '@images/statrookie-logo.png';

export const Dashboard = () => {
  const history = useHistory();
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
        <img src={financialsLogo} alt="Financials Junior GM Program logo" />
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
              history.push('/login/student');
            }}
          />
        </div>
        <div style={{ margin: '2rem 0' }}>
          <Button
            text="Teachers"
            background="#002f6c"
            onClick={() => {
              history.push('/login/teacher');
            }}
          />
        </div>
        <div>
          <Button
            text="Registration"
            background="#070707"
            onClick={() => {
              history.push('/register/teacher');
            }}
          />
        </div>
        <Link
          style={{
            fontSize: '1.1rem',
            marginTop: '2rem',
            color: '#00788A',
          }}
          to="/admin/login"
        >
          Admin Login
        </Link>
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          display: 'flex',
          alignItems: 'baseline',
        }}
      >
        <span
          style={{
            fontSize: '0.8rem',
            transform: 'translate(10px, -100%)',
            opacity: 0.75,
          }}
        >
          designed by
        </span>
        <img
          style={{
            width: '100px',
          }}
          src={statrookieLogo}
          alt="Stat Rookie"
        />
      </div>
    </div>
  );
};
