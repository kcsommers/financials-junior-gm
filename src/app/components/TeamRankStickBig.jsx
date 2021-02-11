import React from 'react';
import teamRankStickBig from '../../assets/images/icons/team-rank-stick-big.svg';
import { ReactSVG } from 'react-svg';
import '../../assets/css/components/team-rank-stick-big.css';
import { Indicator } from '@components';

export const TeamRankStickBig = () => {
  return (
    <div className="team-rank-stick-big-container">
      <div className='amount-stick-wrap'>
        <h4 className='amount-stick-title color-primary'>
          <span>Team Rank</span>
        </h4>
        <div className='amount-stick-filler'></div>
        <div className='amount-stick-indicator-wrap amount-stick-indicator-right'>
          <Indicator amount={25} direction='right' />
        </div>
      </div>

      <div className="team-rank-stick-big">
        <ReactSVG src={teamRankStickBig}/>
      </div>
    </div>
  )
}
