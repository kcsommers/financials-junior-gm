import { Indicator } from '@components';
import { BudgetSliderSvg } from './BudgetSliderSvg';
import '@css/components/budget-page/BudgetSlider.css';

export const BudgetSlider = ({ budget, setValue }) => {
  const getSavingsIndicatorPosition = () => {
    const pct = (budget.savings / (budget.total - budget.spent)) * 100;
    return {
      right: `${pct}%`,
      transform: `translateX(${pct}%)`,
    };
  };

  const savingsIndicatorPosition = getSavingsIndicatorPosition();

  const sliderWidth = `${
    ((budget.total - budget.spent) / budget.total) * 100
  }%`;

  const scaleMarkers = [];
  for (let i = budget.total; i >= 0; i--) {
    scaleMarkers.push(
      <div key={i} className='slider-scale-marker'>
        <span>{i}</span>
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
                {`$${budget.spent}`} <br /> Spent
              </p>
            </div>
          )}
          <div className='spending-indicator-wrap'>
            <p className='color-primary'>
              {`$${budget.total - budget.spent - budget.savings}`} <br />{' '}
              Spending Budget
            </p>
          </div>
        </div>
        <div className='slider-scale-wrap'>{scaleMarkers}</div>
        <div
          className='slider-wrap'
          style={{
            width: `calc(${sliderWidth} + ${
              71.46 / (budget.total / budget.spent)
            }px)`,
          }}
        >
          <input
            type='range'
            min='0'
            max={budget.total - budget.spent}
            value={budget.savings}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          ></input>
          <div
            className='savings-indicator-wrap'
            style={savingsIndicatorPosition}
          >
            <Indicator
              amount={`$${budget.savings}`}
              direction='top'
              highlight={true}
            />
            <p className='color-primary'>Savings</p>
          </div>
        </div>
      </div>
    </div>
  );
};
