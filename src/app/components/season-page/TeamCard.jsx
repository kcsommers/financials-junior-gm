export const TeamCard = ({ team, standing }) => {
  return (
    <div
      style={{
        width: '100%',
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
          {team.logo ? (
            <img src={team.logo} alt={team.name + ' logo'} />
          ) : (
            <span
              style={{
                color: team.color,
                fontSize: '1.65rem',
                textAlign: 'center',
                fontWeight: 'bold',
                display: 'inline-block',
                padding: '0.25rem',
              }}
            >
              {team.name}
            </span>
          )}
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
