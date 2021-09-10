import { useState } from 'react';
import { Button } from '@components';
import financialsLogo from '@images/financials-logo-big.svg';
import '@css/pages/ResetPasswordPage.css';
import { resetTeacherPassword } from '../../api-helper';

export const ForgotPasswordPage = ({ history }) => {
  const [email, setEmail] = useState('');

  const [error, setError] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const resetPassword = () => {
    setIsLoading(true);
    resetTeacherPassword({ email })
      .then((res) => {
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setError('Unexpected error sending email. Please try again');
      });
  };

  const validate = () => {
    if (!email) {
      setError('Email Required');
      return;
    }
    resetPassword();
  };

  return (
    <div className="forgot-password-page-container">
      <div>
        <img src={financialsLogo} alt="Financials Junior GM Program logo" />
      </div>
      <div className="forgot-password-form-wrap">
        <p className="form-title">
          Enter your email address to reset your password
        </p>
        <div className="forgot-password-form-inner">
          <div className="form-field">
            <p className="form-label">Email Address</p>
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
          <p className="error-text">{error}</p>
        </div>
      </div>
      <div className="submit-button-container">
        <div style={{ margin: '1rem 0' }}>
          <Button text="Submit" onClick={validate} isLoading={isLoading} />
        </div>
        <span
          onClick={() => history.push('/dashboard')}
          className="back-to-dashboard"
        >
          Back To Dashboard
        </span>
      </div>
    </div>
  );
};
