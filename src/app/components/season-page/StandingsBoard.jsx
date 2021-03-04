import { useSelector } from 'react-redux';
import { cloneDeep } from 'lodash';

export const StandingsBoard = () => {
  const { standings, seasonTeam } = useSelector((state) => state.season);

  const clonedStandings = cloneDeep(standings);
  const studentTeamIndex = clonedStandings.findIndex(
    (t) => t.name === seasonTeam.name
  );

  // make sure student team is always visible on the board
  if (studentTeamIndex > 4) {
    clonedStandings.splice(4, 0, seasonTeam);
  }

  const rows = clonedStandings.slice(0, 5).map((team, i) => (
    <div key={i} className='standings-board-row'>
      <span
        className={`${
          team.name === seasonTeam.name ? 'color-primary font-bold' : ''
        }`}
      >
        {team.name === seasonTeam.name ? studentTeamIndex + 1 : i + 1}.{' '}
        {team.name}
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
