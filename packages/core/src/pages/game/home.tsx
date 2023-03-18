import classNames from 'classnames';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ApiHelper } from '../../api/api-helper';
import { useAuth } from '../../auth/context/auth-context';
import { logger } from '../../utils/logger';
import { ConfirmScreen } from '../../components/ConfirmScreen';
import { HelpButton } from '../../components/HelpButton';
import { LevelStick } from '../../components/LevelStick';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { Modal } from '../../components/Modal';
import { ObjectivesBoard } from '../../components/ObjectivesBoard';
import { PromotionModal } from '../../components/PromotionModal';
import { RestartButton } from '../../components/RestartButton';
import { StickButton } from '../../components/StickButton';
import BudgetStick from '../../components/svg/budget-stick.svg';
import LogoutStick from '../../components/svg/logout-stick.svg';
import SeasonStick from '../../components/svg/season-stick.svg';
import TeamStick from '../../components/svg/team-stick.svg';
import TrophiesStick from '../../components/svg/trophies-stick.svg';
import { FaqBoard } from '../../faqs/FaqBoard';
import { homeFaqs } from '../../faqs/home-faqs';
import { getMoneySpent } from '../../game/budget/get-money-spent';
import { useGame } from '../../game/game-context';
import { postRepeatSeason } from '../../game/season/repeat-season';
import { getMaxTeamRank } from '../../game/teams/utils/get-max-team-rank';
import { startingLineupFull } from '../../game/teams/utils/starting-lineup-full';
import {
  budgetPageUnlocked,
  seasonPageUnlocked,
  teamPageUnlocked,
} from '../../game/utils/unlocked-pages';
import { Student } from '../../student/student.interface';
import { Tutorial } from '../../tutorial/Tutorial';
import { TutorialSlide } from '../../tutorial/tutorial-slide';
import { useTutorial } from '../../tutorial/use-tutorial';
import { useAsyncState } from '../../utils/context/async-state.context';
import { GamePageProps } from './game-page-props';

type HomePageProps = GamePageProps & {
  tutorialSlides: {
    main: TutorialSlide[];
    confirmStart: TutorialSlide[];
    seasonTransition: TutorialSlide[];
    teamTransition: TutorialSlide[];
  };
};

