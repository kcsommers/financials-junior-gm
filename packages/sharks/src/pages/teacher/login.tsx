import { CoreTeacherLogin } from '@statrookie/core/src/pages/teacher/login';
import FinancialsLogo from '../../components/svg/financials-logo-big.svg';
import { API_BASE_URL } from '../../constants/api-base-url';

const TeacherLogin = () => {
  return (
    <CoreTeacherLogin apiBaseUrl={API_BASE_URL} logo={<FinancialsLogo />} />
  );
};

export default TeacherLogin;
