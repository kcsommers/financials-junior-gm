import { BudgetTutorialComponents } from '@statrookie/core/src/tutorial/component-configs/budget-tutorial-components';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { Budget } from '../../game/budget/budget';
import { getDollarString } from '../../utils/get-dollar-string';

type BudgetEquationProps = {
  budget: Budget;
  tutorialComponents: BudgetTutorialComponents;
};

export const BudgetEquation = ({
  budget,
  tutorialComponents,
}: BudgetEquationProps) => {
  return (
    <div
      className={classNames(
        'shadow-mat border-10 border-primary rounded-md bg-neutral-700',
        'text-white py-1 mx-auto'
      )}
      style={{ width: '500px' }}
    >
      <h4 className="text-center text-2xl font-bold whitespace-nowrap">
        Budget Equation
      </h4>
      <div className="flex justify-center pt-2 pb-1">
        <motion.div
          animate="animate"
          initial={false}
          variants={tutorialComponents.totalBudget?.variants}
          transition={
            tutorialComponents.totalBudget?.transition || { duration: 1 }
          }
          className="flex flex-col items-center justify-center"
        >
          <span className="text-lg">Total Budget</span>
          <span className="text-4xl mt-2">
            {getDollarString(budget.totalBudget - budget.moneySpent, true)}
          </span>
        </motion.div>
        <span className="text-5xl self-end">-</span>
        <motion.div
          animate="animate"
          variants={tutorialComponents.savingsBudget?.variants}
          transition={
            tutorialComponents.savingsBudget?.transition || { duration: 1 }
          }
          className="flex flex-col items-center justify-center"
        >
          <span className="text-lg">Savings</span>
          <span className="text-4xl mt-2">
            {getDollarString(budget.savingsBudget, true)}
          </span>
        </motion.div>
        <span className="text-5xl self-end">=</span>
        <motion.div
          animate="animate"
          variants={tutorialComponents.spendingBudget?.variants}
          transition={
            tutorialComponents.spendingBudget?.transition || { duration: 1 }
          }
          className="flex flex-col items-center justify-center"
        >
          <span className="etext-lg">Spending Budget</span>
          <span className="text-4xl mt-2">
            {getDollarString(budget.spendingBudget, true)}
          </span>
        </motion.div>
      </div>
    </div>
  );
};
