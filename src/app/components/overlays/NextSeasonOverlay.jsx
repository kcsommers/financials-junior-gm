import { useDispatch, batch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  toggleOverlay,
  setStudent,
  setSeasonComplete,
  setInitialPlayersState,
} from '@redux/actions';
import { initPlayersByLevel, updateStudentById } from '../../api-helper';
import { PlayerCard, OverlayBoard, Button } from '@components';
import { cloneDeep } from 'lodash';

export const NextSeasonOverlay = ({ student, awards }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const initPlayers = (student) => {
    initPlayersByLevel(student.level)
      .then((initializedStudentRes) => {
        const initializedStudent = initializedStudentRes.data;
        if (!initializedStudentRes.success || !initializedStudent) {
          console.error(new Error('Unexpected error initializing players'));
          return;
        }

        batch(() => {
          dispatch(setSeasonComplete(student));
          dispatch(setStudent(initializedStudent));
          dispatch(
            setInitialPlayersState(
              initializedStudent.players,
              initializedStudent
            )
          );
          dispatch(
            toggleOverlay({
              isOpen: false,
              template: null,
            })
          );
        });

        history.push('/home');
      })
      .catch((err) => console.error(err));
  };

  const repeatSeason = () => {
    const clonedSeasons = cloneDeep(student.seasons);
    clonedSeasons[(student.level || 1) - 1] = [];
    updateStudentById(student._id, { seasons: clonedSeasons, awards })
      .then((res) => {
        if (!res.success || !res.updatedStudent) {
          console.error(new Error('Unexpected error updating student season'));
          return;
        }
        dispatch(setSeasonComplete(res.updatedStudent));

        initPlayers();
      })
      .catch((err) => console.error(err));
  };

  const nextSeason = () => {};

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
        <div
          style={{
            marginTop: '3rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            width: '100%',
          }}
        >
          <Button text='Repeat Season' onClick={repeatSeason} />
          <Button text='Start Next Season disabled' onClick={nextSeason} />
        </div>
      </div>
    </OverlayBoard>
  );
};
