import { Indicator, LevelStickSvg } from '@components';

const styles = {
  right: {
    indicator: {
      position: 'absolute',
      top: 0,
      right: '40px',
    },
    image: {
      position: 'relative',
      right: '-50px',
      top: 0,
    },
    imageLg: {
      position: 'relative',
      right: '-40px',
      top: 0,
    },
    text: {
      color: '#ea7200',
      display: 'inline-block',
      fontSize: '1rem',
      marginRight: '0.25rem',
      fontWeight: 'bold',
    },
  },
  left: {
    indicator: {
      position: 'absolute',
      top: 0,
      left: '40px',
    },
    image: {
      position: 'relative',
      left: '-50px',
      top: 0,
    },
    imageLg: {
      position: 'relative',
      left: '-40px',
      top: 0,
    },
    text: {
      color: '#002f6c',
      display: 'inline-block',
      fontSize: '1rem',
      marginLeft: '0.25rem',
      fontWeight: 'bold',
      textAlign: 'right',
    },
  },
};

const getIndicatorTransform = (num, denom) => {
  const stickHeight = 210;
  const y = stickHeight * (1 - num / denom);
  return { transform: `translate(0, ${Math.min(y - 30, 100)}px)` };
};

export const LevelStick = ({
  type,
  isLarge,
  amount,
  denom = 100,
  indicatorDirection,
  color,
  textJsx,
  inverse,
}) => {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: isLarge ? '220px' : '190px',
        height: isLarge ? '355px' : '225px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        style={
          isLarge
            ? {
                transform: 'scale(1.4)',
              }
            : {}
        }
      >
        <div
          style={
            isLarge
              ? styles[indicatorDirection].imageLg
              : styles[indicatorDirection].image
          }
        >
          <LevelStickSvg
            rank={amount}
            num={amount}
            denom={denom}
            color={color}
            inverse={inverse}
          />
        </div>
      </div>
      <div style={styles[indicatorDirection].indicator}>
        {indicatorDirection === 'right' || indicatorDirection === 'bottom' ? (
          <>
            <span style={styles[indicatorDirection].text}>{textJsx}</span>
            <Indicator
              amount={amount}
              // direction={indicatorDirection}
              isMoney={type === 'budget'}
            />
          </>
        ) : (
          <>
            <Indicator
              amount={amount}
              // direction={indicatorDirection}
              isMoney={type === 'budget'}
            />
            <span style={styles[indicatorDirection].text}>{textJsx}</span>
          </>
        )}
      </div>
    </div>
  );
};
