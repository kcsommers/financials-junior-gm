import { TeamCard } from './TeamCard';
import jrSharksLogo from '@images/icons/jr-sharks-logo-white-bg.svg';

const styles = {
  container: {
    display: 'flex',
    height: '324.19px',
    position: 'relative',
    width: '464px',
    zIndex: 0,
  },
  main: {
    background: '#707070',
    textAlign: 'center',
    height: '100%',
    flex: 1,
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  borderLeft: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: '-35px',
    backgroundColor: '#ababab',
    transform: 'skewX(10deg)',
  },
  borderRight: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    right: '-35px',
    backgroundColor: '#ababab',
    transform: 'skewX(-10deg)',
  },
  message: {
    width: '550px',
    minHeight: '70px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '10px',
    fontSize: '2.25rem',
    backgroundColor: '#00788a',
    color: '#fff',
  },
  mainTop: {
    display: 'flex',
    padding: '1rem',
    position: 'relative',
    flex: 1,
  },
  mainTopLeft: {
    flex: 1,
  },
  mainTopRight: {
    flex: 1,
  },
  mainBottom: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 3rem',
  },
  scoreContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'space-between',
  },
  scoreTitle: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    fontSize: '2rem',
    textAlign: 'center',
    color: '#121210',
  },
  scoreWrap: {
    width: '125px',
    height: '100px',
    borderRadius: '10px',
    backgroundColor: '#fff',
    fontSize: '3rem',
    color: '#121210',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export const Jumbotron = ({ gameBlockState, student, seasonState }) => {
  const { currentOppenent, currentScore } = gameBlockState;

  const scoreView = (
    <div style={styles.scoreContainer}>
      <div style={styles.scoreTitle}>Score</div>
      <div style={styles.scoreWrap}>{currentScore[0]}</div>
      <div style={styles.scoreWrap}>{currentScore[1]}</div>
    </div>
  );

  return (
    <>
      <div style={styles.container}>
        <div style={styles.borderLeft}></div>
        <div style={styles.main}>
          <div style={styles.mainTop}>
            <div style={styles.mainTopLeft}>
              <TeamCard logo={jrSharksLogo} rank={student.teamRank} />
            </div>
            <span
              style={{
                fontSize: '1rem',
                position: 'absolute',
                left: 0,
                display: 'block',
                top: '50%',
                transform: 'translate(-50% -50%)',
                textAlign: 'center',
                width: '100%',
              }}
            >
              VS
            </span>
            <div style={styles.mainTopLeftRight}>
              <TeamCard
                logo={currentOppenent.logoLg}
                rank={currentOppenent.rank}
              />
            </div>
          </div>

          <div style={styles.mainBottom}>{scoreView}</div>
        </div>
        <div style={styles.borderRight}></div>
      </div>
      <h2 className='jumbotron-message' style={styles.message}>
        {gameBlockState.message}
      </h2>
    </>
  );
};
