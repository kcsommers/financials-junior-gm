import { Indicator } from '@components';
import { BudgetSliderSvg } from './BudgetSliderSvg';
import { getDollarString } from '@utils';
import '@css/components/budget-page/BudgetSlider.css';

export const BudgetSlider = ({ budget, setValue, student }) => {
  const getSavingsIndicatorPosition = () => {
    const pct = (budget.savings / (budget.total - budget.spent)) * 100;
    return {
      right: `${pct}%`,
      transform: `translateX(${pct}%)`,
    };
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
  for (let i = budget.total; i >= 0; i = desc(i)) {
    ticks.push(<span key={`tick-${i}`} className='tick'></span>);
    tickLabels.push(
      <span key={`tick-label-${i}`} className='tick-label'>
        <span className='tick-label-inner'>{i}</span>
      </span>
    );
  }

  return (
    <div className='budget-slider-wrap'>
      <div className='top-indicators-container'>
        {budget.spent > 0 && (
          <div className='spent-indicator-wrap'>
            <p className='color-primary'>
              {getDollarString(budget.spent, true)} <br /> Spent
            </p>
          </div>
        )}
        <div className='spending-indicator-wrap'>
          <p className='color-primary'>
            {getDollarString(
              budget.total + budget.spent - budget.savings,
              true
            )}{' '}
            <br /> Spending Budget
          </p>
        </div>
      </div>
      <div className='budget-slider-stick-wrap'>
        <BudgetSliderSvg budget={budget} />
      </div>
      <div className='slider-outer'>
        <div className='slider-wrap'>
          <div className='ticks-container'>{ticks}</div>
          <div className='tick-labels-container'>{tickLabels}</div>
          <div
            className='savings-indicator-wrap'
            style={getSavingsIndicatorPosition()}
          >
            <Indicator
              amount={budget.savings}
              direction='top'
              borderColor='#ffd782'
              isMoney={true}
            />
            <p className='color-primary'>Savings</p>
          </div>
          <input
            type='range'
            min='0'
            max={budget.total - budget.spent}
            value={budget.savings}
            step={+student.level === 1 ? 1 : +student.level === 2 ? 10 : 100}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};
