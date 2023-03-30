import { CoreAdminLogin } from '@statrookie/core/src/pages/admin/login';
import FinancialsLogo from '../../components/svg/financials-logo-big.svg';
import { API_BASE_URL } from '../../constants/api-base-url';

const AdminLogin = () => {
  return <CoreAdminLogin apiBaseUrl={API_BASE_URL} logo={<FinancialsLogo />} />;
};

export default AdminLogin;
