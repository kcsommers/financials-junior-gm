import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { cloneDeep } from 'lodash';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import { ApiHelper } from '../../api/api-helper';
import { useAuth } from '../../auth/context/auth-context';
import { Cheermeter } from '../../components/Cheermeter';
import { Footer } from '../../components/Footer';
import { GameButton } from '../../components/GameButton';
import { Header } from '../../components/Header';
import { HelpButton } from '../../components/HelpButton';
import { Jumbotron } from '../../components/Jumbotron';
import { LevelStick } from '../../components/LevelStick';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { Modal } from '../../components/Modal';
import { SeasonStatsModal } from '../../components/SeasonStatsModal';
import { StandingsBoard } from '../../components/StandingsBoard';
import { FaqBoard } from '../../faqs/FaqBoard';
import { seasonFaqs } from '../../faqs/season-faqs';
import { useGame } from '../../game/game-context';
import { ObjectiveNames } from '../../game/objectives/objectives';
import { postGameCompleted } from '../../game/season/game-completed';
import { GamePhases } from '../../game/season/game-phases';
import { getInjuredPlayer } from '../../game/season/get-injured-player';
import { scenarioActive } from '../../game/season/scenario-active';
import { scenarioCompleted } from '../../game/season/scenario-completed';
import { updateSeasonAwards } from '../../game/season/season-awards';
import { useCheermeter } from '../../components/Cheermeter/use-cheermeter';
import { Player, PlayerAssignments } from '../../game/teams/players';
import { getMaxTeamRank } from '../../game/teams/utils/get-max-team-rank';
import { startingLineupFull } from '../../game/teams/utils/starting-lineup-full';
import { Student } from '../../student/student.interface';
import { updateStudent } from '../../student/update-student';
import { SeasonTutorialComponents } from '../../tutorial/component-configs/season-tutorial-components';
import { Tutorial } from '../../tutorial/Tutorial';
import { useTutorial } from '../../tutorial/use-tutorial';
import { useInterval } from '../../utils/hooks/use-interval';
import { GamePageProps } from './game-page-props';

const CHEER_AUDIO =
  'https://sharks-assets.s3.us-west-2.amazonaws.com/audio/cheering.mp3';

type SeasonPageProps = GamePageProps & {
  getTeamLogo: () => ReactElement;
  validateProPlayer: (player: Player) => boolean;
};

