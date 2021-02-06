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

export const MoneyLevel = ({ level }) => {
  return (
    <div className='money-level-container'>
      <p>These players get a ${levels[level].long} contract</p>
      <div className='card auto-card'>
        <span>{levels[level].short}</span>
      </div>
    </div>
  );
};
