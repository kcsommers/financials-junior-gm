import { Indicator } from '@components';
import { BudgetSliderSvg } from './BudgetSliderSvg';
import { getDollarString } from '@utils';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import '@css/components/budget-page/BudgetSlider.css';

export const BudgetSlider = ({
  budget,
  setValue,
  student,
  spendingLabel = 'Spending Budget',
  totalDisplay,
}) => {
  const sliderAnimationState = useSelector(
    (state) => state.tutorial.budget.slider
  );
  const indicatorAnimationState = useSelector(
    (state) => state.tutorial.budget.savingsIndicator
  );

  const getSavingsIndicatorPosition = () => {
    const pct = (budget.savings / (budget.total - budget.spent)) * 100;
    return {
      right: `${pct}%`,
      transform: `translateX(${pct}%)`,
    };
  };

  const getSliderWidth = () => {
    if (!budget.spent) {
      return '100%';
    }

    const spentPct = budget.spent / budget.total;
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

  const ticks = [];
  const tickLabels = [];
  const everyOtherLabel = !!(
    (+student.level === 1 && budget.total > 15) ||
    (+student.level === 2 && budget.total > 150) ||
    (+student.level === 3 && budget.total > 1500)
  );
  let counter = 0;
  for (let i = budget.total; i >= 0; i = desc(i)) {
    ticks.push(<span key={`tick-${i}`} className="tick"></span>);
    tickLabels.push(
      <span key={`tick-label-${i}`} className="tick-label">
        <span className="tick-label-inner">
          {!everyOtherLabel || counter % 2 === 0 ? i : ''}
        </span>
      </span>
    );
    counter++;
  }

  return (
    <motion.div
      className="budget-slider-wrap"
      transition={{ default: { duration: 1 } }}
      animate={sliderAnimationState}
    >
      <div className="top-indicators-container">
        {budget.spent > 0 && (
          <div className="spent-indicator-wrap">
            <p className="color-primary">
              {getDollarString(budget.spent, true)} <br /> Spent
            </p>
          </div>
        )}
        <div className="spending-indicator-wrap">
          <p className="color-primary">
            {getDollarString(
              totalDisplay
                ? totalDisplay
                : budget.total - budget.spent - budget.savings,
              true
            )}{' '}
            <br /> {spendingLabel}
          </p>
        </div>
      </div>
      <div className="budget-slider-stick-wrap">
        <BudgetSliderSvg budget={budget} />
      </div>

      <div className="slider-outer">
        <div className="slider-wrap">
          <div className="slider-scale-wrap">
            <div className="ticks-container">{ticks}</div>
            <div className="tick-labels-container">{tickLabels}</div>
          </div>

          <div
            className="slider-input-wrap"
            style={{
              width: getSliderWidth(),
            }}
          >
            <div className="slider-input-wrap-inner">
              <motion.div
                className="savings-indicator-wrap"
                style={getSavingsIndicatorPosition()}
                animate={indicatorAnimationState}
              >
                <Indicator
                  amount={budget.savings}
                  direction="top"
                  borderColor="#ffd782"
                  isMoney={true}
                />
                <p className="color-primary">Savings</p>
              </motion.div>
              <input
                type="range"
                min="0"
                max={budget.total - budget.spent}
                value={budget.savings}
                step={
                  +student.level === 1 ? 1 : +student.level === 2 ? 10 : 100
                }
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
