import { Indicator, PlayerCard } from '@components';
import '@css/components/season-page/Jumbotron.css';
import { startingLineupFull } from '@data/players/players-utils';
import { GamePhases } from '@data/season/season';
import { getStanding } from '@data/season/season-utils';
import gameOnBg from '@images/game-on-bg.png';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { TeamCard } from './TeamCard';

export const Jumbotron = ({
  gameState,
  seasonState,
  team,
  student,
  nextPhase,
}) => {
  const { opponent, score, phase } = gameState;
  const tutorialActive = useSelector((state) => state.tutorial.isActive);
  const animationStates = {
    stats: useSelector((state) => state.tutorial.season.stats),
    upcomingGames: useSelector((state) => state.tutorial.season.upcomingGames),
    jumboText: useSelector((state) => state.tutorial.season.jumbotext),
  };
  const seasonDisabled = !startingLineupFull(team);

  const nextOpponent =
    seasonState.allOpponents[seasonState.currentOpponentIndex];
  const upcomingGames = seasonState.allOpponents.slice(
    seasonState.currentOpponentIndex + 1,
    seasonState.currentOpponentIndex + 3
  );

  const gameHighlightVideoRef = useRef(null);

  const [gameHighlightVideoLoaded, setGameHighlightVideoLoaded] =
    useState(false);

  const statsView = (
    <motion.div
      className="jumbotron-stats-container"
      animate={animationStates.stats}
      transition={{
        default: {
          duration: 1,
        },
      }}
    >
      <div className="jumbotron-stats-inner">
        <div className="jumbotron-stat-wrap">
          Wins
          <div className="box-shadow jumbotron-stat-inner">
            {seasonState.seasonTeam.stats.wins}
          </div>
        </div>
        <div className="jumbotron-stat-wrap">
          Losses
          <div className="box-shadow jumbotron-stat-inner">
            {seasonState.seasonTeam.stats.losses}
          </div>
        </div>
        <div className="jumbotron-stat-wrap">
          Points
          <div className="box-shadow jumbotron-stat-inner">
            {seasonState.seasonTeam.stats.points}
          </div>
        </div>
      </div>
    </motion.div>
  );

  const sharksTransitionView = (
    <div className="transition-view-left">
      <TeamCard
        team={seasonState.seasonTeam}
        standing={getStanding(seasonState.seasonTeam, seasonState.standings)}
      />
      {statsView}
    </div>
  );

  const comingUpView = (
    <div className="jumbotron-coming-up-container">
      <div className="jumbotron-next-opponent-container">
        <h3>Next Opponent</h3>
        <motion.div
          className="jumbotron-next-opponent-card"
          animate={animationStates.upcomingGames}
          transition={{ default: { duration: 1 } }}
        >
          <div className="coming-up-opponent-row">
            {nextOpponent && (
              <>
                <div className="coming-up-opponent-name-wrap">
                  {nextOpponent.logo ? (
                    <span
                      className="coming-up-opponent-name"
                      style={{ color: nextOpponent.color }}
                    >
                      <img
                        src={nextOpponent.logo}
                        alt={nextOpponent.name + ' logo'}
                        style={{
                          display: 'inline-block',
                          width: '100%',
                        }}
                      />
                    </span>
                  ) : (
                    <span
                      style={{
                        color: nextOpponent.color,
                        fontSize: '1.2rem',
                        textAlign: 'left',
                        display: 'inline-block',
                        paddingRight: '0.5rem',
                      }}
                    >
                      {nextOpponent.name}
                    </span>
                  )}
                </div>
                <div className="opponent-indicator-wrap">
                  <Indicator
                    amount={nextOpponent.teamRank}
                    direction="left"
                    color={nextOpponent.color}
                  />
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
      <div className="jumbotron-upcoming-games-container">
        <h4>Upcoming Games</h4>
        <motion.div
          className="jumbotron-upcoming-games-card"
          animate={animationStates.upcomingGames}
          transition={{ default: { duration: 1 } }}
        >
          {upcomingGames.map((team, i) => (
            <div key={i} className="upcoming-games-row coming-up-opponent-row">
              {team && (
                <>
                  <div className="coming-up-opponent-name-wrap">
                    {team.logo ? (
                      <span
                        className="coming-up-opponent-name"
                        style={{ color: team.color }}
                      >
                        <img
                          src={team.logo}
                          alt={team.name + ' logo'}
                          style={{
                            display: 'inline-block',
                            width: '100%',
                          }}
                        />
                      </span>
                    ) : (
                      <span
                        style={{
                          color: team.color,
                          fontSize: '1.2rem',
                          textAlign: 'left',
                          display: 'inline-block',
                          paddingRight: '0.5rem',
                        }}
                      >
                        {team.name}
                      </span>
                    )}
                  </div>
                  <div className="opponent-indicator-wrap">
                    <Indicator
                      amount={team.teamRank}
                      direction="left"
                      color={team.color}
                    />
                  </div>
                </>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );

  const scoreView = (shouldAnimate) => (
    <>
      <div className="game-on-top">
        <div className="game-on-top-left">
          <div>
            <TeamCard
              team={seasonState.seasonTeam}
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
        <motion.div
          className="game-on-top-right"
          initial={{ transform: shouldAnimate ? 'scale(0.5)' : 'scale(1)' }}
          animate={{ transform: 'scale(1)' }}
          transition={{
            default: {
              type: 'tween',
              duration: 1,
            },
          }}
        >
          <TeamCard
            team={opponent}
            standing={getStanding(opponent, seasonState.standings)}
          />
        </motion.div>
      </div>
      <div className="game-on-bottom">
        <div className="jumbotron-score-container">
          <div className="jumbotron-score-title">Score</div>
          <div className="box-shadow jumbotron-score-wrap">{score[0]}</div>
          <div className="box-shadow jumbotron-score-wrap">{score[1]}</div>
        </div>
      </div>
    </>
  );

  const gameOnView = (_video) =>
    opponent && (
      <>
        <video
          key="game-on-video"
          className="jumbotron-video"
          autoPlay
          loop
          poster={gameOnBg}
          style={{
            display: gameHighlightVideoLoaded ? 'none' : 'block',
          }}
        >
          <source src={_video} type="video/mp4" />
        </video>
        {phase.phase === GamePhases.GAME_HIGHLIGHT && (
          <video
            key="game-over-video"
            className="jumbotron-video"
            autoPlay={true}
            poster={gameOnBg}
            ref={(el) => (gameHighlightVideoRef.current = el)}
            onLoadedData={() => {
              console.log('vid loaded', _video);
              setGameHighlightVideoLoaded(true);
              gameHighlightVideoRef.current.play();
            }}
            onEnded={() => {
              setGameHighlightVideoLoaded(false);
              nextPhase();
            }}
            style={{
              visibility: gameHighlightVideoLoaded ? 'visible' : 'hidden',
              opacity: gameHighlightVideoLoaded ? 1 : 0,
              transition: 'opacity 0.5s ease',
            }}
          >
            <source src={_video} type="video/mp4" />
          </video>
        )}
      </>
    );

  const transitionView = (
    <div className="transition-view-container">
      {sharksTransitionView}
      <div className="transition-view-right">{comingUpView}</div>
    </div>
  );

  const scenarioView = seasonState.currentScenario ? (
    <div className="transition-view-container">
      {sharksTransitionView}
      <div
        className="transition-view-right"
        style={{ transform: 'scale(0.94)', transformOrigin: 'top' }}
      >
        <motion.div
          initial={{ scale: 0.75 }}
          animate={{ scale: 1, position: 'relative', top: '-0.35rem' }}
          transition={{
            scale: {
              type: 'spring',
              stiffness: 500,
            },
          }}
        >
          <PlayerCard
            player={seasonState.currentScenario.player}
            size="medium"
          />
        </motion.div>
      </div>
    </div>
  ) : null;

  const gameOverView = (_video) => (
    <video
      key="game-over-video"
      className="jumbotron-video"
      autoPlay={true}
      poster={gameOnBg}
      ref={(el) => (gameHighlightVideoRef.current = el)}
      onEnded={nextPhase}
    >
      <source src={_video} type="video/mp4" />
    </video>
  );

  const getJumbotronView = () => {
    if (seasonState.currentScenario) {
      return scenarioView;
    }

    switch (phase.phase) {
      case GamePhases.READY:
      case GamePhases.TRANSITION: {
        return transitionView;
      }
      case GamePhases.UP_NEXT:
      case GamePhases.WARMING_UP: {
        return scoreView(true);
      }
      case GamePhases.GAME_ON: {
        return gameOnView(opponent.videos.gameOn);
      }
      case GamePhases.GAME_HIGHLIGHT: {
        const _gameOverVideos =
          opponent && opponent.videos && opponent.videos.gameOver;
        if (!_gameOverVideos) {
          nextPhase();
          return scoreView(false);
        }
        const _videoKey = score[0] >= score[1] ? 'win' : 'loss';
        return gameOverView(_gameOverVideos[_videoKey]);
      }
      case GamePhases.GAME_OVER: {
        return scoreView(false);
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
      : gameState.message || phase.messages[0];
  };

  const message = getMessage();
  return (
    <>
      <div className="jumbotron-wrap">
        <div className="jumbotron-border jumbotron-border-left"></div>
        <div className="jumbotron-main-section">{getJumbotronView()}</div>
        <div className="jumbotron-border jumbotron-border-right"></div>
      </div>
      {tutorialActive ? (
        <motion.h2
          className={`jumbotron-message box-shadow ${
            message
              ? message
                  .toLowerCase()
                  .replace('1st', 'first')
                  .replace('2nd', 'second')
                  .replace('3rd', 'third')
                  .replace(/\s/g, '-')
              : ''
          }`}
          style={{ fontSize: getFontSize(message) }}
          animate={animationStates.jumboText}
          transition={{
            default: {
              duration: 1,
            },
          }}
        >
          {message}
        </motion.h2>
      ) : (
        <h2
          className={`jumbotron-message box-shadow ${
            message
              ? message
                  .toLowerCase()
                  .replace('1st', 'first')
                  .replace('2nd', 'second')
                  .replace('3rd', 'third')
                  .replace(/\s/g, '-')
              : ''
          }`}
          style={{ fontSize: getFontSize(message) }}
        >
          {message}
        </h2>
      )}
    </>
  );
};
