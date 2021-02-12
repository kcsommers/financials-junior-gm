export const OverlayBoard = ({ children }) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          flex: 1,
          maxWidth: '90%',
          height: '90%',
          backgroundColor: '#fff',
          borderRadius: '5px',
          padding: '0 3rem',
          boxShadow:
            '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
        }}
      >
        {children}
      </div>
    </div>
  );
};
