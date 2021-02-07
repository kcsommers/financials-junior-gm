import '@css/components/MoneyLevel.css';
import { motion } from 'framer-motion';

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

export const MoneyLevel = ({ level, children, animationState }) => {
  return (
    <div className='money-level-container' animate={animationState}>
      <p className='header color-primary'>
        These players get a {levels[level].long} contract
      </p>
      <motion.div className='card auto-card' animate={animationState}>
        <span className='contract-amount'>{levels[level].short}</span>
        {children}
      </motion.div>
    </div>
  );
};
