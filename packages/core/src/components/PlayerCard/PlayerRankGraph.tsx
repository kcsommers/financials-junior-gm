import classNames from 'classnames';
import { range } from 'lodash';

const getGradientPct = (rank: number, circleIndex: number, max: number) => {
  const circleTotal = max / 5;
  const filledCircles = rank / circleTotal;

  if (circleIndex <= filledCircles) {
    return 100;
  }

  if (filledCircles > circleIndex - 1) {
    const pct = filledCircles - (circleIndex - 1);
    return pct * 100;
  }

  return 0;
};

type PlayerRankGraphProps = {
  label: string;
  rgb: [number, number, number];
  colorClass: string;
  rank: number;
  isSmall: boolean;
  max: number;
};

export const PlayerRankGraph = ({
  label,
  rgb,
  colorClass,
  rank,
  isSmall,
  max,
}: PlayerRankGraphProps) => {
  return (
    <div className="graph-wrap">
      <p
        className={classNames(
          'text-left font-bold',
          `text-${colorClass}`,
          isSmall ? ' text-xs' : 'text-[0.8rem]'
        )}
      >
        {label}
      </p>
      <div className="graph-circles-wrap flex items-center justify-between px-2">
        {range(5).map((i) => (
          <div
            key={`rank-graph-${label}-${i}`}
            className={classNames(
              'graph-circle-wrap rounded-full overflow-hidden text-left',
              `bg-opacity-30 bg-${colorClass}`,
              isSmall ? 'w-[20px] h-[20px]' : 'w-[35px] h-[35px]'
            )}
          >
            <span
              className={classNames(
                'inline-block w-full h-full',
                `bg-${colorClass}`
              )}
              style={{ width: `${getGradientPct(rank, i + 1, max)}%` }}
            ></span>
          </div>
        ))}
      </div>
    </div>
  );
};
