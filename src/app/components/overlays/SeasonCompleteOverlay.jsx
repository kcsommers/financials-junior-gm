import { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getStanding } from '@data/season/season';
import { TrophySvg, OverlayBoard, Button } from '@components';
import { toggleOverlay } from '@redux/actions';

export const SeasonCompleteOverlay = ({ team, level, standings }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const standing = useMemo(() => getStanding(team, standings), []);

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
          Go to the trophy room to check out your awards!
        </p>
        <div style={{ marginTop: '2rem' }}>
          <Button
            text='See Trophies'
            onClick={() => {
              dispatch(toggleOverlay({ isOpen: false, template: null }));
              history.push('/trophies');
            }}
          />
        </div>
      </div>
    </OverlayBoard>
  );
};
