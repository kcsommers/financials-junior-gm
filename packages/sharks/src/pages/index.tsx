import { CoreDashboardPage } from '@statrookie/core/src/pages/dashboard';
import FinancialsLogo from '../components/svg/financials-logo-big.svg';

const DashboardPage = () => {
  return <CoreDashboardPage logo={<FinancialsLogo />} />;
};

export default DashboardPage;
