import { OverlayBoard, Button } from '@components';
import { resetSeason } from '@data/season/season-utils';
import { useDispatch } from 'react-redux';
import { setInTransition } from '@redux/season/season.actions';

export const NextSeasonOverlay = ({ student, next }) => {
  const dispatch = useDispatch();

  const repeatSeason = () => {
    dispatch(setInTransition(false));
    resetSeason(+student.level, +student.level, student)
      .then((updatedStudent) => {
        next({ updatedStudent, isPromoted: false });
      })
      .catch((err) => console.error(err));
  };

  const nextSeason = () => {
    dispatch(setInTransition(false));
    resetSeason(+student.level + 1, +student.level, student)
      .then((updatedStudent) => {
        next({ updatedStudent, isPromoted: true });
      })
      .catch((err) => console.error(err));
  };

  const isPromoted =
    student.awards &&
    student.awards[+student.level - 1] &&
    student.awards[+student.level - 1].thirdCup &&
    student.awards[+student.level - 1].savingsCup;

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
        <p
          style={{
            textAlign: 'center',
            fontSize: '2.25rem',
            fontWeight: 'bold',
            color: '#006d75',
            position: 'relative',
            transform: 'translateY(50%)',
            padding: '0 3.5rem',
            lineHeight: '3.5rem',
          }}
        >
          Your season is complete! What would you like to do next?
        </p>
        <div
          style={{
            marginTop: '7rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            width: '100%',
          }}
        >
          <Button text='Repeat Season' onClick={repeatSeason} />
          {isPromoted && (
            <Button
              text='Accept Promotion'
              isDisabled={+student.level === 3}
              onClick={nextSeason}
            />
          )}
        </div>
      </div>
    </OverlayBoard>
  );
};
