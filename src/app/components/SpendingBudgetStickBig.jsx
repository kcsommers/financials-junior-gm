import React from 'react';
import { ReactSVG } from 'react-svg';
import spendingBudgetStickBig from '../../assets/images/icons/spending-budget-stick-big.svg';
import '../../assets/css/components/spending-budget-stick-big.css';

export const SpendingBudgetStickBig = () => {
  return (
    <div className="spending-budget-stick-big-container">
      <div className='amount-stick-wrap-big amount-stick-left'>
        <div className='amount-stick-filler'></div>
        <h3 className='amount-stick-title color-primary spending-budget-stick-title-big'>
          <span>Money Left</span>
        </h3>
        <div className='amount-stick-circle-wrap big-right'>
          <div className='amount-stick-circle-pointer'></div>
          <div className='amount-stick-circle'>
            <p className='amount-stick-text color-primary'>25</p>
          </div>
        </div>
      </div>
      <div className="spending-budget-stick-big">
        <ReactSVG src={spendingBudgetStickBig}/>
      </div>
    </div>
  )
}
