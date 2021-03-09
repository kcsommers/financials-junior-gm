import { Indicator, LevelStickSvg } from '@components';

const styles = {
  right: {
    indicator: {
      position: 'absolute',
      top: 0,
      right: '40px',
      transition: 'transform 0.5s ease',
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
      transition: 'color 0.5s ease',
    },
  },
  left: {
    indicator: {
      position: 'absolute',
      top: 0,
      left: '40px',
      transition: 'all 0.5s ease',
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
      transition: 'color 0.5s ease',
    },
  },
};

const getIndicatorTransforms = (num, denom) => {
  const stickHeight = 210;
  let rotate = 0;
  let y = stickHeight * (1 - num / denom) - 30;

  if (y > 100) {
    rotate = y - 90;
    y = 100;
  }
  return {
    translate: { transform: `translate(0, ${y}px)` },
    rotate,
  };
};

const getIndicatorTransformsLarge = (num, denom) => {
  const stickHeight = 294;
  let rotate = 0;
  let y = stickHeight * (1 - num / denom) - 30;

  if (y > 160) {
    rotate = y - 150;
    y = 160;
  }
  return {
    translate: { transform: `translate(0, ${y}px)` },
    rotate,
  };
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
  const transforms = !isLarge
    ? getIndicatorTransforms(amount, denom)
    : getIndicatorTransformsLarge(amount, denom);

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: isLarge ? '220px' : '190px',
        height: isLarge ? '315px' : '225px',
        position: 'relative',
        top: isLarge ? '0px' : '8px',
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
            num={Math.max(amount, 0)}
            denom={denom}
            color={color}
            inverse={inverse}
          />
        </div>
      </div>
      <div
        style={Object.assign({
          ...styles[indicatorDirection].indicator,
          ...transforms.translate,
        })}
      >
        {indicatorDirection === 'right' || indicatorDirection === 'bottom' ? (
          <>
            <span style={styles[indicatorDirection].text}>{textJsx}</span>
            <Indicator
              amount={amount}
              direction={indicatorDirection}
              isMoney={type === 'budget'}
              rotate={transforms.rotate}
              color={color}
            />
          </>
        ) : (
          <>
            <Indicator
              amount={amount}
              direction={indicatorDirection}
              isMoney={type === 'budget'}
              rotate={transforms.rotate}
              color={color}
            />
            <span style={styles[indicatorDirection].text}>{textJsx}</span>
          </>
        )}
      </div>
    </div>
  );
};
