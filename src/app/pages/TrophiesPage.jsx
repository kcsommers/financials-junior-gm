import { ReactSVG } from 'react-svg';
import jrSharksLogo from '@images/icons/jr-sharks-logo.svg';
import {
  PageBoard,
  HeaderComponent,
  LoadingSpinner,
  TrophySvg,
} from '@components';
import { useSelector } from 'react-redux';
import trophiesStick from '@images/trophies-stick.svg';

const styles = {
  levelLabel: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  },
};

const TrophiesPage = () => {
  const student = useSelector((state) => state.studentState.student);

  const levelOne = [0, 1, 2, 3].map((t, i) => (
    <div
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <TrophySvg key={`1-${i}`} isEarned={false} />
    </div>
  ));
  const levelTwo = [0, 1, 2, 3].map((t, i) => (
    <div
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <TrophySvg key={`2-${i}`} isEarned={false} />
    </div>
  ));
  const levelThree = [0, 1, 2, 3].map((t, i) => (
    <div
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <TrophySvg key={`3-${i}`} isEarned={false} />
    </div>
  ));

  const levels = [levelOne, levelTwo, levelThree].map((level, i) => {
    return (
      <div
        key={`level-${i}`}
        className='trophies-row'
        style={{
          display: 'flex',
          alignItems: 'center',
          flex: 1,
          borderBottom: '15px solid #4E3629',
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

  return student ? (
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
            style={{ position: 'relative', textAlign: 'center' }}
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
            {/* {<h2 className='color-primary'>San Jose Jr Sharks</h2>} */}
            <br></br>
            <h6 className='color-primary'>Tap a trophy to learn more about it!</h6>
          </div>

          <div
            className='trophies-page-board-inner'
            style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'column',
              padding: '2rem 0',
            }}
          >
            <div
              className='trophy-case'
              style={{
                flex: 1,
                backgroundColor: '#fff',
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
    </div>
  ) : (
    <div
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <LoadingSpinner />
    </div>
  );
};

export default TrophiesPage;
