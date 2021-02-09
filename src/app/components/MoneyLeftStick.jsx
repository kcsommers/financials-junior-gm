import React from 'react';
import { ReactSVG } from 'react-svg';
import icon from '@images/icons/hockey-visual-2.svg';
import { Indicator } from '@components';
import '@css/components/amount-stick.css';

export const MoneyLeftStick = () => {
  return (
    <div className='amount-stick-wrap amount-stick-left'>
      <div className='amount-stick-filler'></div>
      <h4 className='amount-stick-title color-primary'>
        <span>Money Left</span>
      </h4>
      <div className='amount-stick-img-wrap'>
        <ReactSVG src={icon} />
      </div>
      <div className='amount-stick-indicator-wrap amount-stick-indicator-left'>
        <Indicator amount={25} direction='left' />
      </div>
    </div>
  );
};
