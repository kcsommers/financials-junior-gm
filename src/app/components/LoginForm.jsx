import { useState } from 'react';
import { Button } from '@components';
import '@css/pages/Login.css';

export const LoginForm = ({
  onLogin,
  isLoggingIn,
  loginError,
  history,
  userField = 'Username',
}) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState('');

  const validateLogin = () => {
    if (!userName || !password) {
      setValidationError('Username and Password required');
      return;
    }

    onLogin(userName, password);
  };

  return (
    <>
      <div className='login-form-container'>
        <div className='login-form-field'>
          <p className='login-form-label'>{userField}</p>
          <input
            onChange={(e) => setUserName(e.target.value)}
            autoComplete='off'
            className='login-form-ip'
            type='text'
            placeholder={userField}
            name='username'
            maxLength='100'
          />
        </div>
        <div className='login-form-field'>
          <p className='login-form-label'>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            autoComplete='off'
            className='login-form-ip'
            type='password'
            placeholder='Password'
            name='password'
            maxLength='100'
          />
        </div>
        <p className='login-error-text'>{loginError || validationError}</p>
      </div>

      <div className='login-button-container'>
        <div style={{ margin: '1rem 0' }}>
          <Button
            onClick={validateLogin}
            isLoading={isLoggingIn}
            text='Log In'
          />
        </div>
        <span
          onClick={() => history.push('/dashboard')}
          className='login-back-to-dashboard'
        >
          Back To Dashboard
        </span>
      </div>
    </>
  );
};
