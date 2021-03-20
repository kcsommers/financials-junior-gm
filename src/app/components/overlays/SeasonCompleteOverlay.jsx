import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { getStanding } from '@data/season/season';
import { TrophySvg, OverlayBoard, Button } from '@components';
import { toggleOverlay } from '@redux/actions';

export const SeasonCompleteOverlay = ({ team, standings }) => {
  const dispatch = useDispatch();
  const standing = useMemo(() => getStanding(team, standings), [
    team,
    standings,
  ]);

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
        <h2 className='color-primary' style={{ marginBottom: '2rem' }}>
          Great Job! You came in <br />
          <span className='color-accent'>{standing} place</span>
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
            <TrophySvg isEarned={true} />
          </span>
        </div>
        <p className='color-primary' style={{ fontSize: '1.75rem' }}>
          Check out your awards in the trophy room!
        </p>
        <div
          style={{
            marginTop: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            width: '100%',
          }}
        >
          <Button
            text='See Trophies'
            onClick={() => {
              dispatch(toggleOverlay({ isOpen: false, template: null }));
            }}
          />
        </div>
      </div>
    </OverlayBoard>
  );
};
