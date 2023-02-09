import { useAuth } from '@statrookie/core/src/auth/context/auth-context';
import { Student } from '@statrookie/core/src/auth/users/student.interface';
import { LevelStick } from '@statrookie/core/src/components/LevelStick';
import { LoadingSpinner } from '@statrookie/core/src/components/LoadingSpinner';
import { ObjectivesBoard } from '@statrookie/core/src/components/ObjectivesBoard';
import { ProtectedRoute } from '@statrookie/core/src/components/ProtectedRoute';
import { RestartButton } from '@statrookie/core/src/components/RestartButton';
import { StickButton } from '@statrookie/core/src/components/StickButton';
import BudgetStick from '@statrookie/core/src/components/svg/budget-stick.svg';
import LogoutStick from '@statrookie/core/src/components/svg/logout-stick.svg';
import SeasonStick from '@statrookie/core/src/components/svg/season-stick.svg';
import TrophiesStick from '@statrookie/core/src/components/svg/trophies-stick.svg';
import TeamStick from '@statrookie/core/src/components/svg/team-stick.svg';
import { GameProvider } from '@statrookie/core/src/game/game-context';
import { getMaxTeamRank } from '@statrookie/core/src/game/utils/get-max-team-rank';
import {
  budgetPageUnlocked,
  seasonPageUnlocked,
  teamPageUnlocked,
} from '@statrookie/core/src/game/utils/unlocked-pages';
import { getMoneySpent } from '@statrookie/core/src/game/utils/get-money-spent';
import { getTeamRank } from '@statrookie/core/src/game/utils/get-team-rank';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../constants/api-base-url';

const HomePage = () => {
  const student = useAuth().authorizedUser as Student;
  const [teamRank, setTeamRank] = useState(0);
  const [moneySpent, setMoneySpent] = useState(0);

  useEffect(() => {
    setTeamRank(getTeamRank(student));
    setMoneySpent(getMoneySpent(student));
  }, [student]);

  if (!student) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="home-page-container">
      <div className="nav-container relative" style={{ height: '100px' }}>
        <h1
          className={classNames(
            'text-xl text-primary text-center flex items-center justify-center',
            'text-h1 text-shadow-secondary absolute left-0 right-0 top-0 bottom-0'
          )}
        >
          HOME
        </h1>
        <div className="flex items-center justify-between pr-8 h-full">
          <LogoutStick
            // @ts-ignore
            className="ml-8 cursor-pointer"
            style={{ transform: 'translateY(-100px)' }}
          />
          <RestartButton onClick={() => {}} />
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
            type="teamRank"
            amount={teamRank}
            denom={getMaxTeamRank(+student.level)}
            color="#e06d00"
            indicatorDirection="right"
            textJsx={
              <span>
                Team <br />
                Rank
              </span>
            }
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
            type="budget"
            amount={Math.max(
              +student.totalBudget - moneySpent - +student.savingsBudget,
              0
            )}
            denom={+student.totalBudget}
            color="#002f6c"
            indicatorDirection="left"
            inverse={true}
            textJsx={
              <span>
                Spending <br />
                Budget
              </span>
            }
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
        <div className="flex items-center justify-between"></div>
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
      <div className="flex items-center justify-between"></div>
    </div>
  );
};

const ProtectedHomePage = () => {
  return (
    <ProtectedRoute apiBaseUrl={API_BASE_URL} permittedRoles="*">
      <HomePage />
    </ProtectedRoute>
  );
};

ProtectedHomePage.getLayout = function getLayout(page: any) {
  return <GameProvider>{page}</GameProvider>;
};

export default ProtectedHomePage;
