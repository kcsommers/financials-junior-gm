import {
  GameProvider,
  useGame,
} from '@statrookie/core/src/game/context/game-context';
import Link from 'next/link';

const BudgetPage = () => {
  const { id } = useGame();

  console.log('game context id:::: ', id);

  return <Link href="/game/home">BUDGET PAGE</Link>;
};

BudgetPage.getLayout = function getLayout(page: any) {
  return <GameProvider>{page}</GameProvider>;
};

export default BudgetPage;
