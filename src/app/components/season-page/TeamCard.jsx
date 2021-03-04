export const TeamCard = ({ team, standing }) => {
  return (
    <div
      style={{
        width: '200px',
        height: '167px',
        borderRadius: '10px',
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      {team && (
        <>
          <img src={team.logo} alt={team.name + ' logo'} />
          <span
            style={{
              position: 'absolute',
              top: 0,
              right: '1rem',
              fontSize: '1.5rem',
              color: team.color,
            }}
          >
            {standing}
          </span>
        </>
      )}
    </div>
  );
};
