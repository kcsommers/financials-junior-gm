import { useAuth } from '@statrookie/core/src/auth/context/auth-context';
import { BudgetEquation } from '@statrookie/core/src/components/BudgetEquation';
import { BudgetSlider } from '@statrookie/core/src/components/BudgetSlider';
import { Footer } from '@statrookie/core/src/components/Footer';
import { GamePageWrap } from '@statrookie/core/src/components/GamePageWrap';
import { Header } from '@statrookie/core/src/components/Header';
import { HelpButton } from '@statrookie/core/src/components/HelpButton';
import { LoadingSpinner } from '@statrookie/core/src/components/LoadingSpinner';
import { Modal } from '@statrookie/core/src/components/Modal';
import { ProtectedRoute } from '@statrookie/core/src/components/ProtectedRoute';
import { RollOverBudgetModal } from '@statrookie/core/src/components/RollOverBudgetModal';
import ComericaLogo from '@statrookie/core/src/components/svg/comerica-logo.svg';
import { budgetFaqs } from '@statrookie/core/src/faqs/budget-faqs';
import { FaqBoard } from '@statrookie/core/src/faqs/FaqBoard';
import { Budget } from '@statrookie/core/src/game/budget/budget';
import { getStudentBudget } from '@statrookie/core/src/game/budget/get-student-budget';
import { GameProvider } from '@statrookie/core/src/game/game-context';
import { checkBudgetObjective } from '@statrookie/core/src/game/objectives/check-budget-objective';
import { Student } from '@statrookie/core/src/student/student.interface';
import { updateStudent } from '@statrookie/core/src/student/update-student';
import { BudgetTutorialComponents } from '@statrookie/core/src/tutorial/component-configs/budget-tutorial-components';
import { Tutorial } from '@statrookie/core/src/tutorial/Tutorial';
import { useTutorial } from '@statrookie/core/src/tutorial/use-tutorial';
import { getDollarString } from '@statrookie/core/src/utils/get-dollar-string';
import { useDebounce } from '@statrookie/core/src/utils/hooks/use-debounce';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { confirmStartTutorialSlide } from 'src/tutorial/slides/confirm-start-tutorial-slide';
import FinancialsLogo from '../../components/svg/financials-logo-big.svg';
import SharkieButton from '../../components/svg/sharkie-btn.svg';
import { API_BASE_URL } from '../../constants/api-base-url';
import { opposingTeams } from '../../game/teams/opposing-teams';
import { studentTeams } from '../../game/teams/student-teams';
import { budgetSlides } from '../../tutorial/slides/budget-slides';

const BudgetPage = () => {
  const { authorizedUser, setAuthorizedUser } = useAuth();
  const student = authorizedUser as Student;
  const [budget, setBudget] = useState<Budget>(getStudentBudget(student));
  const debouncedSavings = useDebounce(budget?.savingsBudget, 1000);
  const [showRolloverBudgetModal, setShowRolloverBudgetModal] = useState(false);
  const [showFaqModal, setShowFaqModal] = useState(false);
  const {
    activeTutorial,
    requestedTutorial,
    setRequestedTutorial,
    tutorialComponentConfigs,
    setTutorialComponentConfigs,
    onTutorialExit,
    tutorialActionListener,
    setTutorialActionListener,
  } = useTutorial<BudgetTutorialComponents, {}>('budget', API_BASE_URL);

  useEffect(() => {
    // @TODO set tutorial budget
    if (activeTutorial) {
      setBudget({
        totalBudget: 15,
        savingsBudget: 9,
        spendingBudget: 6,
        moneySpent: 0,
      });
    } else {
      setBudget(getStudentBudget(student));
    }
  }, [activeTutorial]);

  useEffect(() => {
    if (
      !student ||
      +student.savingsBudget === debouncedSavings ||
      activeTutorial
    ) {
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
    if (!activeTutorial || !budget) {
      return;
    }
    if (tutorialActionListener.current) {
      tutorialActionListener.current(budget);
    }
  }, [budget?.savingsBudget]);

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
          <div
            className={classNames(
              'text-center absolute flex flex-col items-center justify-center',
              {
                'z-50': !activeTutorial && !requestedTutorial,
              }
            )}
          >
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
        <motion.div
          className="relative"
          animate="animate"
          variants={tutorialComponentConfigs.budgetEquation?.variants}
          transition={
            tutorialComponentConfigs.budgetEquation?.transition || {
              duration: 1,
            }
          }
        >
          <BudgetEquation
            budget={budget}
            tutorialComponents={tutorialComponentConfigs}
          />
          <span className="absolute top-8 -right-4 -translate-y-1/2">
            <HelpButton
              text="CALL S.J. SHARKIE!"
              textPosition="left"
              onClick={() => setShowFaqModal(true)}
            >
              <SharkieButton />
            </HelpButton>
          </span>
        </motion.div>
        <p className="text-primary text-center my-4 mx-auto w-2/4 text-xl px-8">
          Move the yellow puck to change how much you save!
        </p>
        <div
          className="budget-slider-container relative"
          style={{
            marginTop: '-6.5rem',
            zIndex:
              tutorialComponentConfigs.budgetSlider?.variants.animate.zIndex ||
              'auto',
          }}
        >
          <div className="-translate-y-2">
            <motion.div
              animate="animate"
              variants={tutorialComponentConfigs.budgetSlider?.variants}
              transition={
                tutorialComponentConfigs.budgetSlider?.transition || {
                  duration: 1,
                }
              }
            >
              <BudgetSlider
                budget={budget}
                onSavingsChange={(val: number) => {
                  setBudget((prevBudget) => {
                    return {
                      ...prevBudget,
                      savingsBudget: val,
                      spendingBudget:
                        prevBudget.totalBudget - prevBudget.moneySpent - val,
                    };
                  });
                }}
                student={student}
              />
            </motion.div>
          </div>
        </div>
      </div>
      <div
        className={classNames({
          'z-0': !!(activeTutorial || requestedTutorial),
        })}
      >
        <Footer pageLinks={['team', 'season', 'trophies']} />
      </div>
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
      <Modal isVisible={showFaqModal} onClose={() => setShowFaqModal(false)}>
        <FaqBoard
          faqs={budgetFaqs}
          title="Budget Page FAQs"
          onWatchTutorial={() => {
            setShowFaqModal(false);
            setRequestedTutorial('budget');
          }}
        />
      </Modal>
      {/* @ts-ignore */}
      <AnimatePresence>
        {!!(activeTutorial || requestedTutorial) && (
          <Tutorial<BudgetTutorialComponents>
            activeTutorial={activeTutorial}
            requestedTutorial={requestedTutorial}
            slides={
              requestedTutorial ? confirmStartTutorialSlide : budgetSlides
            }
            onExit={onTutorialExit}
            setComponentConfigs={setTutorialComponentConfigs}
            setActionListener={setTutorialActionListener}
          />
        )}
      </AnimatePresence>
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
