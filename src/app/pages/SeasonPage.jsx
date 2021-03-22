import { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import {
  HeaderComponent,
  PageBoard,
  Jumbotron,
  LevelStick,
  StandingsBoard,
  GameButton,
  Overlay,
  SeasonCompleteOverlay,
  NextSeasonOverlay,
  FaqOverlay,
} from '@components';
import seasonStick from '@images/season-stick.svg';
import { GamePhases } from '@data/season/season';
import {
  getGameResult,
  getGamePhases,
  getNewScenario,
} from '@data/season/season-utils';
import { cloneDeep } from 'lodash';
import { updateStudentById } from './../api-helper';
import {
  throwScenario,
  injurePlayer,
  setStudent,
  gameEnded,
  setTutorialState,
  toggleOverlay,
  setSeasonComplete,
  addObjective,
  INJURE_PLAYER,
  setSeasonActive,
} from '@redux/actions';
import {
  seasonSlides,
  SharkieButton,
  Tutorial,
  getConfirmSlides,
} from '@tutorial';
import { Objective, Objectives } from '@data/objectives/objectives';
import { faqs } from '@data/faqs/faqs';
import { getMaxTeamRank } from '@data/players/players-utils';
import '@css/pages/SeasonPage.css';

const allActions = {
  [INJURE_PLAYER]: injurePlayer,
};

let timer = 0;

export const SeasonPage = ({ history }) => {
  const dispatch = useDispatch();

  const student = useSelector((state) => state.studentState.student);
  const { teamPlayers, teamRank } = useSelector((state) => state.players);

  const tutorialActive = useSelector((state) => state.tutorial.isActive);
  const [tutorialSlides, setTutorialSlides] = useState([seasonSlides]);
  const animationStates = {
    standings: useSelector((state) => state.tutorial.season.standings),
    playButton: useSelector((state) => state.tutorial.season.playButton),
    studentRank: useSelector((state) => state.tutorial.season.studentRank),
  };

  const gamePhases = getGamePhases(+student.level);
  const seasonState = useSelector((state) => state.season);
  const [localGameState, setLocalGameState] = useState({
    currentPhaseIndex: 0,
    currentMessageIndex: 0,
    results: seasonState.completedGames[seasonState.currentOpponentIndex],
  });
  const gameState = {
    opponent: seasonState.allOpponents[seasonState.currentOpponentIndex],
    phase: gamePhases[localGameState.currentPhaseIndex],
    score: localGameState.results ? localGameState.results.score : [0, 0],
    message:
      gamePhases[localGameState.currentPhaseIndex].messages[
        localGameState.currentMessageIndex
      ],
  };

  const setTimer = () => {
    if (timer) {
      window.clearTimeout(timer);
    }

    if (!seasonState.currentScenario && gameState.phase) {
      // if the current phase contains more than one message
      // set the message timer and call next message
      if (gameState.phase.messages.length > 1 && gameState.phase.messageTimer) {
        timer = window.setTimeout(nextMessage, gameState.phase.messageTimer);
      } else if (gameState.phase.timer) {
        // otherwise timer will move on to next phase
        timer = window.setTimeout(nextPhase, gameState.phase.timer);
      }
    }
  };

  const endSeason = () => {
    const clonedStudent = cloneDeep(student);

    // get the students standing
    const studentTeamIndex = seasonState.standings.findIndex(
      (t) => t.name === seasonState.seasonTeam.name
    );

    // update student awards
    const prevAwards = (clonedStudent.awards || [])[+clonedStudent.level - 1];
    const newAwards = {
      savingsCup:
        (prevAwards && prevAwards.savingsCup) || student.savingsBudget > 0,
      thirdCup: (prevAwards && prevAwards.thirdCup) || studentTeamIndex < 3,
      firstCup: (prevAwards && prevAwards.firstCup) || studentTeamIndex === 0,
    };
    (clonedStudent.awards || []).splice(+clonedStudent.level - 1, 1, newAwards);

    // set completed games in student seasons array
    clonedStudent.seasons[+student.level - 1] = seasonState.completedGames;

    updateStudentById(student._id, {
      seasons: clonedStudent.seasons,
      awards: clonedStudent.awards,
      rollOverBudget: (+student.rollOverBudget || 0) + +student.savingsBudget,
      savingsBudget: 0,
    })
      .then((res) => {
        batch(() => {
          dispatch(setStudent(res.updateStudent));
          dispatch(setSeasonComplete(res.updatedStudent));
          dispatch(
            toggleOverlay({
              isOpen: true,
              template: (
                <SeasonCompleteOverlay
                  standings={seasonState.standings}
                  level={+res.updatedStudent.level}
                  team={seasonState.seasonTeam}
                  student={res.updatedStudent}
                />
              ),
              canClose: false,
            })
          );
        });

        history.push('/trophies');
      })
      .catch((err) => console.error(err));
  };

  const newScenario = (scenarioIndex) => {
    // get the next scenario
    const currentScenario = getNewScenario(
      +student.level,
      scenarioIndex,
      teamPlayers
    );
    if (!currentScenario) {
      return;
    }

    const scenarioPlayer = currentScenario.getPlayer();
    const prevAssignment = currentScenario.getPlayerPrevAssignment();
    const playersCopy = cloneDeep(student.players);

    // splice the scenario player into the players array
    playersCopy.splice(
      playersCopy.findIndex((p) => p._id === scenarioPlayer._id),
      1,
      scenarioPlayer
    );

    // update student with new players array and player assignment
    updateStudentById(student._id, {
      [prevAssignment]: null,
      players: playersCopy,
    })
      .then((res) => {
        batch(() => {
          dispatch(
            allActions[currentScenario.action](
              scenarioPlayer,
              prevAssignment,
              student
            )
          );
          dispatch(setStudent(res.updatedStudent));
          dispatch(throwScenario(currentScenario));
          dispatch(
            addObjective(
              new Objective(
                currentScenario.objective,
                Objectives.SEASON_SCENARIO,
                true
              )
            )
          );
        });
      })
      .catch((err) => console.error(err));
  };

  const startGame = () => {
    // check if this is the first game of the season
    // if so set seasonActive to true
    if (
      !student.seasons ||
      !student.seasons[+student.level] ||
      !student.seasons[+student.level].length
    ) {
      dispatch(setSeasonActive(true));
    }
    // set current phase to 1
    setLocalGameState({
      ...localGameState,
      currentPhaseIndex: 1,
    });
  };

  const endGame = () => {
    const nextOpponentIndex = seasonState.currentOpponentIndex + 1;

    // add the game results to student season
    // and update student
    const clonedSeasons = cloneDeep(student.seasons || []);
    if (!clonedSeasons[+student.level - 1]) {
      clonedSeasons[+student.level - 1] = [];
    }
    clonedSeasons[+student.level - 1].push(localGameState.results);

    const studentUpdates = {
      seasons: clonedSeasons,
    };

    // throw scenario every 4 games
    // (setting objective to false indicates the scenario is incomplete)
    if (
      nextOpponentIndex % 4 === 0 &&
      nextOpponentIndex < seasonState.allOpponents.length
    ) {
      studentUpdates.objectives = {
        ...student.objectives,
        [Objectives.SEASON_SCENARIO]: false,
      };
    }

    updateStudentById(student._id, studentUpdates)
      .then((res) => {
        batch(() => {
          // set game results in redux store
          dispatch(
            gameEnded(
              localGameState.results,
              gameState.opponent,
              nextOpponentIndex
            )
          );

          dispatch(setStudent(res.updatedStudent));
        });

        // end of season when all teams are played
        if (nextOpponentIndex === seasonState.allOpponents.length) {
          endSeason();
          return;
        }

        // update local state
        setLocalGameState({
          ...localGameState,
          currentMessageIndex: 0,
          currentPhaseIndex: 0,
        });

        if (
          res.updatedStudent.objectives &&
          res.updatedStudent.objectives[Objectives.SEASON_SCENARIO] === false
        ) {
          newScenario(nextOpponentIndex / 4 - 1);
        }
      })
      .catch((err) => console.error(err));
  };

  const nextPhase = () => {
    const currentPhase = gameState.phase.phase;

    // end of phases, run end game logic
    if (currentPhase === GamePhases.GAME_OVER) {
      endGame();
      return;
    }

    let messageIndex = 0;
    let results = null;
    if (currentPhase === GamePhases.GAME_ON) {
      // time to get game results
      results = getGameResult(teamRank, gameState.opponent);
      messageIndex = results.messageIndex;
    }

    // go to next phase
    const nextPhaseIndex = localGameState.currentPhaseIndex + 1;
    setLocalGameState({
      ...localGameState,
      currentMessageIndex: messageIndex,
      currentPhaseIndex: nextPhaseIndex,
      results,
    });
  };

  const nextMessage = () => {
    // end of messages, go to next phase
    if (
      localGameState.currentMessageIndex ===
      gameState.phase.messages.length - 1
    ) {
      nextPhase();
      return;
    }

    // go to next message
    const nextMessageIndex = localGameState.currentMessageIndex + 1;
    setLocalGameState({
      ...localGameState,
      currentMessageIndex: nextMessageIndex,
    });
  };

  const onTutorialComplete = (canceled) => {
    if (canceled) {
      dispatch(setTutorialState({ isActive: false }));
      return;
    }

    // check if this was the first time the tutorial was viewed
    if (!student.tutorials.season) {
      // if so, update the student object and enable budget button
      const tutorials = { ...student.tutorials, season: true };
      updateStudentById(student._id, { tutorials })
        .then(({ updatedStudent }) => {
          batch(() => {
            dispatch(setTutorialState({ isActive: false }));
            dispatch(setStudent(updatedStudent));
          });
        })
        .catch((err) => console.error(err));
    } else {
      dispatch(setTutorialState({ isActive: false }));
    }
  };

  const startTutorial = useCallback(
    (slides) => {
      setTutorialSlides(slides);
      dispatch(
        setTutorialState({
          isActive: true,
        })
      );
    },
    [dispatch]
  );

  const onCallSharkie = () => {
    dispatch(
      toggleOverlay({
        isOpen: true,
        template: (
          <FaqOverlay
            questions={faqs.season}
            title='Season Page FAQs'
            level={+student.level}
            onStartTutorial={() => {
              dispatch(
                toggleOverlay({
                  isOpen: false,
                  template: null,
                })
              );
              startTutorial([getConfirmSlides('season'), seasonSlides]);
            }}
          />
        ),
      })
    );
  };

  const hasSeenTutorial = useRef(
    !!(student && student.tutorials && student.tutorials.season)
  );
  useEffect(() => {
    if (student && !hasSeenTutorial.current) {
      hasSeenTutorial.current = true;
      startTutorial([seasonSlides]);
    }
  }, [student, startTutorial]);
  hasSeenTutorial.current = !!(
    student &&
    student.tutorials &&
    student.tutorials.season
  );

  if (seasonState.inTransition && !seasonState.inSession) {
    window.setTimeout(() => {
      dispatch(
        toggleOverlay({
          isOpen: true,
          template: (
            <NextSeasonOverlay
              student={student}
              awards={seasonState.awards}
              next={(levelChange) => {
                history.push({ pathname: '/home', state: { levelChange } });
              }}
            />
          ),
          canClose: false,
        })
      );
    });
  }

  setTimer();

  // in UP_NEXT phase, need to add the team names to the gameState message
  if (
    gameState.opponent &&
    gameState.phase &&
    gameState.phase.phase === GamePhases.UP_NEXT &&
    localGameState.currentMessageIndex === 1
  ) {
    gameState.phase.messages[1] = `${seasonState.seasonTeam.name} vs ${gameState.opponent.name}`;
    gameState.message = gameState.phase.messages[1];
  }

  return (
    <div className='page-container'>
      <HeaderComponent
        stickBtn={seasonStick}
        level={+student.level}
        tutorialActive={tutorialActive}
      />

      <PageBoard>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            overflowX: 'hidden',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: '1rem',
              bottom: '0rem',
              zIndex: tutorialActive ? 0 : 1,
            }}
          >
            <SharkieButton
              textPosition='right'
              style
              onCallSharkie={onCallSharkie}
            />
          </div>
          <div className='season-page-board-top'>
            <div className='student-team-rank-container'>
              <LevelStick
                type='teamRank'
                amount={teamRank}
                denom={getMaxTeamRank(+student.level)}
                color='#e06d00'
                indicatorDirection='right'
                isLarge={true}
                textJsx={
                  <span>
                    Team <br />
                    Rank
                  </span>
                }
              />
            </div>
            <div className='jumbotron-container'>
              <Jumbotron
                gameState={gameState}
                seasonState={seasonState}
                currentOpponentIndex={localGameState.currentOpponentIndex}
                team={teamPlayers}
              />
            </div>
            <div className='opposing-team-rank-container'>
              <LevelStick
                type='teamRank'
                amount={gameState.opponent ? gameState.opponent.teamRank : 0}
                denom={getMaxTeamRank(+student.level)}
                color={gameState.opponent ? gameState.opponent.color : '#fff'}
                indicatorDirection='left'
                isLarge={true}
                inverse={true}
                textJsx={
                  <span>
                    Team <br />
                    Rank
                  </span>
                }
              />
            </div>
          </div>
          <div className='season-page-board-bottom'>
            <div className='play-btn-container'>
              <span className='play-btn-wrap'>
                {seasonState.currentScenario &&
                  seasonState.currentScenario.gameButtonLabel && (
                    <span className='color-primary'>
                      {seasonState.currentScenario.gameButtonLabel}
                    </span>
                  )}
                <GameButton
                  onClick={startGame}
                  gameState={gameState}
                  team={teamPlayers}
                  currentScenario={seasonState.currentScenario}
                  animationState={animationStates.playButton}
                  student={student}
                />
              </span>
              <div className='game-count'>
                Game {seasonState.currentOpponentIndex + 1} of{' '}
                {seasonState.allOpponents.length}
              </div>
            </div>
            <div className='standings-board-container'>
              <h6 style={{ textAlign: 'center', color: '#000000' }}>
                Standings
              </h6>
              <StandingsBoard animationState={animationStates.standings} />
            </div>
          </div>
        </div>
      </PageBoard>
      <Overlay />
      {tutorialActive && (
        <Tutorial slides={tutorialSlides} onComplete={onTutorialComplete} />
      )}
    </div>
  );
};
