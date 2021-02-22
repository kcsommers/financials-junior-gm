import { useDispatch, batch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  setStudent,
  initializeSeason,
  setInitialPlayersState,
} from '@redux/actions';
import { OverlayBoard, Button } from '@components';
import { resetSeason } from '@data/season/season';

export const NextSeasonOverlay = ({ student }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const repeatSeason = () => {
    resetSeason(student.level, student)
      .then((updatedStudent) => {
        console.log('[repeatSeason] UPDATED STUDENT:::: ', updatedStudent);
        batch(() => {
          dispatch(setStudent(updatedStudent));
          dispatch(
            setInitialPlayersState(updatedStudent.players, updatedStudent)
          );
          dispatch(initializeSeason(updatedStudent));
        });

        history.push('/home');
      })
      .catch((err) => console.error(err));
  };

  const nextSeason = () => {
    resetSeason(student.level + 1, student)
      .then((updatedStudent) => {
        batch(() => {
          dispatch(setStudent(updatedStudent));
          dispatch(
            setInitialPlayersState(updatedStudent.players, updatedStudent)
          );
          dispatch(initializeSeason(updatedStudent));
        });

        history.push('/home');
      })
      .catch((err) => console.error(err));
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
          <Button
            text='Start Next Season'
            isDisabled={true}
            onClick={nextSeason}
          />
        </div>
      </div>
    </OverlayBoard>
  );
};
