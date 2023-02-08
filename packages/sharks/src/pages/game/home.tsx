import { ProtectedRoute } from '@statrookie/core/src/components/ProtectedRoute';
import {
  GameProvider,
  useGame,
} from '@statrookie/core/src/game/context/game-context';
import Link from 'next/link';
import { API_BASE_URL } from '../../constants/api-base-url';

const HomePage = () => {
  const { id } = useGame();

  console.log('game context id:::: ', id);

  return <Link href="/game/budget">HOME PAGE</Link>;
};

const ProtectedHomePage = () => {
  return (
    <ProtectedRoute apiBaseUrl={API_BASE_URL} permittedRoles="*">
      <HomePage />
    </ProtectedRoute>
  );
};

ProtectedHomePage.getLayout = function getLayout(page: any) {
  return <GameProvider>{page}</GameProvider>;
};

export default ProtectedHomePage;
