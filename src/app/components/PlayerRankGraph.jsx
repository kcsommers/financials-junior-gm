const getGradientPct = (rank, index) => {
  const pct = (rank / 100) * 100;
  const indexPct = 20 * index;
  if (pct >= indexPct) {
    return 100;
  }
  if (pct <= 20 * (index - 1)) {
    return 0;
  }
  return pct;
};

const styles = (rgb, rank, index, isSmall) => {
  const gradientPct = getGradientPct(rank, index);
  return {
    inner: {
      width: '100%',
      height: '100%',
      borderRadius: '100%',
      boxShadow: 'inset 0 0 15px #121210',
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

export const PlayerRankGraph = ({ label, rgb, rank, isSmall }) => {
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
          style={styles(rgb, rank, 1, isSmall).outer}
        >
          <div
            className='graph-circle'
            style={styles(rgb, rank, 1, isSmall).inner}
          ></div>
        </div>
        <div
          className='graph-circle-wrap'
          style={styles(rgb, rank, 2, isSmall).outer}
        >
          <div
            className='graph-circle'
            style={styles(rgb, rank, 2, isSmall).inner}
          ></div>
        </div>
        <div
          className='graph-circle-wrap'
          style={styles(rgb, rank, 3, isSmall).outer}
        >
          <div
            className='graph-circle'
            style={styles(rgb, rank, 3, isSmall).inner}
          ></div>
        </div>
        <div
          className='graph-circle-wrap'
          style={styles(rgb, rank, 4, isSmall).outer}
        >
          <div
            className='graph-circle'
            style={styles(rgb, rank, 4, isSmall).inner}
          ></div>
        </div>
        <div
          className='graph-circle-wrap'
          style={styles(rgb, rank, 5, isSmall).outer}
        >
          <div
            className='graph-circle'
            style={styles(rgb, rank, 5, isSmall).inner}
          ></div>
        </div>
      </div>
    </div>
  );
};
