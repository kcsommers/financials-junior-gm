import { useAuth } from '@statrookie/core/src/auth/context/auth-context';
import { Footer } from '@statrookie/core/src/components/Footer';
import { GamePageWrap } from '@statrookie/core/src/components/GamePageWrap';
import { Header } from '@statrookie/core/src/components/Header';
import { HelpButton } from '@statrookie/core/src/components/HelpButton';
import { LoadingSpinner } from '@statrookie/core/src/components/LoadingSpinner';
import { Modal } from '@statrookie/core/src/components/Modal';
import { ProtectedRoute } from '@statrookie/core/src/components/ProtectedRoute';
import { ReleasePlayerBoard } from '@statrookie/core/src/components/ReleasePlayerBoard';
import { SignPlayerBoard } from '@statrookie/core/src/components/SignPlayerBoard';
import { StickButton } from '@statrookie/core/src/components/StickButton';
import Binoculars from '@statrookie/core/src/components/svg/binoculars.svg';
import ScoutStick from '@statrookie/core/src/components/svg/scout-stick.svg';
import { TeamBoard } from '@statrookie/core/src/components/TeamBoard';
import { TeamBudgetState } from '@statrookie/core/src/components/TeamBudgetState';
import { TradePlayerBoard } from '@statrookie/core/src/components/TradePlayerBoard';
import { FaqBoard } from '@statrookie/core/src/faqs/FaqBoard';
import { teamFaqs } from '@statrookie/core/src/faqs/team-faqs';
import { GameProvider, useGame } from '@statrookie/core/src/game/game-context';
import { checkTeamObjective } from '@statrookie/core/src/game/objectives/check-team-objective';
import {
  Player,
  PlayerAssignment,
} from '@statrookie/core/src/game/teams/players';
import { Student } from '@statrookie/core/src/student/student.interface';
import {
  TeamTutorialComponents,
  TeamTutorialSlideEvent,
} from '@statrookie/core/src/tutorial/component-configs/team-tutorial-components';
import { Tutorial } from '@statrookie/core/src/tutorial/Tutorial';
import { useTutorial } from '@statrookie/core/src/tutorial/use-tutorial';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { confirmStartTutorialSlide } from 'src/tutorial/slides/confirm-start-tutorial-slide';
import { teamSlides } from 'src/tutorial/slides/team-slides';
import FinancialsLogo from '../../components/svg/financials-logo-big.svg';
import SharkieButton from '../../components/svg/sharkie-btn.svg';
import { API_BASE_URL } from '../../constants/api-base-url';
import { opposingTeams } from '../../game/teams/opposing-teams';
import { studentTeams } from '../../game/teams/student-teams';
import { getTeamLogo } from '../../game/utils/get-team-logo';
import { validateProPlayer } from '../../game/utils/validate-pro-player';

