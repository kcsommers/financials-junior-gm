import { TeamCard } from './TeamCard';
import jrSharksLogo from '@images/icons/jr-sharks-logo-white-bg.svg';
import { GamePhases, getStanding } from '@data/season/season';
import { TeamAssignments, getAvailableSlots } from '@data/players/players';
import { Indicator, PlayerCard } from '@components';
import { motion } from 'framer-motion';
import '@css/components/season-page/Jumbotron.css';

export const Jumbotron = ({
  gameBlockState,
  seasonState,
  currentOpponentIndex,
  team,
}) => {
  const { currentOpponent, currentScore, currentPhase } = gameBlockState;

  const seasonDisabled =
    getAvailableSlots(
      [
        ...TeamAssignments.offense,
        ...TeamAssignments.defense,
        ...TeamAssignments.goalie,
      ],
      team
    ) > 0;

  // if its the first game, the next opponent is the current opponent
  const nextIndex =
    (currentOpponentIndex === 0
      ? currentOpponentIndex
      : currentOpponentIndex + 1) +
    seasonState.currentBlockIndex * 4;

  const nextOpponent = seasonState.allTeams[nextIndex];
  const upcomingGames = seasonState.allTeams.slice(
    nextIndex + 1,
    nextIndex + 3
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
            {seasonState.seasonTeam.stats.wins}
          </div>
        </div>
        <div className='jumbotron-stat-wrap'>
          Losses
          <div className='box-shadow jumbotron-stat-inner'>
            {seasonState.seasonTeam.stats.losses}
          </div>
        </div>
        <div className='jumbotron-stat-wrap'>
          Points
          <div className='box-shadow jumbotron-stat-inner'>
            {seasonState.seasonTeam.stats.points}
          </div>
        </div>
      </div>
    </div>
  );

  const sharksTransitionView = (
    <div className='transition-view-left'>
      <TeamCard
        logo={jrSharksLogo}
        standing={getStanding(seasonState.seasonTeam, seasonState.standings)}
      />
      {statsView}
    </div>
  );

  const comingUpView = (
    <div className='jumbotron-coming-up-container'>
      <div className='jumbotron-next-opponent-container'>
        <h3>Next Opponent</h3>
        <div className='jumbotron-next-opponent-card'>
          <div className='coming-up-opponent-row'>
            {nextOpponent && (
              <>
                <div className='coming-up-opponent-name-wrap'>
                  <span
                    className='coming-up-opponent-name'
                    style={{ color: nextOpponent.color }}
                  >
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
              </>
            )}
          </div>
        </div>
      </div>
      <div className='jumbotron-upcoming-games-container'>
        <h4>Upcoming Games</h4>
        <div className='jumbotron-upcoming-games-card'>
          {upcomingGames.map((team, i) => (
            <div key={i} className='upcoming-games-row coming-up-opponent-row'>
              {team && (
                <>
                  <div className='coming-up-opponent-name-wrap'>
                    <span
                      className='coming-up-opponent-name'
                      style={{ color: team.color }}
                    >
                      {team.name}
                    </span>
                  </div>
                  <div className='opponent-indicator-wrap'>
                    <Indicator
                      amount={team.teamRank}
                      direction='left'
                      color={team.color}
                    />
                  </div>
                </>
              )}
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
          <div>
            <TeamCard
              logo={jrSharksLogo}
              standing={getStanding(
                seasonState.seasonTeam,
                seasonState.standings
              )}
            />
          </div>
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
          <motion.div
            initial={{ transform: 'scale(0.5)' }}
            animate={{ transform: 'scale(1)' }}
            transition={{
              default: {
                type: 'tween',
                duration: 1,
              },
            }}
          >
            <TeamCard
              logo={currentOpponent.logoLg}
              standing={getStanding(currentOpponent, seasonState.standings)}
            />
          </motion.div>
        </div>
      </div>
      <div className='game-on-bottom'>{scoreView}</div>
    </>
  );

  const transitionView = (
    <div className='transition-view-container'>
      {sharksTransitionView}
      <div className='transition-view-right'>{comingUpView}</div>
    </div>
  );

  const scenarioView = seasonState.currentScenario ? (
    <div className='transition-view-container'>
      {sharksTransitionView}
      <div className='transition-view-right'>
        <motion.div
          initial={{ scale: 0.75 }}
          animate={{ scale: 1, position: 'relative', top: '-1rem' }}
          transition={{
            scale: {
              type: 'spring',
              stiffness: 500,
            },
          }}
        >
          <PlayerCard
            player={seasonState.currentScenario.player}
            size='medium'
          />
        </motion.div>
      </div>
    </div>
  ) : null;

  const getJumbotronView = () => {
    if (seasonState.currentScenario) {
      return scenarioView;
    }

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

  const getFontSize = (str) => {
    if (str && str.length > 30) {
      return '1.75rem';
    }

    return '2.25rem';
  };

  const getMessage = () => {
    if (seasonDisabled && !seasonState.currentScenario) {
      return 'Fill up your team to play the season!';
    }
    return seasonState.currentScenario
      ? seasonState.currentScenario.message
      : gameBlockState.message;
  };

  const message = getMessage();
  return (
    <>
      <div className='jumbotron-wrap'>
        <div className='jumbotron-border jumbotron-border-left'></div>
        <div className='jumbotron-main-section'>{getJumbotronView()}</div>
        <div className='jumbotron-border jumbotron-border-right'></div>
      </div>
      <h2
        className='jumbotron-message box-shadow'
        style={{ fontSize: getFontSize(message) }}
      >
        {message}
      </h2>
    </>
  );
};
