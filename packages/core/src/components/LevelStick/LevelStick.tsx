import { Indicator } from '../../components/Indicator';
import { isThemeColor } from '../../theme/colors/colors';
import { LevelStickSvg } from './LevelStickSvg';

type LevelStickProps = {
  value: number;
  denom: number;
  isMoney?: boolean;
  size?: 'sm' | 'md' | 'lg';
  indicatorDirection?: 'right' | 'left' | 'top' | 'bottom';
  color?: string; // <-- tailwind color
  label?: string;
  inverse?: boolean;
};

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
    rotate = y - 95;
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
    rotate = y - 155;
    y = 160;
  }
  return {
    translate: { transform: `translate(0, ${y}px)` },
    rotate,
  };
};

export const LevelStick = ({
  isMoney = false,
  size = 'md',
  value = 0,
  denom = 100,
  indicatorDirection = 'left',
  color,
  label,
  inverse = false,
}: LevelStickProps) => {
  const transforms =
    size !== 'lg'
      ? getIndicatorTransforms(value, denom)
      : getIndicatorTransformsLarge(value, denom);

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size === 'lg' ? '220px' : '190px',
        height: size === 'lg' ? '315px' : '225px',
        position: 'relative',
        top: size === 'lg' ? '0px' : '8px',
      }}
    >
      <div
        style={
          size === 'lg'
            ? {
                transform: 'scale(1.4)',
              }
            : {}
        }
      >
        <div
          style={
            size === 'lg'
              ? styles[indicatorDirection].imageLg
              : styles[indicatorDirection].image
          }
        >
          <LevelStickSvg
            num={Math.max(value, 0)}
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
            {label && (
              <span
                className={`text-${color}`}
                style={styles[indicatorDirection].text}
              >
                {label.split('\\n').map((str, i) => (
                  <span key={str}>
                    {i === 0 ? (
                      str
                    ) : (
                      <>
                        <br />
                        {str}
                      </>
                    )}
                  </span>
                ))}
              </span>
            )}
            <Indicator
              value={value}
              direction={indicatorDirection}
              isMoney={isMoney}
              rotate={transforms.rotate}
              textColor={color}
            />
          </>
        ) : (
          <>
            <Indicator
              value={value}
              direction={indicatorDirection}
              isMoney={isMoney}
              rotate={transforms.rotate}
              textColor={color}
            />
            {label && (
              <span
                style={{
                  ...styles[indicatorDirection].text,
                  color: isThemeColor(color)
                    ? `rgb(var(--color-${color}))`
                    : color,
                }}
              >
                {label.split('\\n').map((str, i) => (
                  <span key={str}>
                    {i === 0 ? (
                      str
                    ) : (
                      <>
                        <br />
                        {str}
                      </>
                    )}
                  </span>
                ))}
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
};
