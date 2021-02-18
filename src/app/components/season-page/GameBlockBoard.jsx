import { useSelector } from 'react-redux';

export const GameBlockBoard = () => {
  const seasonState = useSelector((state) => state.season);

  const currentBlock = seasonState.gameBlocks[seasonState.currentBlockIndex];
  const completedGames = seasonState.completedGames;

  const games = currentBlock
    ? [
        ...completedGames,
        ...currentBlock
          .slice(completedGames.length)
          .map((team) => ({ opponent: team.name, score: [0, 0] })),
      ]
    : [];

  const rows = games.map((g, i) => (
    <div key={`game-row-${i}`} className='game-block-board-row'>
      <div
        className={`game-block-board-left ${
          g.score[0] > g.score[1] ? ` color-primary font-bold` : ''
        }`}
      >
        <span>Jr. Sharks</span>
        <span>{g.score[0]}</span>
      </div>

      <span className='game-block-board-dash'></span>

      <div
        className={`game-block-board-right ${
          g.score[0] < g.score[1] ? ` color-primary font-bold` : ''
        }`}
      >
        <span>{g.opponent}</span>
        <span>{g.score[1]}</span>
      </div>
    </div>
  ));

  return (
    <div className='game-block-board-wrap'>
      <div className='game-block-board-wrap-inner'>{rows}</div>
    </div>
  );
};
