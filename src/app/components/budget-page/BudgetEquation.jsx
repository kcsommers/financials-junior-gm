import { motion } from 'framer-motion';
import '@css/components/budget-page/BudgetEquation.css';

export const BudgetEquation = ({ budget, animationStates }) => {
  return (
    <motion.div
      className='budget-equation-wrap box-shadow'
      transition={{ default: { duration: 1 } }}
      animate={animationStates.board}
    >
      <h4 className='budget-equation-title'>Budget Equation</h4>
      <div className='equation-wrap'>
        <motion.div
          className='equation-inner total-budget'
          animate={animationStates.total}
          transition={{ default: { duration: 1 } }}
        >
          <span className='equation-title'>Total Budget</span>
          <span className='equation-amount'>
            ${budget.total - budget.spent}
          </span>
        </motion.div>
        <span className='equation-operator'>-</span>
        <motion.div
          className='equation-inner savings'
          animate={animationStates.savings}
          transition={{ default: { duration: 1 } }}
        >
          <span className='equation-title'>Savings</span>
          <span className='equation-amount'>${budget.savings}</span>
        </motion.div>
        <span className='equation-operator equals'>=</span>
        <motion.div
          className='equation-inner spending-budget'
          animate={animationStates.spending}
          transition={{ default: { duration: 1 } }}
        >
          <span className='equation-title'>Spending Budget</span>
          <span className='equation-amount'>
            ${budget.total - budget.spent - budget.savings}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};
