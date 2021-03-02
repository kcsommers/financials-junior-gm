import '@css/components/PlayerRankPie.css';

export const PlayerRankPie = ({
  rank,
  sliceColor = '#0099ff',
  emptyColor = '#fff',
  size = 20,
  label,
  max,
}) => {
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
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {label && (
        <p
          style={{
            textAlign: 'center',
            fontSize: '0.6rem',
            color: '#121210',
          }}
        >
          {label}
        </p>
      )}
      <div
        className='player-rank-pie'
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        <div
          className='player-rank-slice'
          style={{
            clipPath:
              rankRotate > 180
                ? 'none'
                : 'polygon(50% 0%, 50% 100%, 100% 100%, 100% 0%)',
          }}
        >
          <div
            className='player-rank-slice-fill'
            style={{
              transform: `rotate(${rankRotate}deg)`,
              background: sliceColor,
            }}
          ></div>
          <div
            className='player-rank-bg-fill'
            style={{
              display: rankRotate > 180 ? 'block' : 'none',
              background: sliceColor,
            }}
          ></div>
        </div>

        <div
          className='player-rank-slice'
          style={{
            transform: `rotate(${rankRotate}deg)`,
            clipPath:
              emptyRotate > 180
                ? 'none'
                : 'polygon(50% 0%, 50% 100%, 100% 100%, 100% 0%)',
          }}
        >
          <div
            className='player-rank-slice-fill'
            style={{
              transform: `rotate(${emptyRotate}deg)`,
              background: emptyColor,
            }}
          ></div>
          <div
            className='player-rank-bg-fill'
            style={{
              display: emptyRotate > 180 ? 'block' : 'none',
              background: emptyColor,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
