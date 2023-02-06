import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { UserRoles } from '../../auth/users/user-roles';
import { Button } from '../Button';
import styles from './LoginForm.module.scss';

export const LoginForm = ({ onLogin, isLoggingIn, loginError, userRole }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState('');
  const router = useRouter();

  const validateLogin = () => {
    if (!userName || !password) {
      setValidationError('Username and Password required');
      return;
    }

    onLogin(userName, password);
  };

  const userField =
    userRole === UserRoles.TEACHER ? 'Username or Email' : 'Username';

  return (
    <>
      <div className={styles.login_form_container}>
        <div className={styles.login_form_field}>
          <p className={styles.login_form_label}>{userField}</p>
          <input
            onChange={(e) => setUserName(e.target.value)}
            autoComplete="off"
            className={styles.login_form_ip}
            type="text"
            placeholder={userField}
            name="username"
            maxLength={100}
          />
        </div>
        <div className={styles.login_form_field}>
          <p className={styles.login_form_label}>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
            className={styles.login_form_ip}
            type="password"
            placeholder="Password"
            name="password"
            maxLength={100}
          />
        </div>
        <p className={styles.login_error_text}>
          {loginError || validationError}
        </p>
      </div>

      <div className={styles.login_button_container}>
        <div style={{ margin: '1rem 0' }}>
          <Button
            onClick={validateLogin}
            isLoading={isLoggingIn}
            text="Log In"
          />
        </div>
        <Link href="/" className={styles.login_back_to_dashboard}>
          Back To Dashboard
        </Link>
        {userRole === UserRoles.TEACHER && (
          <Link
            href="/forgot-password"
            className={styles.login_forgot_password}
          >
            Forgot Password
          </Link>
        )}
      </div>
    </>
  );
};
