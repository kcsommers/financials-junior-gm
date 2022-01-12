import { useState } from 'react';
import { Button } from '@components';
import financialsLogo from '@images/financials-logo-big.svg';
import '@css/pages/ResetPasswordPage.css';
import { resetTeacherPassword } from '../../api-helper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';

export const ForgotPasswordPage = ({ history }) => {
  const [email, setEmail] = useState('');

  const [error, setError] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [emailSuccessMsg, setEmailSuccessMsg] = useState('');

  const [emailErrorMsg, setEmailErrorMsg] = useState('');

  const resetPassword = () => {
    setIsLoading(true);
    resetTeacherPassword({ email })
      .then((res) => {
        setIsLoading(false);
        if (res.success) {
          setEmailSuccessMsg(res.message);
          setEmailErrorMsg('');
        } else {
          setEmailErrorMsg(res.message);
          setEmailSuccessMsg('');
        }
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

  const successTemplate = (
    <div className="forgot-password-form-wrap">
      <div className="icon-wrap">
        <FontAwesomeIcon icon={faCheckCircle} size="2x" color={'#00788a'} />
      </div>
      <p className="form-title">{emailSuccessMsg}</p>
    </div>
  );
  const errorTemplate = (
    <div className="error-wrap">
      <div className="forgot-password-form-wrap">
        <div className="icon-wrap">
          <FontAwesomeIcon icon={faExclamationCircle} size="2x" color={'red'} />
        </div>
        <p className="form-title">{emailErrorMsg}</p>
        <div className="try-again-wrap">
          <span
            onClick={() => {
              setEmailErrorMsg('');
              setEmailSuccessMsg('');
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
              maxLength={100}
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
      <div>
        <img src={financialsLogo} alt="Financials Junior GM Program logo" />
      </div>
      {!emailSuccessMsg && !emailErrorMsg && formTemplate}
      {emailSuccessMsg && successTemplate}
      {emailErrorMsg && errorTemplate}
      <div>
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
