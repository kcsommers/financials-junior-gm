import { useAuth } from '@statrookie/core/src/auth/context/auth-context';
import { BudgetEquation } from '@statrookie/core/src/components/BudgetEquation';
import { BudgetSlider } from '@statrookie/core/src/components/BudgetSlider';
import { Footer } from '@statrookie/core/src/components/Footer';
import { GamePageWrap } from '@statrookie/core/src/components/GamePageWrap';
import { Header } from '@statrookie/core/src/components/Header';
import { LoadingSpinner } from '@statrookie/core/src/components/LoadingSpinner';
import { Modal } from '@statrookie/core/src/components/Modal';
import { ProtectedRoute } from '@statrookie/core/src/components/ProtectedRoute';
import { RollOverBudgetModal } from '@statrookie/core/src/components/RollOverBudgetModal';
import ComericaLogo from '@statrookie/core/src/components/svg/comerica-logo.svg';
import { Budget } from '@statrookie/core/src/game/budget/budget';
import { getStudentBudget } from '@statrookie/core/src/game/budget/get-student-budget';
import { GameProvider } from '@statrookie/core/src/game/game-context';
import { checkBudgetObjective } from '@statrookie/core/src/game/objectives/check-budget-objective';
import { Student } from '@statrookie/core/src/student/student.interface';
import { updateStudent } from '@statrookie/core/src/student/update-student';
import { getDollarString } from '@statrookie/core/src/utils/get-dollar-string';
import { useDebounce } from '@statrookie/core/src/utils/hooks/use-debounce';
import { useEffect, useState } from 'react';
import FinancialsLogo from '../../components/svg/financials-logo-big.svg';
import { API_BASE_URL } from '../../constants/api-base-url';
import { opposingTeams } from '../../game/teams/opposing-teams';
import { studentTeams } from '../../game/teams/student-teams';

const BudgetPage = () => {
  const { authorizedUser, setAuthorizedUser } = useAuth();
  const student = authorizedUser as Student;
  const [budget, setBudget] = useState<Budget>(getStudentBudget(student));
  const debouncedSavings = useDebounce(budget?.savingsBudget, 1000);
  const [showRolloverBudgetModal, setShowRolloverBudgetModal] = useState(false);

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

  useEffect(() => {
    (async () => {
      const updateStudentRes = await checkBudgetObjective(
        student,
        API_BASE_URL
      );
      if (updateStudentRes) {
        setAuthorizedUser(updateStudentRes.updatedStudent);
      }
    })();
  }, []);

  const onUseRollOverBudget = async (rollOverToAdd: number) => {
    setShowRolloverBudgetModal(false);
    if (!rollOverToAdd) {
      return;
    }

    const newTotalBudget = +student.totalBudget + rollOverToAdd;
    const newRollOverBudget = +student.rollOverBudget - rollOverToAdd;

    try {
      const updateStudentRes = await updateStudent(
        student._id,
        {
          totalBudget: newTotalBudget,
          rollOverBudget: newRollOverBudget,
        },
        API_BASE_URL
      );
      setAuthorizedUser(updateStudentRes.updatedStudent);
      setBudget(getStudentBudget(updateStudentRes.updatedStudent));
    } catch (error) {
      // @TODO error handle
    }
  };

  return !student ? (
    <LoadingSpinner isFullPage={true} />
  ) : (
    <div className="flex flex-col h-full">
      <Header inverse={true}>
        <FinancialsLogo
          // @ts-ignore
          className="absolute left-1/2 top-2 -translate-x-1/2"
          width={175}
        />
      </Header>
      <div className="bg-neutral-200 rounded-md border-4 border-neutral-700 p-4 mx-14 mt-4 flex-1 relative">
        {+student.rollOverBudget > 0 && (
          <div className="text-center absolute flex flex-col items-center justify-center">
            <span className="rollover-budget-indicator-wrap">
              {/* @ts-ignore */}
              <ComericaLogo width="150px" />
              <button
                className="rounded-full border-foreground border-4 w-[75px] h-[75px] p-[0.15rem] my-1"
                onClick={() => setShowRolloverBudgetModal(true)}
              >
                <span className="w-full h-full rounded-full bg-foreground inline-flex items-center justify-center text-white">
                  {getDollarString(+student.rollOverBudget)}
                </span>
              </button>
            </span>
            <p className="text-foreground text-sm w-[150px]">
              Click the Comerica Savings Button to use last season's savings
            </p>
          </div>
        )}
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
      <Modal
        isVisible={showRolloverBudgetModal}
        onClose={() => setShowRolloverBudgetModal(false)}
      >
        <RollOverBudgetModal
          student={student}
          apiBaseUrl={API_BASE_URL}
          onUseRollOverBudget={onUseRollOverBudget}
        />
      </Modal>
    </div>
  );
};

const ProtectedBudgetPage = () => {
  return (
    <ProtectedRoute apiBaseUrl={API_BASE_URL} permittedRoles="*">
      <GamePageWrap
        studentTeams={studentTeams}
        opposingTeams={opposingTeams}
        apiBaseUrl={API_BASE_URL}
      >
        <BudgetPage />
      </GamePageWrap>
    </ProtectedRoute>
  );
};

ProtectedBudgetPage.getLayout = function getLayout(page: any) {
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

export default ProtectedBudgetPage;
