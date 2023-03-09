import { CoreResetPasswordPage } from '@statrookie/core/src/pages/teacher/reset-password';
import FinancialsLogo from '../../components/svg/financials-logo-big.svg';
import { API_BASE_URL } from '../../constants/api-base-url';

const ForgotPasswordPage = () => {
  return (
    <CoreResetPasswordPage
      apiBaseUrl={API_BASE_URL}
      logo={<FinancialsLogo />}
    />
  );
};

export default ForgotPasswordPage;
