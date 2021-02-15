import { getDollarString } from '@utils';
import '@css/components/Indicator.css';

const getFontSize = (amount) => {
  const _amount = typeof amount !== 'string' ? String(amount) : amount;

  return _amount && _amount.length > 2 ? '1.2rem' : '2rem';
};

export const Indicator = ({
  amount,
  direction,
  highlight,
  isMoney,
  rotate,
}) => {
  return (
    <div
      className={`amount-indicator-wrap${
        direction ? ` amount-indicator-${direction}` : ''
      }${highlight ? ' amount-indicator-highlight' : ''}`}
    >
      {direction && <div className='amount-indicator-pointer'></div>}
      <div
        className='amount-indicator'
        style={{ transform: `rotate(${rotate}deg)` }}
      >
        <p
          className={`amount-indicator-amount color-primary${
            isMoney ? ' amount-indicator-amount-money' : ''
          }`}
          style={{
            transform: `rotate(-${rotate}deg)`,
            fontSize: getFontSize(amount),
          }}
        >
          {isMoney ? getDollarString(amount, true) : amount}
        </p>
      </div>
    </div>
  );
};
