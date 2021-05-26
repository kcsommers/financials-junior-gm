import { useDispatch, useSelector } from 'react-redux';
import {
  PageBoard,
  HeaderComponent,
  AwardDetailsOverlay,
  Overlay,
  FooterComponent,
} from '@components';
import trophyIcon from '@images/icons/trophy.svg';
import { awardsByLevel } from '@data/season/awards';
import { toggleOverlay } from '@redux/actions';
import { resetSeason } from '@data/season/season-utils';

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
};

export const TrophiesPage = ({ history }) => {
  const dispatch = useDispatch();
  const student = useSelector((state) => state.studentState.student);
  const tutorialActive = useSelector((state) => state.tutorial.isActive);
  const { inTransition, awards, seasonTeam } = useSelector(
    (state) => state.season
  );

  const repeatSeason = () => {
    resetSeason(+student.level, +student.level, student)
      .then((updatedStudent) => {
        history.push({
          pathname: '/home',
          state: { levelChange: { updatedStudent, isPromoted: false } },
        });
      })
      .catch((err) => console.error(err));
  };

  const nextSeason = () => {
    resetSeason(Math.min(+student.level + 1, 3), +student.level, student)
      .then((updatedStudent) => {
        history.push({
          pathname: '/home',
          state: { levelChange: { updatedStudent, isPromoted: true } },
        });
      })
      .catch((err) => console.error(err));
  };

  const finishGame = () => {
    resetSeason(+student.level, +student.level, student, true)
      .then((updatedStudent) => {
        history.push({
          pathname: '/home',
          state: { gameFinished: { updatedStudent } },
        });
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
    const studentAwards = awards[level - 1] && awards[level - 1];

    cupKeys.forEach((c) => {
      rows[level].push(
        <div
          key={`${level}_${levelAwards[c].name}`}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.25rem 0 0 0',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              opacity: studentAwards && studentAwards[c] ? 1 : 0.5,
              cursor: 'pointer',
            }}
            onClick={openDetailsOverlay.bind(this, levelAwards[c])}
          >
            <img
              style={{
                display: 'inline-block',
                width: '100%',
              }}
              src={trophyIcon}
              alt="Trophy"
            />
          </span>
        </div>
      );
    });
  });

  const levels = [rows[3], rows[2], rows[1]].map((level, i) => {
    return (
      <div
        key={`level-${i}`}
        className="trophies-row"
        style={{
          display: 'flex',
          alignItems: 'center',
          flex: 1,
          borderBottom: '15px solid #4E3629',
          backgroundColor:
            student && +student.level >= 3 - i
              ? '#fff'
              : 'rgba(255, 255, 255, 0.25)',
        }}
      >
        <div
          className="trophies-wrap"
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            bottom: '-10px',
          }}
        >
          {level}
        </div>
      </div>
    );
  });

  const isPromoted =
    inTransition &&
    awards &&
    awards[+student.level - 1] &&
    awards[+student.level - 1].thirdCup &&
    awards[+student.level - 1].savingsCup;

  return (
    <div className="page-container">
      <HeaderComponent
        stickBtn="trophies"
        level={+student.level}
        inverse={true}
        tutorialActive={tutorialActive}
        inTransition={inTransition}
      />

      <PageBoard>
        <div
          className="trophies-page-board-header"
          style={{
            position: 'relative',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80px',
          }}
        >
          <div
            className="trophies-page-board-header-inner"
            style={{
              position: 'absolute',
              left: 0,
              top: '0.5rem',
              paddingLeft: '1rem',
            }}
          >
            <img
              src={seasonTeam.logo}
              alt={seasonTeam.name + 'Logo'}
              style={{
                display: 'inline-block',
                width: '85px',
              }}
            />
          </div>
          {inTransition ? (
            <>
              <span
                className="box-shadow"
                style={styles.button}
                onClick={repeatSeason}
              >
                Repeat Season
              </span>
              {isPromoted && (
                <span
                  className="box-shadow"
                  style={Object.assign(
                    { ...styles.button },
                    { marginLeft: '1rem' }
                  )}
                  onClick={+student.level === 3 ? finishGame : nextSeason}
                >
                  {+student.level === 3 ? 'Accept Award' : 'Accept Promotion'}
                </span>
              )}
            </>
          ) : (
            <h6
              style={inTransition ? { position: 'relative', top: '1rem' } : {}}
              className="color-primary"
            >
              Tap a trophy to learn more about it!
            </h6>
          )}
        </div>

        <div
          className="trophies-page-board-inner"
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
          }}
        >
          <div
            className="trophy-case"
            style={{
              flex: 1,
              margin: '0 auto',
              width: '80%',
              borderRadius: '10px',
              border: '5px solid #4E3629',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
            }}
          >
            <div
              className="level-lables"
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
      </PageBoard>
      <FooterComponent
        links={['team', 'season', 'budget']}
        history={history}
        inTransition={inTransition}
        tutorialActive={tutorialActive}
        student={student}
      />
      <Overlay />
    </div>
  );
};
