import '@css/components/PlayerRankPie.css';

export const PlayerRankPie = ({
  score,
  sliceColor = '#0099ff',
  emptyColor = '#fff',
  size = 20,
  label,
}) => {
  const calculateRotation = (num) => {
    const pct = num / 100;
    return 360 * pct;
  };

  const scoreRotate = calculateRotation(score);
  const emptyRotate = calculateRotation(100 - score);

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
        className='player-score-pie'
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        <div
          className='player-score-slice'
          style={{
            clipPath:
              scoreRotate > 180
                ? 'none'
                : 'polygon(50% 0%, 50% 100%, 100% 100%, 100% 0%)',
          }}
        >
          <div
            className='player-score-slice-fill'
            style={{
              transform: `rotate(${scoreRotate}deg)`,
              background: sliceColor,
            }}
          ></div>
          <div
            className='player-score-bg-fill'
            style={{
              display: scoreRotate > 180 ? 'block' : 'none',
              background: sliceColor,
            }}
          ></div>
        </div>

        <div
          className='player-score-slice'
          style={{
            transform: `rotate(${scoreRotate}deg)`,
            clipPath:
              emptyRotate > 180
                ? 'none'
                : 'polygon(50% 0%, 50% 100%, 100% 100%, 100% 0%)',
          }}
        >
          <div
            className='player-score-slice-fill'
            style={{
              transform: `rotate(${emptyRotate}deg)`,
              background: emptyColor,
            }}
          ></div>
          <div
            className='player-score-bg-fill'
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
