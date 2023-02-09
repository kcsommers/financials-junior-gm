import classNames from 'classnames';
import { getDollarString } from '../../utils/get-dollar-string';
import styles from './Indicator.module.scss';

const getFontSize = (amount) => {
  const _amount = typeof amount !== 'string' ? String(amount) : amount;

  if (!_amount) {
    return '2rem';
  }

  if (_amount.length >= 4) {
    return '0.9rem';
  }

  if (_amount.length >= 3) {
    return '1.15rem';
  }

  if (_amount.length >= 2) {
    return '1.5rem';
  }

  return '2rem';
};

export const Indicator = ({
  amount,
  direction,
  isMoney,
  rotate,
  color = '#00788a',
  borderColor = '#4b4b4b',
  isComericaBtn = false,
}: any) => {
  const validAmount = Math.max(amount, 0);

  const comericaBtn = (
    <div
      style={{
        width: '75px',
        height: '75px',
        borderRadius: '100%',
        border: '5px solid #002f6d',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2px',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '100%',
          backgroundColor: '#002f6d',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
        }}
      >
        {getDollarString(validAmount, true)}
      </div>
    </div>
  );

  return !isComericaBtn ? (
    <div
      className={classNames(
        styles.amount_indicator_wrap,
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
          className={styles.amount_indicator_pointer}
          style={{ backgroundColor: borderColor }}
        ></div>
      )}
      <div className={styles.amount_indicator} style={{ borderColor }}>
        <p
          className={classNames(
            styles.amount_indicator_amount,
            'text-primary',
            { [styles.amount_indicator_amount_money]: isMoney }
          )}
          style={{
            transform:
              direction === 'right'
                ? `rotate(-${rotate}deg)`
                : `rotate(${rotate}deg)`,
            fontSize: getFontSize(validAmount),
            color: color,
            transition: 'all 0.3s ease',
          }}
        >
          {isMoney ? getDollarString(validAmount, true) : validAmount}
        </p>
      </div>
    </div>
  ) : (
    comericaBtn
  );
};
