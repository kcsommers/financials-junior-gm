import { Indicator } from '@components';
import { BudgetSliderSvg } from './BudgetSliderSvg';
import '@css/components/budget-page/BudgetSlider.css';

export const BudgetSlider = ({ budget, setValue, tutorialActive }) => {
  const getStops = () => {
    const spentPct = budget.spent / budget.total;
    const savingsPct = budget.savings / budget.total;

    const bottomSpentStop = spentPct > 0 ? Math.min(1, spentPct + 0.2) : 0;
    const topSpentStop = spentPct > 0.8 ? (spentPct - 0.8) / 0.2 : 0;

    const bottomSavingsStop = savingsPct > 0.2 ? 1 : 0;
    const bottomSavingsStart =
      savingsPct === 1 ? -0.2 : savingsPct > 0.2 ? 1 - (savingsPct - 0.2) : 0;

    const topSavingsStop = savingsPct > 0 ? 1 : 0;
    const topsSavingsStart =
      savingsPct > 0 ? (savingsPct >= 0.2 ? 0 : (0.2 - savingsPct) / 0.2) : 0;

    return {
      bottom: {
        spentStart: '0%',
        spentStop: `${bottomSpentStop * 100}%`,
        spendingStart: `${bottomSpentStop * 100}%`,
        spendingStop: `${(savingsPct > 0.2 ? bottomSavingsStart : 1) * 100}%`,
        savingsStart: `${bottomSavingsStart * 100}%`,
        savingsStop: `${bottomSavingsStop * 100}%`,
      },
      top: {
        spentStart: '0%',
        spentStop: `${topSpentStop * 100}%`,
        spendingStart: `${topSpentStop * 100}%`,
        spendingStop: `${(savingsPct > 0 ? topsSavingsStart : 1) * 100}%`,
        savingsStart: `${topsSavingsStart * 100}%`,
        savingsEnd: `${topSavingsStop * 100}%`,
      },
    };
  };

  const getSavingsIndicatorPosition = () => {
    const pct = (budget.savings / (budget.total - budget.spent)) * 100;
    return {
      right: `${pct}%`,
      transform: `translateX(${pct}%)`,
    };
  };

  const savingsIndicatorPosition = getSavingsIndicatorPosition();
  const stops = getStops();

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
        <BudgetSliderSvg stops={stops} />
      </div>
      <div className='slider-outer'>
        <div
          className={`top-indicators-container${
            tutorialActive ? ' hidden' : ''
          }`}
        >
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
            className={`savings-indicator-wrap${
              tutorialActive ? ' hidden' : ''
            }`}
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
