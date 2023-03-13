import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import { useAuth } from '../../auth/context/auth-context';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { HelpButton } from '../../components/HelpButton';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { Modal } from '../../components/Modal';
import { ReleasePlayerBoard } from '../../components/ReleasePlayerBoard';
import { SignPlayerBoard } from '../../components/SignPlayerBoard';
import { StickButton } from '../../components/StickButton';
import Binoculars from '../../components/svg/binoculars.svg';
import ScoutStick from '../../components/svg/scout-stick.svg';
import { TeamBoard } from '../../components/TeamBoard';
import { TeamBudgetState } from '../../components/TeamBudgetState';
import { TradePlayerBoard } from '../../components/TradePlayerBoard';
import { FaqBoard } from '../../faqs/FaqBoard';
import { teamFaqs } from '../../faqs/team-faqs';
import { useGame } from '../../game/game-context';
import { checkTeamObjective } from '../../game/objectives/check-team-objective';
import { Player, PlayerAssignment } from '../../game/teams/players';
import { Student } from '../../student/student.interface';
import {
  TeamTutorialComponents,
  TeamTutorialSlideEvent,
} from '../../tutorial/component-configs/team-tutorial-components';
import { Tutorial } from '../../tutorial/Tutorial';
import { useTutorial } from '../../tutorial/use-tutorial';
import { GamePageProps } from './game-page-props';

type TeamPageProps = GamePageProps & {
  getTeamLogo: () => ReactElement;
  validateProPlayer: (player: Player) => boolean;
};

export const CoreTeamPage = ({
  apiBaseUrl,
  tutorialSlides,
  helpButtonIcon,
  logo,
  validateProPlayer,
  getTeamLogo,
}: TeamPageProps) => {
  const { authorizedUser, setAuthorizedUser } = useAuth();
  const { seasonState, dispatch } = useGame();
  const student = authorizedUser as Student;
  const router = useRouter();
  const [showScoutCompleteModal, setShowScoutCompleteModal] = useState(false);
  const [showFaqModal, setShowFaqModal] = useState(false);
  const [checkedRedirect, setCheckedRedirect] = useState(false);

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
    apiBaseUrl
  );

  const [selectedAssignment, setSelectedAssignment] =
    useState<PlayerAssignment>();
  const [selectedPlayer, setSelectedPlayer] = useState<Player>();

  useEffect(() => {
    const shouldRedirect =
      !student?.pagesVisited?.includes('budget') || !student?.tutorials?.budget;
    if (shouldRedirect) {
      router.push('/game/home');
    } else {
      setCheckedRedirect(true);
    }
  }, []);

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
        apiBaseUrl
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

  return !student || !seasonState?.studentTeam || !checkedRedirect ? (
    <LoadingSpinner isFullPage={true} />
  ) : (
    <div className="flex flex-col h-full">
      <Header>{logo}</Header>
      <div className="relative bg-neutral-200 rounded-md border-4 border-neutral-700 px-4 pb-4 flex-1 mt-4 mx-14">
        <div className="h-80 relative">
          <h2 className="text-primary text-4xl font-bold absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
            {`${seasonState?.studentTeam.city} ${seasonState?.studentTeam.name}`}
          </h2>
          <div className="flex items-center justify-between h-full">
            {seasonState?.studentTeam.getLogo()}
            <span className="mt-2">
              <HelpButton
                text="CALL S.J. SHARKIE!"
                textPosition="left"
                onClick={() => setShowFaqModal(true)}
              >
                {helpButtonIcon}
              </HelpButton>
            </span>
          </div>
        </div>

        <div className="flex">
          <div className="flex-75">
            <TeamBudgetState
              student={student}
              studentTeam={seasonState?.studentTeam}
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
              studentTeam={seasonState?.studentTeam}
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
            isDisabled={seasonState?.scoutingComplete}
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
          apiBaseUrl={apiBaseUrl}
          student={student}
          studentTeam={seasonState?.studentTeam}
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
        {seasonState?.seasonActive ? (
          <TradePlayerBoard
            student={student}
            studentTeam={seasonState?.studentTeam}
            onPlayersTraded={onMarketAction}
            releasingPlayer={selectedPlayer}
            apiBaseUrl={apiBaseUrl}
            getTeamLogo={getTeamLogo}
            validateProPlayer={validateProPlayer}
          />
        ) : (
          <ReleasePlayerBoard
            student={student}
            studentTeam={seasonState?.studentTeam}
            onPlayerReleased={onMarketAction}
            player={selectedPlayer}
            apiBaseUrl={apiBaseUrl}
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
            slides={
              requestedTutorial
                ? tutorialSlides.confirmStart
                : tutorialSlides.main
            }
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
