import { useAuth } from '@statrookie/core/src/auth/context/auth-context';
import { Cheermeter } from '@statrookie/core/src/components/Cheermeter';
import { Footer } from '@statrookie/core/src/components/Footer';
import { GameButton } from '@statrookie/core/src/components/GameButton';
import { GamePageWrap } from '@statrookie/core/src/components/GamePageWrap';
import { Header } from '@statrookie/core/src/components/Header';
import { HelpButton } from '@statrookie/core/src/components/HelpButton';
import { Jumbotron } from '@statrookie/core/src/components/Jumbotron';
import { LevelStick } from '@statrookie/core/src/components/LevelStick';
import { LoadingSpinner } from '@statrookie/core/src/components/LoadingSpinner';
import { Modal } from '@statrookie/core/src/components/Modal';
import { ProtectedRoute } from '@statrookie/core/src/components/ProtectedRoute';
import { SeasonStatsModal } from '@statrookie/core/src/components/SeasonStatsModal';
import { StandingsBoard } from '@statrookie/core/src/components/StandingsBoard';
import { FaqBoard } from '@statrookie/core/src/faqs/FaqBoard';
import { seasonFaqs } from '@statrookie/core/src/faqs/season-faqs';
import { GameProvider, useGame } from '@statrookie/core/src/game/game-context';
import { ObjectiveNames } from '@statrookie/core/src/game/objectives/objectives';
import { gameCompleted } from '@statrookie/core/src/game/season/game-completed';
import { GamePhases } from '@statrookie/core/src/game/season/game-phases';
import { getInjuredPlayer } from '@statrookie/core/src/game/season/get-injured-player';
import { scenarioActive } from '@statrookie/core/src/game/season/scenario-active';
import { scenarioCompleted } from '@statrookie/core/src/game/season/scenario-completed';
import { updateSeasonAwards } from '@statrookie/core/src/game/season/season-awards';
import { PlayerAssignments } from '@statrookie/core/src/game/teams/players';
import { getMaxTeamRank } from '@statrookie/core/src/game/teams/utils/get-max-team-rank';
import { Student } from '@statrookie/core/src/student/student.interface';
import { updateStudent } from '@statrookie/core/src/student/update-student';
import { SeasonTutorialComponents } from '@statrookie/core/src/tutorial/component-configs/season-tutorial-components';
import { Tutorial } from '@statrookie/core/src/tutorial/Tutorial';
import { useTutorial } from '@statrookie/core/src/tutorial/use-tutorial';
import { useInterval } from '@statrookie/core/src/utils/hooks/use-interval';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { cloneDeep } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { confirmStartTutorialSlide } from 'src/tutorial/slides/confirm-start-tutorial-slide';
import FinancialsLogo from '../../components/svg/financials-logo-big.svg';
import SharkieButton from '../../components/svg/sharkie-btn.svg';
import { API_BASE_URL } from '../../constants/api-base-url';
import { opposingTeams } from '../../game/teams/opposing-teams';
import { studentTeams } from '../../game/teams/student-teams';
import { getTeamLogo } from '../../game/utils/get-team-logo';
import { validateProPlayer } from '../../game/utils/validate-pro-player';
import { seasonSlides } from '../../tutorial/slides/season-slides';

