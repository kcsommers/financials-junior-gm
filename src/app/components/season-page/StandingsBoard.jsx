import { useSelector } from 'react-redux';

export const StandingsBoard = () => {
  const { standings, seasonTeam } = useSelector((state) => state.season);

  console.log('STANDINGS:::: ', standings);

  const rows = standings.slice(0, 5).map((team, i) => (
    <div key={i} className='standings-board-row'>
      <span
        className={`${
          team.name === seasonTeam.name ? 'color-primary font-bold' : ''
        }`}
      >
        {i + 1}. {team.name}
      </span>
      <span
        className={`${
          team.name === seasonTeam.name ? 'color-primary font-bold' : ''
        }`}
      >
        {team.stats.points}
      </span>
    </div>
  ));

  return (
    <div className='standings-board-wrap'>
      <div className='standings-board-wrap-inner'>
        <div className='standings-board-top-row standings-board-row'>
          <span>Team</span>
          <span>Points</span>
        </div>
        {rows}
      </div>
    </div>
  );
};
