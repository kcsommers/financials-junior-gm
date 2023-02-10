import classNames from 'classnames';
import { Budget } from '../../game/budget/budget';
import { getDollarString } from '../../utils/get-dollar-string';

type BudgetEquationProps = {
  budget: Budget;
};

export const BudgetEquation = ({ budget }: BudgetEquationProps) => {
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
        <div className="flex flex-col items-center justify-center">
          <span className="text-lg">Total Budget</span>
          <span className="text-4xl mt-2">
            {getDollarString(budget.totalBudget - budget.moneySpent, true)}
          </span>
        </div>
        <span className="text-5xl self-end">-</span>
        <div className="flex flex-col items-center justify-center">
          <span className="text-lg">Savings</span>
          <span className="text-4xl mt-2">
            {getDollarString(budget.savingsBudget, true)}
          </span>
        </div>
        <span className="text-5xl self-end">=</span>
        <div className="flex flex-col items-center justify-center">
          <span className="etext-lg">Spending Budget</span>
          <span className="text-4xl mt-2">
            {getDollarString(
              budget.totalBudget - budget.moneySpent - budget.savingsBudget,
              true
            )}
          </span>
        </div>
      </div>
    </div>
  );
};
