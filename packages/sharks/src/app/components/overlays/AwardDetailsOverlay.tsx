import { OverlayBoard } from '@components';
import trophyIcon from '@images/icons/trophy.svg';

export const AwardDetailsOverlay = ({ award }) => {
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
        <h2 className='color-accent' style={{ marginBottom: '2rem' }}>
          {award.name}
        </h2>
        <div
          className='season-complete-trophy-wrap'
          style={{ height: '200px', marginBottom: '2rem' }}
        >
          <span
            style={{
              display: 'inline-block',
              transform: 'scale(1.5)',
              transformOrigin: 'top center',
            }}
          >
            <img src={trophyIcon} alt='Trophy' />
          </span>
        </div>
        <p
          className='color-primary'
          style={{ fontSize: '1.75rem', width: '70%', margin: '0 auto' }}
        >
          {award.description}
        </p>
      </div>
    </OverlayBoard>
  );
};
