import { Indicator } from '@components';
import { BudgetSliderSvg } from './BudgetSliderSvg';
import '@css/components/budget-page/BudgetSlider.css';

export const BudgetSlider = ({ budget, setValue }) => {
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

  const getIndicatorPosition = () => {
    const pct = (budget.savings / (budget.total - budget.spent)) * 100;
    return {
      right: `${pct}%`,
      transform: `translateX(${pct}%)`,
    };
  };

  const indicatorPosition = getIndicatorPosition();
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
        <div className='slider-scale-wrap'>{scaleMarkers}</div>
        <div className='slider-wrap' style={{ width: sliderWidth }}>
          <input
            type='range'
            min='0'
            max={budget.total - budget.spent}
            value={budget.savings}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          ></input>
          <div className='savings-indicator-wrap' style={indicatorPosition}>
            <Indicator amount={budget.savings} direction='top' />
          </div>
        </div>
      </div>
    </div>
  );
};
