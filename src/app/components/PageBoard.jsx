import closeBtn from '@images/icons/cancel.svg';
import { ReactSVG } from 'react-svg';
import { Link } from 'react-router-dom';
import { BackButton } from '@components';

const styles = {
  container: {
    flex: 1,
    position: 'relative',
  },
  board: {
    width: '88%',
    height: '97%',
    margin: '0 auto',
    backgroundColor: '#e5e5e5',
    borderRadius: '7px',
    position: 'relative',
    border: '4px solid #707070',
  },
  closeBtnLeft: {
    position: 'absolute',
    top: '0.35rem',
    left: '1rem',
    zIndex: 1,
    transition: 'all 0.3s ease',
  },
  closeBtnRight: {
    position: 'absolute',
    top: '0.35rem',
    right: '1rem',
    zIndex: 1,
    transition: 'all 0.3s ease',
  },
};

export const PageBoard = ({
  closeBtnLeft,
  children,
  hideCloseBtn,
  includeBackButton,
}) => {
  return (
    <div style={styles.container}>
      <div
        style={{
          display: 'inline-block',
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translate(0px, -50%)',
        }}
      >
        {includeBackButton && <BackButton />}
      </div>
      <div style={styles.board}>
        {!hideCloseBtn && (
          <Link
            to='/home'
            style={closeBtnLeft ? styles.closeBtnLeft : styles.closeBtnRight}
          >
            <ReactSVG src={closeBtn} />
          </Link>
        )}
        {children}
      </div>
    </div>
  );
};
