import { ProtectedRoute } from '@statrookie/core/src/components/ProtectedRoute';
import { GameProvider, useGame } from '@statrookie/core/src/game/game-context';
import Link from 'next/link';
import { API_BASE_URL } from '../../constants/api-base-url';

const BudgetPage = () => {
  return <Link href="/game/home">BUDGET PAGE</Link>;
};

const ProtectedBudgetPage = () => {
  return (
    <ProtectedRoute apiBaseUrl={API_BASE_URL} permittedRoles="*">
      <BudgetPage />
    </ProtectedRoute>
  );
};

ProtectedBudgetPage.getLayout = function getLayout(page: any) {
  return <GameProvider>{page}</GameProvider>;
};

export default ProtectedBudgetPage;
