import '@css/components/MoneyLevel.css';

const levels = {
  oneDollar: {
    short: '$1',
    long: 'one dollar',
  },
  twoDollars: {
    short: '$2',
    long: 'two dollar',
  },
  fiftyCents: {
    short: '50\u00a2',
    long: 'fifty cent',
  },
};

export const MoneyLevel = ({ level, children }) => {
  return (
    <div className='money-level-container'>
      <p className='header color-primary'>
        These players get a {levels[level].long} contract
      </p>
      <div className='card auto-card'>
        <span className='contract-amount'>{levels[level].short}</span>
        {children}
      </div>
    </div>
  );
};
