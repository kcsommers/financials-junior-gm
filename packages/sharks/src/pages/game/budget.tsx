import { useAuth } from '@statrookie/core/src/auth/context/auth-context';
import { BudgetEquation } from '@statrookie/core/src/components/BudgetEquation';
import { BudgetSlider } from '@statrookie/core/src/components/BudgetSlider';
import { Footer } from '@statrookie/core/src/components/Footer';
import { Header } from '@statrookie/core/src/components/Header';
import { ProtectedRoute } from '@statrookie/core/src/components/ProtectedRoute';
import { Budget } from '@statrookie/core/src/game/budget/budget';
import { getStudentBudget } from '@statrookie/core/src/game/budget/utils/get-student-budget';
import { GameProvider } from '@statrookie/core/src/game/game-context';
import { Student } from '@statrookie/core/src/student/student.interface';
import { updateStudent } from '@statrookie/core/src/student/update-student';
import { useDebounce } from '@statrookie/core/src/utils/hooks/use-debounce';
import { useEffect, useState } from 'react';
import FinancialsLogo from '../../components/svg/financials-logo-big.svg';
import { API_BASE_URL } from '../../constants/api-base-url';

const BudgetPage = () => {
  const { authorizedUser, setAuthorizedUser } = useAuth();
  const student = authorizedUser as Student;
  const [budget, setBudget] = useState<Budget>(getStudentBudget(student));
  const debouncedSavings = useDebounce(budget?.savingsBudget, 1000);

  useEffect(() => {
    if (!student || +student.savingsBudget === debouncedSavings) {
      return;
    }
    (async () => {
      const updateStudentRes = await updateStudent(
        student?._id,
        budget,
        API_BASE_URL
      );
      setAuthorizedUser(updateStudentRes.updatedStudent);
    })();
  }, [debouncedSavings]);

  return (
    <div className="flex flex-col h-full">
      <Header inverse={true}>
        <FinancialsLogo
          // @ts-ignore
          className="absolute left-1/2 top-2 -translate-x-1/2"
          width={175}
        />
      </Header>
      <div className="bg-neutral-200 rounded-md border-4 border-neutral-700 p-4 mx-14 mt-4 flex-1">
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
      <Footer pageLinks={['team', 'season', 'trophies']} />
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
