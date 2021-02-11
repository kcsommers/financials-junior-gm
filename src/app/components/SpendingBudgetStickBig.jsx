import React from 'react';
import { ReactSVG } from 'react-svg';
import spendingBudgetStickBig from '../../assets/images/icons/spending-budget-stick-big.svg';
import '../../assets/css/components/spending-budget-stick-big.css';
import { Indicator } from '@components';

export const SpendingBudgetStickBig = () => {
  return (
    <div className="spending-budget-stick-big-container">
      <div className='amount-stick-wrap amount-stick-left'>
        <div className='amount-stick-filler'></div>
        <h4 className='amount-stick-title color-primary big-right'>
          <span>Money Left</span>
        </h4>
        <div className='amount-stick-indicator-wrap amount-stick-indicator-left big-right'>
          <Indicator amount={25} direction='left' />
        </div>
      </div>
      <div className="spending-budget-stick-big">
        <ReactSVG src={spendingBudgetStickBig}/>
      </div>
    </div>
  )
}
