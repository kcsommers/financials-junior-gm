import { OverlayBoard, PlayerCard, TeamBudgetState } from '@components';
import notepad from '@images/icons/notepaper-pen.svg';

export const PlayerChangeSuccessOverlay = ({ player, message }) => {
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
          padding: '4rem 0',
        }}
      >
        <h2
          className='color-primary'
          style={{ marginBottom: '2rem', fontSize: '3rem' }}
        >
          {message}
        </h2>
        <div
          style={{
            display: 'flex',
            flex: 1,
            width: '100%',
            padding: '0 2rem',
          }}
        >
          <div
            style={{
              flex: 1,
              display: 'flex',
              paddingTop: '1.5rem',
              justifyContent: 'center',
            }}
          >
            <TeamBudgetState isLarge={true} />
          </div>
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div style={{ flex: 1 }}>
              <PlayerCard size='medium' player={player} />
            </div>
            <img
              src={notepad}
              alt='Notepad'
              style={{
                display: 'inline-block',
                width: '150px',
                marginTop: '2rem',
              }}
            />
          </div>
        </div>
      </div>
    </OverlayBoard>
  );
};
