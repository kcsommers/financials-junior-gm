import { OverlayBoard } from '@components';

export const NewLevelOverlay = ({ team }) => {
  return (
    <OverlayBoard>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'flex-start',
          flexDirection: 'column',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            textAlign: 'center',
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#006d75',
            position: 'relative',
            transform: '',
            marginTop: '3.5rem',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: '0 3rem',
            lineHeight: '3.5rem',
          }}
        >
          Congratulations! You've been promoted!
        </p>
        <p
          style={{
            textAlign: 'center',
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#006d75',
            position: 'relative',
            transform: '',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '1.5rem',
            padding: '0 3rem',
            lineHeight: '3.5rem',
          }}
        >
          You are now the General Manager of the
        </p>
        <p
          style={{
            textAlign: 'center',
            fontSize: '2.75rem',
            fontWeight: '900',
            color: '#006d75',
            textShadow: '1px 1px #000000',
            position: 'relative',
            marginTop: '1.5rem',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: '0 3rem',
            lineHeight: '3.5rem',
          }}
        >
          {team.nameFull}
        </p>
        <br></br>
        <br></br>
        <img
          src={team.logo}
          alt={team.name + ' logo'}
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '212px',
          }}
        />
        <br></br>
        <p
          style={{
            textAlign: 'center',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#006d75',
            position: 'relative',
            transform: '',
            marginTop: '1.5rem',
            marginRight: 'auto',
            marginLeft: 'auto',
            padding: '0 3rem',
            lineHeight: '3.5rem',
          }}
        >
          You now have a larger budget and higher ranked players to sign!
        </p>
        {team.name == 'Barracuda' && (
          <p
            style={{
              textAlign: 'center',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#006d75',
              position: 'relative',
              transform: '',
              marginRight: 'auto',
              marginLeft: 'auto',
              marginTop: 'rem',
              padding: '0 3rem',
              lineHeight: '3.5rem',
            }}
          >
            Remember to try and save between $20-30 of your total budget!
          </p>
        )}
        {team.name == 'Sharks' && (
          <p
            style={{
              textAlign: 'center',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#006d75',
              position: 'relative',
              transform: '',
              marginRight: 'auto',
              marginLeft: 'auto',
              marginTop: 'rem',
              padding: '0 3rem',
              lineHeight: '3.5rem',
            }}
          >
            Remember to try and save between $200-300 of your total budget!
          </p>
        )}
      </div>
    </OverlayBoard>
  );
};
