import { useDispatch, useSelector, batch } from 'react-redux';
import { ReactSVG } from 'react-svg';
import jrSharksLogo from '@images/icons/jr-sharks-logo.svg';
import {
  PageBoard,
  HeaderComponent,
  TrophySvg,
  AwardDetailsOverlay,
  Overlay,
} from '@components';
import trophiesStick from '@images/trophies-stick.svg';
import { awardsByLevel } from '@data/season/awards';
import {
  toggleOverlay,
  setStudent,
  setSeasonComplete,
  setInitialPlayersState,
} from '@redux/actions';
import { updateStudentById, initPlayersByLevel } from './../api-helper';
import { cloneDeep } from 'lodash';
import { useHistory } from 'react-router-dom';

const styles = {
  levelLabel: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#f3901d',
    width: '200px',
    height: '40px',
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    cursor: 'pointer',
  },
  actionContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '50%',
    margin: '0 auto',
    alignItems: 'center',
    marginBottom: '0.25rem',
  },
};

export const TrophiesPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const student = useSelector((state) => state.studentState.student);
  const { awards, inTransition } = useSelector((state) => state.season);

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
            });

            history.push('/home');
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  };

  const rows = {
    1: [],
    2: [],
    3: [],
  };

  const openDetailsOverlay = (selectedCup) => {
    dispatch(
      toggleOverlay({
        isOpen: true,
        template: <AwardDetailsOverlay award={selectedCup} />,
      })
    );
  };

  [1, 2, 3].forEach((level) => {
    const levelAwards = awardsByLevel[level];
    const cupKeys = Object.keys(levelAwards);
    const studentAwards = awards[level - 1];

    cupKeys.forEach((c) => {
      rows[level].push(
        <div
          key={`${level}_${levelAwards[c].name}`}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          onClick={openDetailsOverlay.bind(this, levelAwards[c])}
        >
          <TrophySvg isEarned={studentAwards && studentAwards[c]} />
        </div>
      );
    });
  });

  const levels = [rows[3], rows[2], rows[1]].map((level, i) => {
    return (
      <div
        key={`level-${i}`}
        className='trophies-row'
        style={{
          display: 'flex',
          alignItems: 'center',
          flex: 1,
          borderBottom: '15px solid #4E3629',
          backgroundColor:
            student && student.level >= 3 - i
              ? '#fff'
              : 'rgba(255, 255, 255, 0.25)',
        }}
      >
        <div
          className='trophies-wrap'
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            bottom: '-15px',
          }}
        >
          {level}
        </div>
      </div>
    );
  });

  return (
    <div className='page-container'>
      <HeaderComponent
        stickBtn={trophiesStick}
        objectives={['1. See your awards!']}
        level={student.level}
        inverse={true}
      />

      <PageBoard hideCloseBtn={true} includeBackButton={true}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <div
            className='trophies-page-board-header'
            style={{
              position: 'relative',
              textAlign: 'center',
              height: '80px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              className='trophies-page-board-header-inner'
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                paddingLeft: '1rem',
              }}
            >
              <ReactSVG src={jrSharksLogo} />
            </div>
            {inTransition && (
              <div
                style={styles.actionContainer}
                className='next-level-actions-container'
              >
                <span
                  className='box-shadow'
                  style={styles.button}
                  onClick={repeatSeason}
                >
                  Repeat Season
                </span>
                <span className='box-shadow disabled' style={styles.button}>
                  Start Next Season
                </span>
              </div>
            )}
            <h6
              style={inTransition ? { position: 'relative', top: '1rem' } : {}}
              className='color-primary'
            >
              Tap a trophy to learn more about it!
            </h6>
          </div>

          <div
            className='trophies-page-board-inner'
            style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'column',
              paddingBottom: '2rem',
            }}
          >
            <div
              className='trophy-case'
              style={{
                flex: 1,
                margin: '1rem auto',
                width: '80%',
                borderRadius: '10px',
                border: '5px solid #4E3629',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}
            >
              <div
                className='level-lables'
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  width: '100px',
                  display: 'flex',
                  flexDirection: 'column',
                  transform: 'translateX(-100%)',
                }}
              >
                <p style={styles.levelLabel}>Level 3</p>
                <p style={styles.levelLabel}>Level 2</p>
                <p style={styles.levelLabel}>Level 1</p>
              </div>
              {levels}
            </div>
          </div>
        </div>
      </PageBoard>
      <Overlay />
    </div>
  );
};
