const getGradientPct = (rank, circleIndex, max) => {
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

const styles = (rgb, rank, index, isSmall, max) => {
  const gradientPct = getGradientPct(rank, index, max);
  return {
    inner: {
      width: '100%',
      height: '100%',
      borderRadius: '100%',
      background: `linear-gradient(to right, rgba(${rgb.join(
        ','
      )}, 1) ${gradientPct}%, rgba(0, 0, 0, 0) ${gradientPct}%)`,
    },
    outer: {
      backgroundColor: `rgba(${rgb.join(',')}, 0.3)`,
      width: isSmall ? '20px' : '35px',
      height: isSmall ? '20px' : '35px',
      borderRadius: '100%',
    },
  };
};

export const PlayerRankGraph = ({ label, rgb, rank, isSmall, max }) => {
  return (
    <div className='graph-wrap'>
      <p
        style={{
          color: `rgb(${rgb})`,
          fontSize: isSmall ? '0.75rem' : '0.8rem',
          textAlign: 'left',
          fontWeight: 'bold',
        }}
      >
        {label}
      </p>
      <div
        className='graph-circles-wrap'
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 0.5rem',
        }}
      >
        <div
          className='graph-circle-wrap'
          style={styles(rgb, rank, 1, isSmall, max).outer}
        >
          <div
            className='graph-circle'
            style={styles(rgb, rank, 1, isSmall, max).inner}
          ></div>
        </div>
        <div
          className='graph-circle-wrap'
          style={styles(rgb, rank, 2, isSmall, max).outer}
        >
          <div
            className='graph-circle'
            style={styles(rgb, rank, 2, isSmall, max).inner}
          ></div>
        </div>
        <div
          className='graph-circle-wrap'
          style={styles(rgb, rank, 3, isSmall, max).outer}
        >
          <div
            className='graph-circle'
            style={styles(rgb, rank, 3, isSmall, max).inner}
          ></div>
        </div>
        <div
          className='graph-circle-wrap'
          style={styles(rgb, rank, 4, isSmall, max).outer}
        >
          <div
            className='graph-circle'
            style={styles(rgb, rank, 4, isSmall, max).inner}
          ></div>
        </div>
        <div
          className='graph-circle-wrap'
          style={styles(rgb, rank, 5, isSmall, max).outer}
        >
          <div
            className='graph-circle'
            style={styles(rgb, rank, 5, isSmall, max).inner}
          ></div>
        </div>
      </div>
    </div>
  );
};
