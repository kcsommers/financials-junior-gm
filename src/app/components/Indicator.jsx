import { getDollarString } from '@utils';
import '@css/components/Indicator.css';

const getFontSize = (amount) => {
  const _amount = typeof amount !== 'string' ? String(amount) : amount;

  if (!_amount) {
    return '2rem';
  }

  if (_amount.length >= 4) {
    return '1rem';
  }

  if (_amount.length >= 3) {
    return '1.3rem';
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
}) => {
  const validAmount = Math.max(amount, 0);

  return (
    <div
      className={`amount-indicator-wrap${
        direction ? ` amount-indicator-${direction}` : ''
      }`}
      style={{
        transform:
          direction === 'right'
            ? `rotate(${rotate}deg)`
            : `rotate(-${rotate}deg)`,
      }}
    >
      {direction && (
        <div
          className='amount-indicator-pointer'
          style={{ backgroundColor: borderColor }}
        ></div>
      )}
      <div className='amount-indicator' style={{ borderColor }}>
        <p
          className={`amount-indicator-amount color-primary${
            isMoney ? ' amount-indicator-amount-money' : ''
          }`}
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
  );
};
