import { OverlayBoard } from '@components';
import lvl1Video from '../../../assets/videos/FINancials_Junior_GM_LVL_01.mp4';
import lvl2Video from '../../../assets/videos/FINancials_Junior_GM_LVL_02.mp4';
import lvl3Video from '../../../assets/videos/FINancials_Junior_GM_LVL_03.mp4';

const videos = {
  1: lvl1Video,
  2: lvl2Video,
  3: lvl3Video,
};

export const NewLevelOverlay = ({ completedLevel }) => {
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
          padding: '4rem 0rem',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            paddingBottom: '56.25%',
          }}
        >
          <video
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
            }}
            autoPlay
            loop
          >
            <source src={videos[completedLevel]} type="video/mp4"></source>
          </video>
        </div>
      </div>
    </OverlayBoard>
  );
};
