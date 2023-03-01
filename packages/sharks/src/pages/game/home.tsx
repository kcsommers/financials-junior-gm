import { useAuth } from '@statrookie/core/src/auth/context/auth-context';
import { ConfirmScreen } from '@statrookie/core/src/components/ConfirmScreen';
import { GamePageWrap } from '@statrookie/core/src/components/GamePageWrap';
import { LevelStick } from '@statrookie/core/src/components/LevelStick';
import { LoadingSpinner } from '@statrookie/core/src/components/LoadingSpinner';
import { Modal } from '@statrookie/core/src/components/Modal';
import { ObjectivesBoard } from '@statrookie/core/src/components/ObjectivesBoard';
import { PromotionModal } from '@statrookie/core/src/components/PromotionModal';
import { ProtectedRoute } from '@statrookie/core/src/components/ProtectedRoute';
import { RestartButton } from '@statrookie/core/src/components/RestartButton';
import { StickButton } from '@statrookie/core/src/components/StickButton';
import BudgetStick from '@statrookie/core/src/components/svg/budget-stick.svg';
import LogoutStick from '@statrookie/core/src/components/svg/logout-stick.svg';
import SeasonStick from '@statrookie/core/src/components/svg/season-stick.svg';
import TeamStick from '@statrookie/core/src/components/svg/team-stick.svg';
import TrophiesStick from '@statrookie/core/src/components/svg/trophies-stick.svg';
import { getMoneySpent } from '@statrookie/core/src/game/budget/get-money-spent';
import { GameProvider, useGame } from '@statrookie/core/src/game/game-context';
import { postResetSeason } from '@statrookie/core/src/game/season/reset-season';
import { getMaxTeamRank } from '@statrookie/core/src/game/teams/utils/get-max-team-rank';
import {
  budgetPageUnlocked,
  seasonPageUnlocked,
  teamPageUnlocked,
} from '@statrookie/core/src/game/utils/unlocked-pages';
import { Student } from '@statrookie/core/src/student/student.interface';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../constants/api-base-url';
import { opposingTeams } from '../../game/teams/opposing-teams';
import { studentTeams } from '../../game/teams/student-teams';

const PROMOTION_VIDEOS = [
  'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/FINancials_Junior_GM_LVL_01.mp4',
  'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/FINancials_Junior_GM_LVL_02.mp4',
  'https://sharks-assets.s3.us-west-2.amazonaws.com/videos/FINancials_Junior_GM_LVL_03.mp4',
];

const HomePage = () => {
  const { authorizedUser, setAuthorizedUser } = useAuth();
  const student = authorizedUser as Student;
  const [moneySpent, setMoneySpent] = useState(0);
  const [showResetSeasonModal, setShowResetSeasonModal] = useState(false);

  const { seasonState, dispatch } = useGame();
  const [showPromotionModal, setShowPromotionModal] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setMoneySpent(getMoneySpent(student));
  }, [student]);

  useEffect(() => {
    if (router.query?.promotion) {
      setShowPromotionModal(true);
    }
  }, [router]);

  const handleResetSeason = async () => {
    try {
      const resetSeasonRes = await postResetSeason(student, API_BASE_URL);
      setAuthorizedUser(resetSeasonRes.updatedStudent);
      dispatch({
        type: 'INIT_SEASON',
        payload: {
          student: resetSeasonRes.updatedStudent,
          studentTeams: studentTeams,
          opposingTeams: opposingTeams,
        },
      });
      setShowResetSeasonModal(false);
    } catch (error) {
      // @TODO error handle
    }
  };

  return !student || !seasonState.studentTeam ? (
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
        <div className="flex items-center justify-between pr-8 h-full relative z-50">
          <LogoutStick
            // @ts-ignore
            className="ml-8 cursor-pointer"
            style={{ transform: 'translateY(-100px)' }}
          />
          <RestartButton
            onClick={() => {
              setShowResetSeasonModal(true);
            }}
          />
        </div>
      </div>
      <div className="flex items-start justify-around px-4">
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
            value={seasonState.studentTeam?.stats.rank}
            denom={getMaxTeamRank(+student.level)}
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
              +student.totalBudget - moneySpent - +student.savingsBudget,
              0
            )}
            denom={+student.totalBudget}
            color="foreground"
            indicatorDirection="left"
            inverse={true}
            label="Spending\nBudget"
          />
        </div>
      </div>

      <div className="mt-11 relative z-20">
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
      <div className="flex items-center justify-between mt-11 relative z-10">
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
          videos={PROMOTION_VIDEOS}
          promotedFrom={+router.query?.promotion}
        />
      </Modal>
    </div>
  );
};

const ProtectedHomePage = () => {
  return (
    <ProtectedRoute apiBaseUrl={API_BASE_URL} permittedRoles="*">
      <GamePageWrap
        studentTeams={studentTeams}
        opposingTeams={opposingTeams}
        apiBaseUrl={API_BASE_URL}
      >
        <HomePage />
      </GamePageWrap>
    </ProtectedRoute>
  );
};

ProtectedHomePage.getLayout = function getLayout(page: any) {
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

export default ProtectedHomePage;
