import { getDollarString } from '@utils';
import '@css/components/Indicator.css';

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
          style={{ transform: `rotate(-${rotate}deg)` }}
        >
          {isMoney ? getDollarString(amount) : amount}
        </p>
      </div>
    </div>
  );
};
