import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuth } from '../../auth/context/auth-context';
import { BudgetEquation } from '../../components/BudgetEquation';
import { BudgetSlider } from '../../components/BudgetSlider';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { HelpButton } from '../../components/HelpButton';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { Modal } from '../../components/Modal';
import { RollOverBudgetModal } from '../../components/RollOverBudgetModal';
import ComericaLogo from '../../components/svg/comerica-logo.svg';
import { budgetFaqs } from '../../faqs/budget-faqs';
import { FaqBoard } from '../../faqs/FaqBoard';
import { Budget } from '../../game/budget/budget';
import { getStudentBudget } from '../../game/budget/get-student-budget';
import { checkBudgetObjective } from '../../game/objectives/check-budget-objective';
import { Student } from '../../student/student.interface';
import { updateStudent } from '../../student/update-student';
import { BudgetTutorialComponents } from '../../tutorial/component-configs/budget-tutorial-components';
import { Tutorial } from '../../tutorial/Tutorial';
import { useTutorial } from '../../tutorial/use-tutorial';
import { getDollarString } from '../../utils/get-dollar-string';
import { useDebounce } from '../../utils/hooks/use-debounce';
import { GamePageProps } from './game-page-props';

export const CoreBudgetPage = ({
  apiBaseUrl,
  tutorialSlides,
  helpButtonIcon,
  logo,
}: GamePageProps) => {
  const { authorizedUser, setAuthorizedUser } = useAuth();
  const student = authorizedUser as Student;
  const [budget, setBudget] = useState<Budget>(getStudentBudget(student));
  const debouncedSavings = useDebounce(budget?.savingsBudget, 1000);
  const [showRolloverBudgetModal, setShowRolloverBudgetModal] = useState(false);
  const [showFaqModal, setShowFaqModal] = useState(false);
  const [checkedRedirect, setCheckedRedirect] = useState(false);
  const router = useRouter();
  const {
    activeTutorial,
    requestedTutorial,
    setRequestedTutorial,
    tutorialComponentConfigs,
    setTutorialComponentConfigs,
    onTutorialExit,
    tutorialActionListener,
    setTutorialActionListener,
  } = useTutorial<BudgetTutorialComponents, {}>('budget', apiBaseUrl);

  useEffect(() => {
    const shouldRedirect = !student?.tutorials?.home;
    if (shouldRedirect) {
      router.push('/game/home');
    } else {
      setCheckedRedirect(true);
    }
  }, []);

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
        apiBaseUrl
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
      const updateStudentRes = await checkBudgetObjective(student, apiBaseUrl);
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
        apiBaseUrl
      );
      setAuthorizedUser(updateStudentRes.updatedStudent);
      setBudget(getStudentBudget(updateStudentRes.updatedStudent));
    } catch (error) {
      // @TODO error handle
    }
  };

  return !student || !checkedRedirect ? (
    <LoadingSpinner isFullPage={true} />
  ) : (
    <div className="flex flex-col h-full">
      <Header inverse={true}>{logo}</Header>
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
              {helpButtonIcon}
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
          apiBaseUrl={apiBaseUrl}
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
              requestedTutorial
                ? tutorialSlides.confirmStart
                : tutorialSlides.main
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
