import React from 'react';
import { ReactSVG } from 'react-svg';
import icon from '@images/icons/hockey-visual-2.svg';
import '@css/components/MoneyLeftStick.css';

export const MoneyLeftStick = () => {
  return (
    <div className='money-left-stick-wrap'>
      <div className='money-left-circle'>
        <p>25</p>
      </div>

      <div className='money-left-hockey-stick-box'>
        <ReactSVG src={icon} />
      </div>

      <h1 className='money-left-title'>
        Money <br />
        Left
      </h1>
    </div>
  );
};
