import React from 'react';
import { ReactSVG } from 'react-svg';
import icon from '@images/icons/hockey-visual-1.svg';
import '@css/components/amount-stick.css';

export const TeamRankStick = () => {
  return (
    <div className='amount-stick-wrap'>
      <h3 className='amount-stick-title color-primary'>
        <span>Team Rank</span>
      </h3>
      <div className='amount-stick-filler'></div>
      <div className='amount-stick-img-wrap'>
        <ReactSVG src={icon} />
      </div>
      <div className='amount-stick-indicator amount-indicator-wrap amount-indicator-right'>
        <div className='amount-indicator-pointer'></div>
        <div className='amount-indicator'>
          <p className='amount-stick-text color-primary'>85</p>
        </div>
      </div>
    </div>
  );
};