export const CoreSeasonPage = ({
  apiBaseUrl,
  tutorialSlides,
  helpButtonIcon,
  logo,
  getTeamLogo,
  validateProPlayer,
}: SeasonPageProps) => {
  const { authorizedUser, setAuthorizedUser, logUserOut } = useAuth();
  const student = authorizedUser as Student;
  const { seasonState, dispatch, audioCache } = useGame();
  const [gamePhaseTimer, setGamePhaseTimer] = useState<number>(null);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const { cheerPoints, onCheer, cheerLevel } = useCheermeter();
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
  } = useTutorial<SeasonTutorialComponents, {}>('season', apiBaseUrl);
  const [checkedRedirect, setCheckedRedirect] = useState(false);
  const router = useRouter();
  const cheerAudioRef = useRef<HTMLAudioElement>();

  useEffect(() => {
    const shouldRedirect =
      +student?.level === 1 &&
      !student?.tutorials?.season &&
      !startingLineupFull(student);
    if (shouldRedirect) {
      router.push('/game/home');
    } else {
      setCheckedRedirect(true);
    }
  }, []);

  const completeSeason = async () => {
    try {
      const updatedAwards = updateSeasonAwards(
        student,
        seasonState?.studentTeam
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
        apiBaseUrl
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
      seasonState?.gamePhase.name === GamePhases.GAME_OVER &&
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
    if (
      seasonState?.currentOpponentIndex ===
      seasonState?.opposingTeams.length - 1
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
        apiBaseUrl
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
    return ((student?.seasons || [])[+student?.level - 1] || []).length;
  }, [student]);

  useEffect(() => {
    let shouldThrowScenario = false;
    const isLastGame = gamesPlayed === seasonState?.opposingTeams.length;
    const noScenario = !scenarioActive(student) && !scenarioCompleted(student);
    if (!isLastGame && noScenario && gamesPlayed && gamesPlayed % 4 === 0) {
      shouldThrowScenario = true;
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

  useEffect(() => {
    const isLastGame = gamesPlayed === seasonState?.opposingTeams.length;
    const noScenario = !scenarioActive(student) && !scenarioCompleted(student);
    if (
      !isLastGame &&
      noScenario &&
      seasonState?.gameTally - 1 &&
      (seasonState?.gameTally - 1) % 2 === 0
    ) {
      setShowStatsModal(true);
    }
  }, [seasonState?.gameTally, gamesPlayed]);

  useEffect(() => {
    if (seasonState?.gamePhase?.name === GamePhases.GAME_OVER) {
      (async () => {
        try {
          const gameCompletedRes = await postGameCompleted(
            student,
            seasonState?.gameResult,
            apiBaseUrl
          );
          setAuthorizedUser(gameCompletedRes.updatedStudent);
          studentGamesUpdated.current = true;
        } catch (error: any) {
          // @TODO error handle
        }
      })();
    }
  }, [seasonState?.gamePhase?.name]);

  useEffect(() => {
    if (!cheerAudioRef.current) {
      return;
    }
    if (seasonState?.gamePhase?.name === GamePhases.GAME_ON) {
      cheerAudioRef.current.play();
    } else {
      cheerAudioRef.current.pause();
      cheerAudioRef.current.currentTime = 0;
    }
  }, [seasonState?.gamePhase?.name]);

  useInterval(nextGamePhase, gamePhaseTimer);

  // game timer effect
  useEffect(() => {
    setGamePhaseTimer(seasonState?.gamePhase?.timer);
  }, [seasonState?.gamePhase?.name]);

  const gameButtonClicked = () => {
    if (scenarioActive(student)) {
      router.push('/game/team');
      return;
    }
    if (seasonState?.gamePhase?.name === GamePhases.READY) {
      nextGamePhase();
    }
    if (seasonState?.gamePhase?.name === GamePhases.GAME_ON) {
      onCheer();
    }
  };

  const logout = async () => {
    try {
      await ApiHelper.logout(apiBaseUrl);
      logUserOut();
      router.push('/');
    } catch (error) {
      // @TODO error handle
    }
  };

  return !student ||
    !seasonState?.studentTeam ||
    !seasonState?.currentOpponent ||
    !checkedRedirect ? (
    <LoadingSpinner isFullPage={true} />
  ) : (
    <div className="flex flex-col h-full">
      <Header>{logo}</Header>
      <div className="relative bg-neutral-200 rounded-md border-4 border-neutral-700 px-4 flex-1 mx-14 flex flex-col">
        <div className="absolute top-0 left-0 right-0 flex justify-between">
          <div className="ml-3 -translate-x-16 mt-4">
            <LevelStick
              isMoney={false}
              value={seasonState?.studentTeam.stats.rank + cheerPoints}
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
              value={seasonState?.currentOpponent.stats.rank}
              denom={getMaxTeamRank(+student.level)}
              color={seasonState?.currentOpponent.color}
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
                    .zIndex ||
                  (!!(activeTutorial || requestedTutorial) ? 'auto' : '50'),
              },
            }}
          >
            {scenarioActive(student) && (
              <p className="text-primary text-base mb-1">
                Click the puck to sign a new player!
              </p>
            )}
            {seasonState?.gamePhase?.name === GamePhases.GAME_ON && (
              <p className="text-primary text-base mb-1">
                Click the puck or tap the spacebar to cheer for your team!
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
                gamePhase={seasonState?.gamePhase}
                onClick={gameButtonClicked}
              />
            </motion.span>
            <span className="-mt-1 mb-2 text-lg">
              Game {seasonState?.currentOpponentIndex + 1} of{' '}
              {seasonState?.opposingTeams?.length}
            </span>
          </motion.span>
          <div className="relative flex flex-1 items-center justify-between">
            <span className="absolute -left-6 -top-10">
              <HelpButton
                text="CALL S.J. SHARKIE!"
                textPosition="right"
                onClick={() => setShowFaqModal(true)}
              >
                {helpButtonIcon}
              </HelpButton>
            </span>
            <Cheermeter cheerLevel={cheerLevel} />
            <StandingsBoard
              studentTeam={seasonState?.studentTeam}
              opposingTeams={seasonState?.opposingTeams}
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
          onSaveAndExit={logout}
        />
      </Modal>

      {/* @ts-ignore */}
      <AnimatePresence>
        {!!(activeTutorial || requestedTutorial) && (
          <Tutorial<SeasonTutorialComponents>
            activeTutorial={activeTutorial}
            requestedTutorial={requestedTutorial}
            slides={
              requestedTutorial
                ? tutorialSlides.confirmStart
                : tutorialSlides.main
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
      <audio
        src={audioCache.get(CHEER_AUDIO) || CHEER_AUDIO}
        ref={cheerAudioRef}
        loop
        autoPlay
        className="hidden"
      />
    </div>
  );
};