const SeasonPage = () => {
  const { authorizedUser, setAuthorizedUser } = useAuth();
  const student = authorizedUser as Student;
  const { seasonState, dispatch } = useGame();
  const [gamePhaseTimer, setGamePhaseTimer] = useState<number>(null);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [cheerPoints, setCheerPoints] = useState(0);
  const [pageInitialized, setPageInitialized] = useState(false);
  const gameOverTimerEnded = useRef(false);
  const [showFaqModal, setShowFaqModal] = useState(false);
  const studentGamesUpdated = useRef(false);
  const {
    activeTutorial,
    requestedTutorial,
    setRequestedTutorial,
    tutorialComponentConfigs,
    setTutorialComponentConfigs,
    onTutorialExit,
  } = useTutorial<SeasonTutorialComponents, {}>('season', API_BASE_URL);

  const router = useRouter();

  const completeSeason = async () => {
    try {
      const updatedAwards = updateSeasonAwards(
        student,
        seasonState.studentTeam
      );
      const updateStudentRes = await updateStudent(
        student._id,
        {
          awards: updatedAwards,
          rollOverBudget:
            (+student.rollOverBudget || 0) + (+student.savingsBudget || 0),
          savingsBudget: 0,
          objectives: {
            ...student.objectives,
            [ObjectiveNames.PLAY_SEASON]: true,
          },
        },
        API_BASE_URL
      );
      dispatch({ type: 'SEASON_COMPLETE' });
      setAuthorizedUser(updateStudentRes.updatedStudent);
      router.push('/game/trophies');
    } catch (error: any) {
      // @TODO erro handle
    }
  };

  const nextGamePhase = () => {
    if (
      seasonState.gamePhase.name === GamePhases.GAME_OVER &&
      studentGamesUpdated.current
    ) {
      nextGame(true);
    } else {
      dispatch({ type: 'NEXT_GAME_PHASE', payload: { cheerPoints } });
    }
  };

  const nextGame = (seasonActive?: boolean) => {
    studentGamesUpdated.current = false;
    gameOverTimerEnded.current = false;
    setCheerPoints(0);
    if (
      seasonState.currentOpponentIndex ===
      seasonState.opposingTeams.length - 1
    ) {
      completeSeason();
    } else {
      dispatch({
        type: 'NEXT_GAME',
        payload: { student, seasonActive },
      });
    }
  };

  const throwScenario = async () => {
    const injuredPlayer = getInjuredPlayer(student);
    const injuredPlayerAssignment = injuredPlayer.playerAssignment;
    injuredPlayer.playerAssignment = PlayerAssignments.UNAVAILABLE;
    const clonedPlayers = cloneDeep(student.players);
    clonedPlayers.splice(
      clonedPlayers.findIndex((p) => p._id === injuredPlayer._id),
      1,
      injuredPlayer
    );
    try {
      const updateStudentRes = await updateStudent(
        student._id,
        {
          [injuredPlayerAssignment]: null,
          players: clonedPlayers,
          objectives: {
            ...student.objectives,
            [ObjectiveNames.SEASON_SCENARIO]: false,
            [ObjectiveNames.FILL_TEAM]: false,
          },
        },
        API_BASE_URL
      );
      setAuthorizedUser(updateStudentRes.updatedStudent);
      dispatch({
        type: 'MARKET_ACTION',
        payload: { student, injuredPlayer },
      });
    } catch (error: any) {
      // @TODO error handle
    }
  };

  useEffect(() => {
    setPageInitialized(true);
    nextGame();
  }, []);

  const gamesPlayed = useMemo(() => {
    return ((student.seasons || [])[+student.level - 1] || []).length;
  }, [student]);

  useEffect(() => {
    const isLastGame = gamesPlayed === seasonState.opposingTeams.length;
    const noScenario = !scenarioActive(student) && !scenarioCompleted(student);

    let shouldShowStats = false;
    let shouldThrowScenario = false;
    if (gamesPlayed && !isLastGame && noScenario) {
      if (gamesPlayed % 2 === 0) {
        shouldShowStats = true;
      }
      if (gamesPlayed % 4 === 0) {
        shouldThrowScenario = true;
      }
    }
    if (shouldShowStats) {
      setShowStatsModal(true);
    }
    if (shouldThrowScenario) {
      throwScenario();
    } else if (
      pageInitialized &&
      !scenarioActive(student) &&
      gameOverTimerEnded.current
    ) {
      nextGame(true);
    }
  }, [gamesPlayed]);

  // GAME_OVER effect
  useEffect(() => {
    if (seasonState.gamePhase?.name === GamePhases.GAME_OVER) {
      (async () => {
        try {
          const gameCompletedRes = await gameCompleted(
            student,
            seasonState.gameResult,
            API_BASE_URL
          );
          setAuthorizedUser(gameCompletedRes.updatedStudent);
          studentGamesUpdated.current = true;
        } catch (error: any) {
          // @TODO error handle
        }
      })();
    }
  }, [seasonState.gamePhase?.name]);

  useInterval(nextGamePhase, gamePhaseTimer);

  // game timer effect
  useEffect(() => {
    setGamePhaseTimer(seasonState.gamePhase?.timer);
  }, [seasonState.gamePhase?.name]);

  const gameButtonClicked = () => {
    if (scenarioActive(student)) {
      router.push('/game/team');
      return;
    }
    if (seasonState.gamePhase?.name === GamePhases.READY) {
      nextGamePhase();
    }
  };

  return !student ||
    !seasonState.studentTeam ||
    !seasonState.currentOpponent ? (
    <LoadingSpinner isFullPage={true} />
  ) : (
    <div className="flex flex-col h-full">
      <Header>
        <FinancialsLogo
          // @ts-ignore
          className="absolute left-1/2 top-2 -translate-x-1/2"
          width={175}
        />
      </Header>
      <div className="relative bg-neutral-200 rounded-md border-4 border-neutral-700 px-4 flex-1 mx-14 flex flex-col">
        <div className="absolute top-0 left-0 right-0 flex justify-between">
          <div className="ml-3 -translate-x-16 mt-4">
            <LevelStick
              isMoney={false}
              value={seasonState.studentTeam.stats.rank + cheerPoints}
              denom={getMaxTeamRank(+student.level)}
              color="secondary"
              indicatorDirection="right"
              size="lg"
              label="Team\nRank"
            />
          </div>

          <div className="mr-3 translate-x-16 mt-4">
            <LevelStick
              isMoney={false}
              value={seasonState.currentOpponent.stats.rank}
              denom={getMaxTeamRank(+student.level)}
              color={seasonState.currentOpponent.color}
              indicatorDirection="left"
              size="lg"
              inverse={true}
              label="Team\nRank"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <Jumbotron
            nextGamePhase={nextGamePhase}
            validateProPlayer={validateProPlayer}
            getTeamLogo={getTeamLogo}
            tutorialComponentConfigs={tutorialComponentConfigs}
          />
        </div>
        <div className="flex-1 flex items-center justify-between relative">
          <motion.span
            className="absolute left-1/2 bottom-0 -translate-x-1/2 flex flex-col items-center"
            animate="animate"
            variants={{
              animate: {
                zIndex:
                  tutorialComponentConfigs.gameButton?.variants.animate
                    .zIndex || 'auto',
              },
            }}
          >
            {scenarioActive(student) && (
              <p className="text-primary text-base mb-1">
                Click the puck to sign a new player!
              </p>
            )}
            <motion.span
              animate="animate"
              variants={tutorialComponentConfigs.gameButton?.variants}
              transition={
                tutorialComponentConfigs.gameButton?.transition || {
                  duration: 1,
                }
              }
            >
              <GameButton
                student={student}
                gamePhase={seasonState.gamePhase}
                onClick={gameButtonClicked}
              />
            </motion.span>
            <span className="mt-2 text-lg">
              Game {seasonState.currentOpponentIndex + 1} of{' '}
              {seasonState.opposingTeams?.length}
            </span>
          </motion.span>
          <div className="relative flex flex-1 items-center justify-between">
            <span className="absolute -left-6 -top-10">
              <HelpButton
                text="CALL S.J. SHARKIE!"
                textPosition="right"
                onClick={() => setShowFaqModal(true)}
              >
                <SharkieButton />
              </HelpButton>
            </span>
            <div>
              <Cheermeter
                gamePhase={seasonState.gamePhase}
                setCheerPoints={setCheerPoints}
              />
            </div>
            <StandingsBoard
              studentTeam={seasonState.studentTeam}
              opposingTeams={seasonState.opposingTeams}
              tutorialComponentConfigs={tutorialComponentConfigs}
            />
          </div>
        </div>
      </div>
      <div
        className={classNames({
          'z-0': !!(activeTutorial || requestedTutorial),
        })}
      >
        <Footer pageLinks={['team', 'budget', 'trophies']} />
      </div>
      <Modal
        isVisible={showStatsModal}
        onClose={() => setShowStatsModal(false)}
      >
        <SeasonStatsModal
          student={student}
          seasonState={seasonState}
          onContinue={() => setShowStatsModal(false)}
          onSaveAndExit={() => {
            // @TODO logout
          }}
        />
      </Modal>

      {/* @ts-ignore */}
      <AnimatePresence>
        {!!(activeTutorial || requestedTutorial) && (
          <Tutorial<SeasonTutorialComponents>
            activeTutorial={activeTutorial}
            requestedTutorial={requestedTutorial}
            slides={
              requestedTutorial ? confirmStartTutorialSlide : seasonSlides
            }
            onExit={onTutorialExit}
            setComponentConfigs={setTutorialComponentConfigs}
          />
        )}
      </AnimatePresence>

      <Modal isVisible={showFaqModal} onClose={() => setShowFaqModal(false)}>
        <FaqBoard
          faqs={seasonFaqs}
          title="Season Page FAQs"
          onWatchTutorial={() => {
            setShowFaqModal(false);
            setRequestedTutorial('season');
          }}
        />
      </Modal>
    </div>
  );
};

const ProtectedSeasonPage = () => {
  return (
    <ProtectedRoute apiBaseUrl={API_BASE_URL} permittedRoles="*">
      <GamePageWrap
        studentTeams={studentTeams}
        opposingTeams={opposingTeams}
        apiBaseUrl={API_BASE_URL}
      >
        <SeasonPage />
      </GamePageWrap>
    </ProtectedRoute>
  );
};

ProtectedSeasonPage.getLayout = function getLayout(page: any) {
  return (
    <GameProvider
      studentTeams={studentTeams}
      opposingTeams={opposingTeams}
      apiBaseUrl={API_BASE_URL}
    >
      {page}
    </GameProvider>
  );
};

export default ProtectedSeasonPage;
