import { motion } from 'framer-motion';
import { ReactSVG } from 'react-svg';
import budgetSlider from '@images/budget-slider.svg';
import '@css/components/budget-page/BudgetSlider.css';

export const BudgetSlider = () => {
  return (
    <motion.div
      className='budget-slider-wrap'
      transition={{ default: { duration: 1 } }}
    >
      <div className='budget-slider'>
        <div className='spending-indicator amount-indicator-wrap amount-indicator-bottom'>
          <div className='amount-indicator-pointer'></div>
          <div className='amount-indicator'>
            <p className='amount-stick-text color-primary'>25</p>
          </div>
        </div>
        <ReactSVG src={budgetSlider}></ReactSVG>
        <div className='savings-indicator amount-indicator-wrap amount-indicator-top'>
          <div className='amount-indicator-pointer'></div>
          <div className='amount-indicator'>
            <p className='amount-stick-text color-primary'>2</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
