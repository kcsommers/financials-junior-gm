import '@css/components/Indicator.css';

export const Indicator = ({ amount, direction }) => {
  return (
    <div className={`amount-indicator-wrap amount-indicator-${direction}`}>
      <div className='amount-indicator-pointer'></div>
      <div className='amount-indicator'>
        <p className='amount-indicator-amount color-primary'>{amount}</p>
      </div>
    </div>
  );
};
