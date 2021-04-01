import { Link } from 'react-router-dom';
import {
  TeamStickSvg,
  BudgetStickSvg,
  SeasonStickSvg,
  ScoutStickSvg,
  TrophiesStickSvg,
} from '@components';
import '@css/components/StickButton.css';

const sticks = {
  team: <TeamStickSvg />,
  budget: <BudgetStickSvg />,
  season: <SeasonStickSvg />,
  scout: <ScoutStickSvg />,
  trophies: <TrophiesStickSvg />,
};

export const StickButton = ({ link, stick, inverse, small, isDisabled }) => {
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
      <Link
        className={`text-link stick-btn-link${
          isDisabled ? ' stick-btn-link-disabled' : ''
        }`}
        to={link}
      ></Link>
    </div>
  );
};
