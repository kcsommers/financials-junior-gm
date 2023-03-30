import { Indicator } from '../../components/Indicator';
import { Budget } from '../../game/budget/budget';
import { Student } from '../../student/student.interface';
import { getDollarString } from '../../utils/get-dollar-string';
import styles from './BudgetSlider.module.scss';
import { BudgetSliderSvg } from './BudgetSliderSvg';

type BudgetSliderProps = {
  student: Student;
  budget: Budget;
  spendingLabel?: string;
  totalDisplay?: string;
  onSavingsChange?: (value: number) => void;
};

export const BudgetSlider = ({
  budget,
  onSavingsChange,
  student,
  spendingLabel = 'Spending Budget',
  totalDisplay = '',
}: BudgetSliderProps) => {
  const getSavingsIndicatorPosition = () => {
    const pct =
      (budget.savingsBudget / (budget.totalBudget - budget.moneySpent)) * 100;
    return {
      right: `${pct}%`,
      transform: `translateX(${pct}%)`,
    };
  };

  const getSliderWidth = () => {
    if (!budget.moneySpent) {
      return '100%';
    }

    const spentPct = budget.moneySpent / budget.totalBudget;
    return `${(1 - spentPct) * 100}%`;
  };

  const desc = (i) => {
    if (+student.level === 3) {
      return i - 100;
    }
    if (+student.level === 2) {
      return i - 10;
    }
    return i - 1;
  };

  const ticks: any[] = [];
  const tickLabels: any[] = [];
  const everyOtherLabel = !!(
    (+student.level === 1 && budget.totalBudget > 15) ||
    (+student.level === 2 && budget.totalBudget > 150) ||
    (+student.level === 3 && budget.totalBudget > 1500)
  );
  let counter = 0;
  for (let i = budget.totalBudget; i >= 0; i = desc(i)) {
    ticks.push(<span key={`tick-${i}`} className={styles.tick}></span>);
    tickLabels.push(
      <span key={`tick-label-${i}`} className={styles.tick_label}>
        <span className={styles.tick_label_inner}>
          {!everyOtherLabel || counter % 2 === 0 ? i : ''}
        </span>
      </span>
    );
    counter++;
  }

  return (
    <div className={styles.budget_slider_wrap}>
      <div className={styles.top_indicators_container}>
        {budget.moneySpent > 0 && (
          <div className={styles.spent_indicator_wrap}>
            <p className="text-danger font-bold">
              {getDollarString(budget.moneySpent, true)} <br /> Spent
            </p>
          </div>
        )}
        <div className={styles.spending_indicator_wrap}>
          <p className="text-primary">
            {getDollarString(
              totalDisplay
                ? totalDisplay
                : budget.totalBudget - budget.moneySpent - budget.savingsBudget,
              true
            )}{' '}
            <br /> {spendingLabel}
          </p>
        </div>
      </div>
      <div className={styles.budget_slider_stick_wrap}>
        <BudgetSliderSvg budget={budget} />
      </div>

      <div className={styles.slider_outer}>
        <div className={styles.slider_wrap}>
          <div className={styles.slider_scale_wrap}>
            <div className={styles.ticks_container}>{ticks}</div>
            <div className={styles.tick_labels_container}>{tickLabels}</div>
          </div>

          <div
            className={styles.slider_input_wrap}
            style={{
              width: getSliderWidth(),
            }}
          >
            <div className={styles.slider_input_wrap_inner}>
              <div
                className={styles.savings_indicator_wrap}
                style={getSavingsIndicatorPosition()}
              >
                <Indicator
                  value={budget.savingsBudget}
                  direction="top"
                  bgColor="highlight"
                  isMoney={true}
                />
                <p className="text-primary">Savings</p>
              </div>
              <input
                type="range"
                min="0"
                max={budget.totalBudget - budget.moneySpent}
                value={budget.savingsBudget}
                step={
                  +student.level === 1 ? 1 : +student.level === 2 ? 10 : 100
                }
                onChange={(e) => {
                  onSavingsChange && onSavingsChange(+e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
