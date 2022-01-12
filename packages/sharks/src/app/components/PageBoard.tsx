const styles = (height): any => ({
  container: {
    flex: 1,
    position: 'relative',
  },
  board: {
    width: '88%',
    height: height || '100%',
    margin: '0 auto',
    backgroundColor: '#e5e5e5',
    borderRadius: '7px',
    position: 'relative',
    border: '4px solid #707070',
  },
});

export const PageBoard = ({ children, height }: any) => {
  return (
    <div style={styles(height).container}>
      <div style={styles(height).board}>{children}</div>
    </div>
  );
};
