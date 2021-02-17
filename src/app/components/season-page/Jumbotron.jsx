import { TeamCard } from './TeamCard';
import jrSharksLogo from '@images/icons/jr-sharks-logo-white-bg.svg';
import { GamePhases } from '@data/season/season';
import { Indicator } from '@components';
import '@css/components/season-page/Jumbotron.css';

export const Jumbotron = ({
  gameBlockState,
  student,
  seasonState,
  currentOpponentIndex,
}) => {
  const { currentOppenent, currentScore, currentPhase } = gameBlockState;

  const nextOpponent = seasonState.allTeams[currentOpponentIndex + 1];
  const upcomingGames = seasonState.allTeams.slice(
    currentOpponentIndex + 2,
    currentOpponentIndex + 4
  );

  const scoreView = (
    <div className='jumbotron-score-container'>
      <div className='jumbotron-score-title'>Score</div>
      <div className='box-shadow jumbotron-score-wrap'>{currentScore[0]}</div>
      <div className='box-shadow jumbotron-score-wrap'>{currentScore[1]}</div>
    </div>
  );

  const statsView = (
    <div className='jumbotron-stats-container'>
      <div className='jumbotron-stats-title'>Stats</div>
      <div className='jumbotron-stats-inner'>
        <div className='jumbotron-stat-wrap'>
          Wins
          <div className='box-shadow jumbotron-stat-inner'>
            {currentScore[0]}
          </div>
        </div>
        <div className='jumbotron-stat-wrap'>
          Losses
          <div className='box-shadow jumbotron-stat-inner'>
            {currentScore[0]}
          </div>
        </div>
        <div className='jumbotron-stat-wrap'>
          Points
          <div className='box-shadow jumbotron-stat-inner'>
            {currentScore[0]}
          </div>
        </div>
      </div>
    </div>
  );

  const comingUpView = (
    <div className='jumbotron-coming-up-container'>
      <div className='jumbotron-next-opponent-container'>
        <h3>Next Opponent</h3>
        <div className='jumbotron-next-opponent-card'>
          <div className='coming-up-opponent-row'>
            <div className='coming-up-opponent-name-wrap'>
              <span className='coming-up-opponent-name'>
                {nextOpponent.name}
              </span>
            </div>
            <div className='opponent-indicator-wrap'>
              <Indicator
                amount={nextOpponent.teamRank}
                direction='left'
                color={nextOpponent.color}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='jumbotron-upcoming-games-container'>
        <h4>Upcoming Games</h4>
        <div className='jumbotron-upcoming-games-card'>
          {upcomingGames.map((team, i) => (
            <div key={i} className='upcoming-games-row coming-up-opponent-row'>
              <div className='coming-up-opponent-name-wrap'>
                <span className='coming-up-opponent-name'>{team.name}</span>
              </div>
              <div className='opponent-indicator-wrap'>
                <Indicator
                  amount={team.teamRank}
                  direction='left'
                  color={team.color}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const gameOnView = (
    <>
      <div className='game-on-top'>
        <div className='game-on-top-left'>
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
            color: '#fff',
          }}
        >
          VS
        </span>
        <div className='game-on-top-right'>
          <TeamCard logo={currentOppenent.logoLg} rank={currentOppenent.rank} />
        </div>
      </div>
      <div className='game-on-bottom'>{scoreView}</div>
    </>
  );

  const transitionView = (
    <div className='transition-view-container'>
      <div className='transition-view-left'>
        <TeamCard logo={jrSharksLogo} rank={student.teamRank} />
        {statsView}
      </div>
      <div className='transition-view-right'>{comingUpView}</div>
    </div>
  );

  const getJumbotronView = () => {
    switch (currentPhase.phase) {
      case GamePhases.READY:
      case GamePhases.TRANSITION: {
        return transitionView;
      }
      case GamePhases.UP_NEXT:
      case GamePhases.WARMING_UP:
      case GamePhases.GAME_ON:
      case GamePhases.GAME_OVER: {
        return gameOnView;
      }
      default: {
        return null;
      }
    }
  };

  return (
    <>
      <div className='jumbotron-wrap'>
        <div className='jumbotron-border jumbotron-border-left'></div>
        <div className='jumbotron-main-section'>{getJumbotronView()}</div>
        <div className='jumbotron-border jumbotron-border-right'></div>
      </div>
      <h2 className='jumbotron-message box-shadow'>{gameBlockState.message}</h2>
    </>
  );
};
