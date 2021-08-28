import financialsLogo from '@images/financials-logo-big.svg';
import { LoginForm } from '@components';
import { UserRoles } from '@data/auth/auth';
import '@css/pages/Login.css';

export const ForgotPasswordPage = ({ history }) => {
  return (
    <div className="login-page-container">
      <div>
        <img src={financialsLogo} alt="Financials Junior GM Program logo" />
      </div>
    </div>
  );
};
