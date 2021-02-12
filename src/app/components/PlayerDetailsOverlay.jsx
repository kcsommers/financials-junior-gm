import { useDispatch } from 'react-redux';
import { ReleasePlayer } from './public-api';
import { toggleOverlay } from '../redux/actions';
import { FindTradePlayer } from './trade-overlay/FindTradePlayer';
import { PlayerCard, OverlayBoard } from '@components';

export const PlayerDetailsOverlay = ({ player }) => {
  const dispatch = useDispatch();

  const handleTrade = () => {
    dispatch(
      toggleOverlay({
        isOpen: true,
        template: <FindTradePlayer />,
      })
    );
  };

  const handleRelease = () => {
    dispatch(
      toggleOverlay({
        isOpen: true,
        template: <ReleasePlayer />,
      })
    );
  };

  return (
    <OverlayBoard>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          textAlign: 'center',
        }}
      >
        <div className='player-details-player-wrap'>
          <PlayerCard player={player} isLarge={true} />
        </div>
        <div className='player-overlay-buttons-wrap'>
          <button
            onClick={handleTrade}
            className='player-overlay-button outline-black box-shadow'
          >
            Trade
          </button>
          <button
            onClick={handleRelease}
            className='player-overlay-button outline-black box-shadow'
          >
            Release
          </button>
        </div>
      </div>
    </OverlayBoard>
  );
};
