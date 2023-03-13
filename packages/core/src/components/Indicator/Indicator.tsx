import classNames from 'classnames';
import { isThemeColor } from '../../theme/colors/colors';
import { getDollarString } from '../../utils/get-dollar-string';
import styles from './Indicator.module.scss';

type IndicatorProps = {
  value: number;
  direction?: 'left' | 'right' | 'top' | 'bottom';
  isMoney?: boolean;
  rotate?: number;
  textColor?: string;
  bgColor?: string;
  size?: 'sm' | 'md' | 'lg';
};

const getFontSize = (value: number, size: 'sm' | 'md' | 'lg'): string => {
  const strValue = String(value);
  if (!strValue) {
    if (size === 'sm') {
      return '1.3rem';
    }
    if (size === 'md') {
      return '2rem';
    }
  }
  if (strValue.length >= 4) {
    if (size === 'sm') {
      return '0.6rem';
    }
    if (size === 'md') {
      return '0.9rem';
    }
  }
  if (strValue.length >= 3) {
    if (size === 'sm') {
      return '0.767rem';
    }
    if (size === 'md') {
      return '1.15rem';
    }
  }
  if (strValue.length >= 2) {
    if (size === 'sm') {
      return '1rem';
    }
    if (size === 'md') {
      return '1.5rem';
    }
  }
  if (size === 'sm') {
    return '1.3rem';
  }
  if (size === 'md') {
    return '2rem';
  }
};

export const Indicator = ({
  value = 0,
  direction,
  isMoney = false,
  rotate,
  textColor = 'primary',
  bgColor = 'neutral-700',
  size = 'md',
}: IndicatorProps) => {
  const validAmount = Math.max(value, 0);

  return (
    <div
      className={classNames(
        'inline-block relative',
        direction ? styles[`amount_indicator_${direction}`] : ''
      )}
      style={{
        transform:
          direction === 'right'
            ? `rotate(${rotate}deg)`
            : `rotate(-${rotate}deg)`,
      }}
    >
      {direction && (
        <div
          className={classNames(
            styles.amount_indicator_pointer,
            styles[size],
            `absolute right-0 top-1/2 bg-${bgColor}`
          )}
        ></div>
      )}
      <div
        className={classNames(
          styles.amount_indicator,
          styles[size],
          'relative shadow-mat bg-white rounded-full flex items-center justify-center',
          `border-${bgColor}`
        )}
      >
        <p
          className={styles.amount_indicator_amount}
          style={{
            transform:
              direction === 'right'
                ? `rotate(-${rotate}deg)`
                : `rotate(${rotate}deg)`,
            fontSize: getFontSize(validAmount, size),
            color: isThemeColor(textColor)
              ? `rgb(var(--color-${textColor}))`
              : textColor,
          }}
        >
          {isMoney ? getDollarString(validAmount, true) : validAmount}
        </p>
      </div>
    </div>
  );
};
