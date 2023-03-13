import classNames from 'classnames';
import Link from 'next/link';
import { useState } from 'react';
import { UserRoles } from '../../auth/users/user-roles';
import { Button } from '../Button';
import styles from './LoginForm.module.scss';

export const LoginForm = ({ onLogin, isLoggingIn, loginError, userRole }) => {
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

  const userField =
    userRole === UserRoles.TEACHER ? 'Username or Email' : 'Username';

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="bg-neutral-200 p-16 w-1/2 mx-auto rounded-lg relative">
        <div className={styles.login_form_field}>
          <p className={classNames(styles.login_form_label, 'text-center')}>
            {userField}
          </p>
          <input
            onChange={(e) => setUserName(e.target.value)}
            autoComplete="off"
            className={classNames(
              styles.login_form_ip,
              'rounded-md focus:outline focus:outline-2 outline-primary',
              'bg-white w-full px-4'
            )}
            type="text"
            placeholder={userField}
            name="username"
            maxLength={100}
          />
        </div>
        <div className={styles.login_form_field}>
          <p className={classNames(styles.login_form_label, 'text-center')}>
            Password
          </p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
            className={classNames(
              styles.login_form_ip,
              'rounded-md focus:outline focus:outline-2 outline-primary',
              'bg-white w-full px-4'
            )}
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

      <div className={classNames(styles.login_button_container, 'text-center')}>
        <div className="my-4">
          <Button
            onClick={validateLogin}
            isLoading={isLoggingIn}
            text="Log In"
          />
        </div>
        <Link href="/" className="text-lg text-primary">
          Back To Dashboard
        </Link>
        {userRole === UserRoles.TEACHER && (
          <div>
            <Link href="/teacher/forgot-password" className="text-primary mt-2">
              Forgot Password
            </Link>
          </div>
        )}
      </div>
    </form>
  );
};
