import { useEffect, useState } from 'react';
import { Button } from '@components';
import financialsLogo from '@images/financials-logo-big.svg';
import { updateTeacherPassword } from '../../api-helper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';
import '@css/pages/ResetPasswordPage.css';
import statrookieLogo from '@images/statrookie-logo.png';

export const ResetPasswordPage = ({ history, match }) => {
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [resetToken, setResetToken] = useState('');

  const [passwordVerify, setPasswordVerify] = useState('');

  const [error, setError] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [resetSuccessMsg, setResetSuccessMsg] = useState('');

  const [resetErrorMsg, setResetErrorMsg] = useState('');

  useEffect(() => {
    const _token = match.params.token;
    if (!_token) {
      return;
    }
    setResetToken(_token);
  }, []);

  const resetPassword = () => {
    setIsLoading(true);
    updateTeacherPassword({
      email,
      password,
      resetToken,
    })
      .then((res) => {
        setIsLoading(false);
        if (res.success) {
          setResetSuccessMsg(res.message);
          setResetErrorMsg('');
        } else {
          setResetErrorMsg(res.message);
          setResetSuccessMsg('');
        }
      })
      .catch(() => {
        setIsLoading(false);
        setError('Unexpected error resetting password. Please try again');
      });
  };

  const validate = () => {
    if (!email || !password || !passwordVerify) {
      setError('Please enter email and new password');
      return;
    }
    if (password !== passwordVerify) {
      setError('Passwords do not match');
      return;
    }
    resetPassword();
  };

  const successTemplate = (
    <div className="forgot-password-form-wrap">
      <div className="icon-wrap">
        <FontAwesomeIcon icon={faCheckCircle} size="2x" color={'#00788a'} />
      </div>
      <p className="form-title">{resetSuccessMsg}</p>
      <div className="try-again-wrap">
        <span onClick={() => history.push('/login/teacher')}>Login</span>
      </div>
    </div>
  );

  const errorTemplate = (
    <div className="error-wrap">
      <div className="forgot-password-form-wrap">
        <div className="icon-wrap">
          <FontAwesomeIcon icon={faExclamationCircle} size="2x" color={'red'} />
        </div>
        <p className="form-title">{resetErrorMsg}</p>
        <div className="try-again-wrap">
          <span
            onClick={() => {
              setResetErrorMsg('');
              setResetSuccessMsg('');
            }}
          >
            Try Again
          </span>
        </div>
      </div>
    </div>
  );

  const formTemplate = (
    <>
      <div className="forgot-password-form-wrap">
        <p className="form-title">Please enter your new password</p>
        <div className="forgot-password-form-inner">
          <div className="form-field">
            <input
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              className="form-ip"
              type="text"
              placeholder="Email Address"
              name="username"
              maxLength="100"
            />
          </div>
          <div className="form-field">
            <input
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
              className="form-ip"
              type="password"
              placeholder="New Password"
              name="password"
              maxLength="100"
            />
          </div>
          <div className="form-field">
            <input
              onChange={(e) => setPasswordVerify(e.target.value)}
              autoComplete="off"
              className="form-ip"
              type="password"
              placeholder="Verify Password"
              name="passwordVerfiy"
              maxLength="100"
            />
          </div>
          <p className="error-text">{error}</p>
        </div>
      </div>
      <div className="submit-button-container">
        <div style={{ margin: '1rem 0' }}>
          <Button text="Submit" onClick={validate} isLoading={isLoading} />
        </div>
      </div>
    </>
  );

  return (
    <div className="forgot-password-page-container">
      <div style={{ margin: '-2rem 0 -3rem 0' }}>
        <img src={financialsLogo} alt="Financials Junior GM Program logo" />
      </div>
      {!resetSuccessMsg && !resetErrorMsg && formTemplate}
      {resetSuccessMsg && successTemplate}
      {resetErrorMsg && errorTemplate}
      <div>
        <span
          onClick={() => history.push('/dashboard')}
          className="back-to-dashboard"
        >
          Back To Dashboard
        </span>
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