export const CoreHomePage = ({
  apiBaseUrl,
  promotionVideos,
  opposingTeams,
  studentTeams,
  tutorialSlides,
  helpButtonIcon,
}: HomePageProps) => {
  const { authorizedUser, setAuthorizedUser, logUserOut } = useAuth();
  const student = authorizedUser as Student;
  const [showFaqModal, setShowFaqModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [moneySpent, setMoneySpent] = useState(0);
  const [showResetSeasonModal, setShowResetSeasonModal] = useState(false);
  const { seasonState, dispatch } = useGame();
  const [showPromotionModal, setShowPromotionModal] = useState(false);
  const router = useRouter();
  const { setIsLoading, setErrorMessage } = useAsyncState();

  const {
    activeTutorial,
    requestedTutorial,
    setRequestedTutorial,
    onTutorialExit,
  } = useTutorial<{}, {}>(() => {
    if (!student) {
      return null;
    }
    if (!student.tutorials?.home) {
      return 'home';
    }
    if (student.tutorials?.budget && !student.tutorials?.team) {
      return 'teamTransition';
    }
    if (!student.tutorials?.season && startingLineupFull(student)) {
      return 'seasonTransition';
    }
    return null;
  }, apiBaseUrl);

  useEffect(() => {
    setMoneySpent(getMoneySpent(student));
  }, [student]);

  useEffect(() => {
    if (router.query?.promotion) {
      setShowPromotionModal(true);
    }
  }, [router]);

  const handleResetSeason = async () => {
    setIsLoading(true);
    try {
      const repeatSeasonRes = await postRepeatSeason(student, apiBaseUrl);
      setAuthorizedUser(repeatSeasonRes.updatedStudent);
      dispatch({
        type: 'INIT_SEASON',
        payload: {
          student: repeatSeasonRes.updatedStudent,
          studentTeams: studentTeams,
          opposingTeams: opposingTeams,
        },
      });
      setShowResetSeasonModal(false);
      setIsLoading(false);
    } catch (error) {
      logger.error('CoreHomePage.handleResetSeason:::: ', error);
      setIsLoading(false);
      setErrorMessage(
        'There was an unexpected error resetting season. Please try again.'
      );
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await ApiHelper.logout(apiBaseUrl);
      logUserOut();
      setIsLoading(false);
      router.push('/');
    } catch (error) {
      logger.error('CoreHomePage.logout:::: ', error);
      setIsLoading(false);
      setErrorMessage(
        'There was an unexpected error logging out. Please try again.'
      );
    }
  };

  return !student || !seasonState?.studentTeam ? (
    <LoadingSpinner isFullPage={true} />
  ) : (
    <div className="home-page-container">
      <div className="nav-container relative" style={{ height: '100px' }}>
        <h1
          className={classNames(
            'text-primary text-center flex items-center justify-center',
            'text-h1 text-shadow-secondary absolute left-0 right-0 top-0 bottom-0'
          )}
        >
          HOME
        </h1>
        <div
          className={classNames(
            'flex items-center justify-between pr-8 h-full relative',
            { 'z-50': !activeTutorial && !requestedTutorial }
          )}
        >
          <button onClick={() => setShowLogoutModal(true)}>
            <LogoutStick
              // @ts-ignore
              className="ml-8 cursor-pointer"
              style={{ transform: 'translateY(-100px)' }}
            />
          </button>
          <RestartButton
            onClick={() => {
              setShowResetSeasonModal(true);
            }}
          />
        </div>
      </div>
      <div className="flex items-start justify-around px-4 relative">
        <div
          className={classNames(
            'mx-8 flex justify-center items-center rounded-md',
            'bg-white border-5 border-neutral-700'
          )}
          style={{
            width: '210px',
            height: '285px',
          }}
        >
          <LevelStick
            value={seasonState?.studentTeam?.stats.rank}
            denom={getMaxTeamRank(+student?.level)}
            color="secondary"
            indicatorDirection="right"
            label="Team\nRank"
          />
        </div>
        <ObjectivesBoard />
        <div
          className={classNames(
            'mx-8 flex justify-center items-center rounded-md',
            'bg-white border-5 border-neutral-700'
          )}
          style={{
            width: '210px',
            height: '285px',
          }}
        >
          <LevelStick
            isMoney={true}
            value={Math.max(
              +student?.totalBudget - moneySpent - +student?.savingsBudget,
              0
            )}
            denom={+student?.totalBudget}
            color="foreground"
            indicatorDirection="left"
            inverse={true}
            label="Spending\nBudget"
          />
        </div>
        <span className="absolute top-full -translate-y-12">
          <HelpButton
            text="CALL S.J. SHARKIE!"
            onClick={() => setShowFaqModal(true)}
          >
            {helpButtonIcon}
          </HelpButton>
        </span>
      </div>
      <div
        className={classNames('mt-11 relative', {
          'z-20': !activeTutorial && !requestedTutorial,
        })}
      >
        <div className="flex items-center justify-between relative">
          <div className="z-2 relative -left-6">
            <StickButton
              href="/game/team"
              isDisabled={!teamPageUnlocked(student)}
            >
              <TeamStick />
            </StickButton>
            <p className="text-primary text-xl text-right">
              Build your team by signing players!
            </p>
          </div>
          <div className="z-2 relative -right-6">
            <StickButton
              href="/game/budget"
              inverse={true}
              isDisabled={!budgetPageUnlocked(student)}
            >
              <BudgetStick />
            </StickButton>
            <p className="text-primary text-xl">Manage your team's money!</p>
          </div>
        </div>
      </div>
      <div
        className={classNames(
          'flex items-center justify-between mt-11 relative',
          { 'z-10': !activeTutorial && !requestedTutorial }
        )}
      >
        <div className="z-1 relative -left-3">
          <StickButton
            href="/game/season"
            showBg={true}
            isDisabled={!seasonPageUnlocked(student)}
          >
            <SeasonStick />
          </StickButton>
          <p className="text-primary text-xl text-right">
            Play games and win the championship!
          </p>
        </div>
        <div className="z-1 relative -right-4">
          <StickButton href="/game/trophies" inverse={true}>
            <TrophiesStick />
          </StickButton>
          <p className="text-primary text-xl">See your badges and trophies!</p>
        </div>
      </div>
      <Modal
        isVisible={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
      >
        <ConfirmScreen
          confirm={logout}
          cancel={() => setShowLogoutModal(false)}
          message="Are you sure you would like to log out?"
          subMessage="All of your changes have been saved for next time"
        />
      </Modal>
      <Modal
        isVisible={showResetSeasonModal}
        onClose={() => setShowResetSeasonModal(false)}
      >
        <ConfirmScreen
          confirm={handleResetSeason}
          cancel={() => setShowResetSeasonModal(false)}
          message="Would you like to restart the season?"
        />
      </Modal>
      <Modal
        isVisible={showPromotionModal}
        onClose={() => {
          router.push({ query: '' });
          setShowPromotionModal(false);
        }}
      >
        <PromotionModal
          student={student}
          videos={promotionVideos}
          promotedFrom={+router.query?.promotion}
        />
      </Modal>
      <Modal isVisible={showFaqModal} onClose={() => setShowFaqModal(false)}>
        <FaqBoard
          faqs={homeFaqs}
          title="Home Page FAQs"
          onWatchTutorial={() => {
            setShowFaqModal(false);
            setRequestedTutorial('home');
          }}
        />
      </Modal>
      {/* @ts-ignore */}
      <AnimatePresence>
        {!!(activeTutorial || requestedTutorial) && (
          <Tutorial
            activeTutorial={activeTutorial}
            requestedTutorial={requestedTutorial}
            slides={
              requestedTutorial
                ? tutorialSlides.confirmStart
                : activeTutorial === 'home'
                ? tutorialSlides.main
                : activeTutorial === 'teamTransition'
                ? tutorialSlides.teamTransition
                : tutorialSlides.seasonTransition
            }
            onExit={onTutorialExit}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
