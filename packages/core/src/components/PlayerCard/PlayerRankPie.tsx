import classNames from 'classnames';
import styles from './PlayerRankPie.module.scss';

type PlayerRanksPieProps = {
  rank: number;
  sliceColorClass: string;
  size?: number;
  label: string;
  max: number;
};

export const PlayerRankPie = ({
  rank,
  sliceColorClass,
  size = 20,
  label,
  max,
}: PlayerRanksPieProps) => {
  const calculateRotation = (num) => {
    let pct = num / max;
    if (pct > 1) {
      pct = 1;
    }
    return 360 * pct;
  };

  const _rank = rank ? rank : 0;
  const rankRotate = calculateRotation(_rank);
  const emptyRotate = calculateRotation(30 - _rank);

  return (
    <div className="flex flex-1 flex-col items-center">
      {label && <p className="text-center text-dark text-xxs">{label}</p>}
      <div
        className={styles.player_rank_pie}
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        <div
          className={styles.player_rank_slice}
          style={{
            clipPath:
              rankRotate > 180
                ? 'none'
                : 'polygon(50% 0%, 50% 100%, 100% 100%, 100% 0%)',
          }}
        >
          <div
            className={classNames(
              styles.player_rank_slice_fill,
              sliceColorClass
            )}
            style={{
              transform: `rotate(${rankRotate}deg)`,
            }}
          ></div>
          <div
            className={classNames(styles.player_rank_bg_fill, sliceColorClass)}
            style={{
              display: rankRotate > 180 ? 'block' : 'none',
            }}
          ></div>
        </div>

        <div
          className={styles.player_rank_slice}
          style={{
            transform: `rotate(${rankRotate}deg)`,
            clipPath:
              emptyRotate > 180
                ? 'none'
                : 'polygon(50% 0%, 50% 100%, 100% 100%, 100% 0%)',
          }}
        >
          <div
            className={classNames(styles.player_rank_slice_fill, 'bg-white')}
            style={{
              transform: `rotate(${emptyRotate}deg)`,
            }}
          ></div>
          <div
            className={classNames(styles.player_rank_bg_fill, 'bg-white')}
            style={{
              display: emptyRotate > 180 ? 'block' : 'none',
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
