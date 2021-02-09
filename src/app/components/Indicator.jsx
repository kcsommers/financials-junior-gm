import '@css/components/Indicator.css';

export const Indicator = ({ amount, direction, highlight }) => {
  return (
    <div
      className={`amount-indicator-wrap${
        direction ? ` amount-indicator-${direction}` : ''
      }${highlight ? ' amount-indicator-highlight' : ''}`}
    >
      {direction && <div className='amount-indicator-pointer'></div>}
      <div className='amount-indicator'>
        <p className='amount-indicator-amount color-primary'>{amount}</p>
      </div>
    </div>
  );
};
