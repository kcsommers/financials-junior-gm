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

export const PageBoard = ({ children }) => {
  return (
    <div style={styles.container}>
      <div style={styles.board}>{children}</div>
    </div>
  );
};
