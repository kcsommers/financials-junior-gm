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

  const savingsIndicatorPosition = getSavingsIndicatorPosition();

  const getSliderWidth = () => {
    if (+student.level === 1) {
      return `${((budget.total - budget.spent) / 16) * 100}%`;
    }
    if (+student.level === 2) {
      return `${((budget.total - budget.spent) / 160) * 100}%`;
    }
    if (+student.level === 3) {
      return `${((budget.total - budget.spent) / 1600) * 100}%`;
    }
  };

  const scaleMarkers = [];
  for (let i = 15; i >= 0; i--) {
    scaleMarkers.push(
      <div key={i} className='slider-scale-marker'>
        <span>
          {+student.level === 1 ? i : +student.level === 2 ? i * 10 : i * 100}
        </span>
      </div>
    );
  }

  return (
    <div className='budget-slider-wrap'>
      <div className='budget-slider-stick-wrap'>
        <BudgetSliderSvg budget={budget} />
      </div>
      <div className='slider-outer'>
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
        <div className='slider-scale-wrap'>{scaleMarkers}</div>
        <div
          className={`slider-wrap${
            !budget.spent && budget.spent !== '0' ? ' no-spent' : ''
          }`}
          style={{
            width: `calc(${getSliderWidth()} + 75px)`,
          }}
        >
          <input
            type='range'
            min='0'
            max={budget.total - budget.spent}
            value={budget.savings}
            step={+student.level === 1 ? 1 : +student.level === 2 ? 10 : 100}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          ></input>
          <div
            className='savings-indicator-wrap'
            style={savingsIndicatorPosition}
          >
            <Indicator
              amount={budget.savings}
              direction='top'
              borderColor='#ffd782'
              isMoney={true}
            />
            <p className='color-primary'>Savings</p>
          </div>
        </div>
      </div>
    </div>
  );
};
