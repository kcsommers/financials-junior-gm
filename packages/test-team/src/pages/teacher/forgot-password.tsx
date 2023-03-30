import { CoreForgotPasswordPage } from '@statrookie/core/src/pages/teacher/forgot-password';
import FinancialsLogo from '../../components/svg/financials-logo-big.svg';
import { API_BASE_URL } from '../../constants/api-base-url';

const ForgotPasswordPage = () => {
  return (
    <CoreForgotPasswordPage
      apiBaseUrl={API_BASE_URL}
      logo={<FinancialsLogo />}
    />
  );
};

export default ForgotPasswordPage;
