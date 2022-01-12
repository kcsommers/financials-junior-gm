import { useAppSelector } from '@redux';

export const GameBlockBoard = () => {
  const seasonState = useAppSelector((state) => state.season);

  // const currentBlock = seasonState.gameBlocks[seasonState.currentBlockIndex];
  const completedGames = seasonState.completedGames;

  // const games = currentBlock
  //   ? [
  //       ...completedGames,
  //       ...currentBlock
  //         .slice(completedGames.length)
  //         .map((team) => ({ opponent: team.name, score: [0, 0] })),
  //     ]
  //   : [];
  const games: any[] = [...completedGames];

  const getFontSize = (teamName) => {
    if (!teamName) {
      return '1rem';
    }

    if (teamName.length >= 20) {
      return '0.85rem';
    }

    if (teamName.length >= 14) {
      return '0.95rem';
    }

    return '1rem';
  };

  const rows = games.map((g, i) =>
    i < 4 ? (
      <div key={`game-row-${i}`} className="game-block-board-row">
        <div className="game-block-board-teams-wrap">
          <div
            className={`game-block-board-left ${
              g.score[0] > g.score[1] ? ` color-primary font-bold` : ''
            }`}
          >
            <span
              style={{
                fontSize: getFontSize(`S.J. ${seasonState.seasonTeam.name}`),
              }}
            >
              S.J. {seasonState.seasonTeam.name}
            </span>

            <div className="game-block-board-score">
              <span
                className={`${
                  g.score[0] > g.score[1] ? ` color-primary font-bold` : ''
                }`}
              >
                {g.score[0]}
              </span>
              <span className="game-block-board-dash">-</span>
              <span
                className={`${
                  g.score[0] < g.score[1] ? ` color-primary font-bold` : ''
                }`}
              >
                {g.score[1]}
              </span>
            </div>
          </div>
          <div
            className={`game-block-board-right ${
              g.score[0] < g.score[1] ? ` color-primary font-bold` : ''
            }`}
          >
            <span style={{ fontSize: getFontSize(g.opponent) }}>
              {g.opponent}
            </span>
          </div>
        </div>
      </div>
    ) : null
  );

  return (
    <div className="game-block-board-wrap">
      <div className="game-block-board-wrap-inner">
        <div>{rows}</div>
      </div>
    </div>
  );
};
