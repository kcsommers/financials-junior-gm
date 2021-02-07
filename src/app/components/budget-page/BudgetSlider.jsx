import { motion } from 'framer-motion';
import '@css/components/budget-page/BudgetSlider.css';

export const BudgetSlider = () => {
  return (
    <motion.div
      className='budget-equation-wrap'
      transition={{ default: { duration: 1 } }}
    ></motion.div>
  );
};