const TeamPage = () => {
  const { authorizedUser, setAuthorizedUser } = useAuth();
  const { seasonState, dispatch } = useGame();
  const student = authorizedUser as Student;
  const router = useRouter();
  const [showScoutCompleteModal, setShowScoutCompleteModal] = useState(false);
  const [showFaqModal, setShowFaqModal] = useState(false);

  const {
    activeTutorial,
    requestedTutorial,
    setRequestedTutorial,
    tutorialComponentConfigs,
    setTutorialComponentConfigs,
    onTutorialExit,
    tutorialEventListener,
    setTutorialEventListener,
  } = useTutorial<TeamTutorialComponents, TeamTutorialSlideEvent>(
    'team',
    API_BASE_URL
  );

  const [selectedAssignment, setSelectedAssignment] =
    useState<PlayerAssignment>();
  const [selectedPlayer, setSelectedPlayer] = useState<Player>();

  useEffect(() => {
    const scoutParam = router.query?.scoutingComplete;
    if (scoutParam === 'true') {
      setShowScoutCompleteModal(true);
    }
  }, []);

  useEffect(() => {
    (async () => {
      const checkTeamObjectiveRes = await checkTeamObjective(
        student,
        API_BASE_URL
      );
      if (checkTeamObjectiveRes) {
        setAuthorizedUser(checkTeamObjectiveRes.updatedStudent);
      }
    })();
  }, [student]);

  const onMarketAction = (student: Student, completedScenario = false) => {
    setAuthorizedUser(student);
    const payload: any = {
      student,
    };
    if (completedScenario) {
      payload.injuredPlayer = null;
    }
    dispatch({ type: 'MARKET_ACTION', payload });
  };

  const onTutorialSlideEvent = (slideEvent: TeamTutorialSlideEvent) => {
    switch (slideEvent.name) {
      case 'SHOW_MARKET':
      case 'SHOW_PLAYER_DETAILS':
      case 'SHOW_CONFIRM_SIGN_PLAYER': {
        setSelectedAssignment(slideEvent.payload.player.playerAssignment);
        if (tutorialEventListener.current) {
          tutorialEventListener.current(slideEvent);
        }
        break;
      }
      case 'CLOSE_MODAL': {
        setSelectedAssignment(null);
        break;
      }
    }
  };

  return !student || !seasonState.studentTeam ? (
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
      <div className="relative bg-neutral-200 rounded-md border-4 border-neutral-700 px-4 pb-4 flex-1 mt-4 mx-14">
        <div className="h-80 relative">
          <h2 className="text-primary text-4xl font-bold absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
            {`${seasonState.studentTeam.city} ${seasonState.studentTeam.name}`}
          </h2>
          <div className="flex items-center justify-between h-full">
            {seasonState.studentTeam.getLogo()}
            <span className="mt-2">
              <HelpButton
                text="CALL S.J. SHARKIE!"
                textPosition="left"
                onClick={() => setShowFaqModal(true)}
              >
                <SharkieButton />
              </HelpButton>
            </span>
          </div>
        </div>

        <div className="flex">
          <div className="flex-75">
            <TeamBudgetState
              student={student}
              studentTeam={seasonState.studentTeam}
            />
          </div>
          <motion.div
            animate="animate"
            variants={tutorialComponentConfigs.teamBoard?.variants || {}}
            transition={
              tutorialComponentConfigs.teamBoard?.transition || { duration: 1 }
            }
            className="flex-1 pl-4"
          >
            <TeamBoard
              student={student}
              studentTeam={seasonState.studentTeam}
              tutorialComponents={tutorialComponentConfigs}
              validateProPlayer={validateProPlayer}
              onPlayerSelected={setSelectedPlayer}
              onAddPlayer={setSelectedAssignment}
              getTeamLogo={getTeamLogo}
            />
          </motion.div>
        </div>

        <div className="absolute bottom-2" style={{ left: '-42px' }}>
          <StickButton
            size="small"
            href="/game/scout"
            // isDisabled={scoutingState.isComplete}
          >
            <ScoutStick />
          </StickButton>
        </div>
      </div>
      <div
        className={classNames({
          'z-0': !!(activeTutorial || requestedTutorial),
        })}
      >
        <Footer pageLinks={['season', 'budget', 'trophies']} />
      </div>

      <Modal
        isVisible={!!selectedAssignment}
        onClose={!activeTutorial ? () => setSelectedAssignment(null) : null}
      >
        <SignPlayerBoard
          apiBaseUrl={API_BASE_URL}
          student={student}
          studentTeam={seasonState.studentTeam}
          slotAssignment={selectedAssignment}
          isDisabled={!!activeTutorial}
          setTutorialSlideEventListener={
            !!activeTutorial && setTutorialEventListener
          }
          getTeamLogo={getTeamLogo}
          validateProPlayer={validateProPlayer}
          onPlayerSigned={onMarketAction}
        />
      </Modal>

      <Modal
        isVisible={!!selectedPlayer}
        onClose={!activeTutorial ? () => setSelectedPlayer(null) : null}
      >
        {seasonState.seasonActive ? (
          <TradePlayerBoard
            student={student}
            studentTeam={seasonState.studentTeam}
            onPlayersTraded={onMarketAction}
            releasingPlayer={selectedPlayer}
            apiBaseUrl={API_BASE_URL}
            getTeamLogo={getTeamLogo}
            validateProPlayer={validateProPlayer}
          />
        ) : (
          <ReleasePlayerBoard
            student={student}
            studentTeam={seasonState.studentTeam}
            onPlayerReleased={onMarketAction}
            player={selectedPlayer}
            apiBaseUrl={API_BASE_URL}
            getTeamLogo={getTeamLogo}
            validateProPlayer={validateProPlayer}
          />
        )}
      </Modal>

      <Modal
        isVisible={showScoutCompleteModal}
        onClose={() => {
          setShowScoutCompleteModal(false);
          router.push({ query: '' });
        }}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <h3 className="text-primary text-5xl">Nice job Scouting!</h3>
          <div className="my-8">
            <Binoculars />
          </div>
          <p className="text-primary text-4xl">
            The players you scouted can now be signed!
          </p>
        </div>
      </Modal>

      {/* @ts-ignore */}
      <AnimatePresence>
        {!!(activeTutorial || requestedTutorial) && (
          <Tutorial<TeamTutorialComponents, TeamTutorialSlideEvent>
            activeTutorial={activeTutorial}
            requestedTutorial={requestedTutorial}
            slides={requestedTutorial ? confirmStartTutorialSlide : teamSlides}
            onExit={onTutorialExit}
            setComponentConfigs={setTutorialComponentConfigs}
            slideEventListener={onTutorialSlideEvent}
          />
        )}
      </AnimatePresence>

      <Modal isVisible={showFaqModal} onClose={() => setShowFaqModal(false)}>
        <FaqBoard
          faqs={teamFaqs}
          title="Team Page FAQs"
          onWatchTutorial={() => {
            setShowFaqModal(false);
            setRequestedTutorial('team');
          }}
        />
      </Modal>
    </div>
  );
};

const ProtectedTeamPage = () => {
  return (
    <ProtectedRoute apiBaseUrl={API_BASE_URL} permittedRoles="*">
      <GamePageWrap
        studentTeams={studentTeams}
        opposingTeams={opposingTeams}
        apiBaseUrl={API_BASE_URL}
      >
        <TeamPage />
      </GamePageWrap>
    </ProtectedRoute>
  );
};

ProtectedTeamPage.getLayout = function getLayout(page: any) {
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

export default ProtectedTeamPage;
