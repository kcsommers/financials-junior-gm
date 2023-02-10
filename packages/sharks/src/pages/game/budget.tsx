import { useAuth } from '@statrookie/core/src/auth/context/auth-context';
import { BudgetEquation } from '@statrookie/core/src/components/BudgetEquation';
import { BudgetSlider } from '@statrookie/core/src/components/BudgetSlider';
import { Footer } from '@statrookie/core/src/components/Footer';
import { ObjectivesBoard } from '@statrookie/core/src/components/ObjectivesBoard';
import { ProtectedRoute } from '@statrookie/core/src/components/ProtectedRoute';
import { StickButton } from '@statrookie/core/src/components/StickButton';
import HomeStick from '@statrookie/core/src/components/svg/home-stick-right.svg';
import { Budget } from '@statrookie/core/src/game/budget/budget';
import { GameProvider } from '@statrookie/core/src/game/game-context';
import { getMoneySpent } from '@statrookie/core/src/game/utils/get-money-spent';
import { Student } from '@statrookie/core/src/student/student.interface';
import { updateStudent } from '@statrookie/core/src/student/update-student';
import { useDebounce } from '@statrookie/core/src/utils/hooks/use-debounce';
import { useEffect, useState } from 'react';
import FinancialsLogo from '../../components/svg/financials-logo-big.svg';
import { API_BASE_URL } from '../../constants/api-base-url';

const BudgetPage = () => {
  const { authorizedUser, setAuthorizedUser } = useAuth();
  const student = authorizedUser as Student;
  const [budget, setBudget] = useState<Budget>({
    totalBudget: +student?.totalBudget || 0,
    savingsBudget: +student?.savingsBudget || 0,
    moneySpent: getMoneySpent(student),
  });
  const debouncedSavings = useDebounce(budget?.savingsBudget, 1000);

  useEffect(() => {
    if (!student || +student.savingsBudget === debouncedSavings) {
      return;
    }
    updateStudent(student?._id, budget, API_BASE_URL, setAuthorizedUser);
  }, [debouncedSavings]);

  return (
    <div className="flex flex-col h-full">
      <div className="h-header relative flex items-center justify-between">
        <div className="pt-4 pl-14">
          <ObjectivesBoard
            visibleObjectives={1}
            size="small"
            filterComplete={true}
          />
        </div>
        <FinancialsLogo
          // @ts-ignore
          className="absolute left-1/2 top-2 -translate-x-1/2"
          width={175}
        />
        <StickButton href={'/game/home'} inverse={true}>
          <HomeStick />
        </StickButton>
      </div>
      <div className="px-14 flex-1 mt-4">
        <div className="h-full bg-neutral-200 rounded-md border-4 border-neutral-700 p-4">
          <BudgetEquation budget={budget} />
          <p className="text-primary text-center my-4 mx-auto w-2/4 text-xl px-8">
            Move the yellow puck to change how much you save!
          </p>
          <div
            className="budget-slider-container"
            style={{ marginTop: '-6.5rem' }}
          >
            <div className="-translate-y-2">
              <BudgetSlider
                budget={budget}
                // budget={
                //   tutorialState.isActive
                //     ? tutorialBudget
                //     : {
                //         total: +student.totalBudget,
                //         savings: +student.savingsBudget,
                //         spent: moneySpent,
                //       }
                // }
                // setValue={updateSavings}
                onSavingsChange={(val: number) => {
                  setBudget((prevBudget) => ({
                    ...prevBudget,
                    savingsBudget: val,
                  }));
                }}
                student={student}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <Footer pageLinks={['team', 'season', 'trophies']} />
      </div>
    </div>
  );
};

const ProtectedBudgetPage = () => {
  return (
    <ProtectedRoute apiBaseUrl={API_BASE_URL} permittedRoles="*">
      <BudgetPage />
    </ProtectedRoute>
  );
};

ProtectedBudgetPage.getLayout = function getLayout(page: any) {
  return <GameProvider>{page}</GameProvider>;
};

export default ProtectedBudgetPage;
