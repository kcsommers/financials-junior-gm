import { motion } from 'framer-motion';
import '@css/components/budget-page/BudgetEquation.css';

export const BudgetEquation = ({ budget }) => {
  return (
    <motion.div
      className='budget-equation-wrap'
      transition={{ default: { duration: 1 } }}
    >
      <h4 className='budget-equation-title'>Budget Equation</h4>
      <div className='equation-wrap'>
        <div className='equation-inner total-budget'>
          <span className='equation-title'>Total Budget</span>
          <span className='equation-amount'>${budget.total}</span>
        </div>
        <div className='equation-inner savings'>
          <span className='equation-title'>Savings</span>
          <span className='equation-amount'>${budget.savings}</span>
        </div>
        <div className='equation-inner spending-budget'>
          <span className='equation-title'>Spending Budget</span>
          <span className='equation-amount'>${budget.spending}</span>
        </div>
      </div>
    </motion.div>
  );
};
