import React from 'react';
import { ReactSVG } from 'react-svg';
import icon from '@images/icons/hockey-visual-1.svg';
import '@css/components/TeamRankStick.css';

export const TeamRankStick = () => {
  return (
    <div className='team-rank-stick-wrap'>
      <div className='hockey-stick-title-container'>
        <h1 className='team-rank-title'>
          Team <br />
          Rank
        </h1>
        <div className='team-rank-hockey-stick-box'>
          <ReactSVG src={icon} />
        </div>
      </div>
      <div className='team-rank-circle'>
        <p>85</p>
      </div>
    </div>
  );
};
