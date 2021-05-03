export const OverlayBoard = ({ children,position="relative",top='0%'   }) => {
  return (
    <div
      style={{
        height: position==='absolute' ? '50%' : '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position:position,
        top: position==='absolute' ? '50%' : 0,
        left: position==='absolute' ? '50%' : 0,
        transform:position==='absolute' ? 'translate(-50%,-50%)' : "none",
        zIndex: 1000
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
