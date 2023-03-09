import { CoreStudentLogin } from '@statrookie/core/src/pages/student/login';
import FinancialsLogo from '../../components/svg/financials-logo-big.svg';
import { API_BASE_URL } from '../../constants/api-base-url';

const StudentLogin = () => {
  return (
    <CoreStudentLogin apiBaseUrl={API_BASE_URL} logo={<FinancialsLogo />} />
  );
};

export default StudentLogin;
