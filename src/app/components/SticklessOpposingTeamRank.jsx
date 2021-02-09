import React from 'react';

export const SticklessOpposingTeamRank = () => {
  return (
    <div className='amount-stick-wrap amount-stick-left'>
      <div className='amount-stick-filler'></div>
      <div className='amount-stick-circle-wrap'>
        <div className='amount-stick-circle-pointer'></div>
        <div className='amount-stick-circle'>
          <p style={{color: '#3B42FF'}} className='amount-stick-text'>300</p>
        </div>
      </div>
    </div>
  );
};
