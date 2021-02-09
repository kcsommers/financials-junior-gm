import React from 'react';
import { ReactSVG } from 'react-svg';
import icon from '@images/icons/hockey-visual-1.svg';
import { Indicator } from '@components';
import '@css/components/amount-stick.css';

export const TeamRankStick = () => {
  return (
    <div className='amount-stick-wrap'>
      <h4 className='amount-stick-title color-primary'>
        <span>Team Rank</span>
      </h4>
      <div className='amount-stick-filler'></div>
      <div className='amount-stick-img-wrap'>
        <ReactSVG src={icon} />
      </div>
      <div className='amount-stick-indicator-wrap amount-stick-indicator-right'>
        <Indicator amount={25} direction='right' />
      </div>
    </div>
  );
};
