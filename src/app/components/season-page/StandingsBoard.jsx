import { useSelector } from 'react-redux';

export const StandingsBoard = () => {
  const standings = useSelector((state) => state.season.standings);

  console.log('STANDINGS:::: ', standings);

  return (
    <div className='standings-board-wrap'>
      <div className='standings-board-wrap-inner'></div>
    </div>
  );
};
