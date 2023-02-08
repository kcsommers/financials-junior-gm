import {
  GameProvider,
  useGame,
} from '@statrookie/core/src/game/context/game-context';
import Link from 'next/link';

const HomePage = () => {
  const { id } = useGame();

  console.log('game context id:::: ', id);

  return <Link href="/game/budget">HOME PAGE</Link>;
};

HomePage.getLayout = function getLayout(page: any) {
  return <GameProvider>{page}</GameProvider>;
};

export default HomePage;
