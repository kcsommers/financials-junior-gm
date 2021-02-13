import { useDispatch } from 'react-redux';
import { toggleOverlay } from '@redux/actions';
import {
  PlayerCard,
  OverlayBoard,
  ReleasePlayer,
  // FindTradePlayer,
} from '@components';
import '@css/components/team-page/PlayerDetailsOverlay.css';

export const PlayerDetailsOverlay = ({ player }) => {
  const dispatch = useDispatch();

  const handleTrade = () => {
    // dispatch(
    //   toggleOverlay({
    //     isOpen: true,
    //     template: <FindTradePlayer />,
    //   })
    // );
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
          <div
            className={`box-shadow player-overlay-btn`}
            onClick={handleTrade}
          >
            <div className='player-overlay-btn-inner'>
              <span className='outline-black'>Trade</span>
            </div>
          </div>
          <div
            className={`box-shadow player-overlay-btn`}
            onClick={handleRelease}
          >
            <div className='player-overlay-btn-inner'>
              <span className='outline-black'>Release</span>
            </div>
          </div>
        </div>
      </div>
    </OverlayBoard>
  );
};
