import {
  TeamStickSvg,
  BudgetStickSvg,
  SeasonStickSvg,
  ScoutStickSvg,
  TrophiesStickSvg,
} from '@components';
import { useHistory } from 'react-router-dom';
import '@css/components/StickButton.css';

const sticks = {
  team: <TeamStickSvg />,
  budget: <BudgetStickSvg />,
  season: <SeasonStickSvg />,
  scout: <ScoutStickSvg />,
  trophies: <TrophiesStickSvg />,
};

export const StickButton = ({
  link,
  stick,
  inverse = false,
  small = false,
  isDisabled = false,
  beforeNav = false,
}) => {
  const history = useHistory();

  return (
    <div
      className={`stick-btn-wrap${small ? ' stick-btn-small' : ''}${
        isDisabled ? ' disabled' : ''
      }`}
    >
      <span
        className={`stick-btn-img${inverse ? ' stick-btn-img-inverse' : ''}`}
      >
        {sticks[stick]}
      </span>
      <span
        className={`text-link stick-btn-link${
          isDisabled ? ' stick-btn-link-disabled' : ''
        }`}
        onClick={() => {
          const shouldNav = !beforeNav || beforeNav();
          if (shouldNav) {
            history.push(link);
          }
        }}
      ></span>
    </div>
  );
};
