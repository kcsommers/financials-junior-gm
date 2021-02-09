import React from 'react';
import teamRankStickBig from '../../assets/images/icons/team-rank-stick-big.svg';
import { ReactSVG } from 'react-svg';
import '../../assets/css/components/team-rank-stick-big.css';

export const TeamRankStickBig = () => {
  return (
    <div className="team-rank-stick-big-container">
      <div className='amount-stick-wrap-big'>
        <h3 className='amount-stick-title color-primary team-rank-stick-title-big'>
          <span>Team Rank</span>
        </h3>
        <div className='amount-stick-filler'></div>
        <div className='amount-stick-circle-wrap big-left'>
          <div className='amount-stick-circle-pointer'></div>
          <div className='amount-stick-circle'>
            <p className='amount-stick-text color-primary'>85</p>
          </div>
        </div>
      </div>
      <div className="team-rank-stick-big">
        <ReactSVG src={teamRankStickBig}/>
      </div>
    </div>
  )
}
