import React from 'react';
import { LevelStick } from './public-api';

export const TeamBudgetState = ({ title, isLarge }) => {
  return (
    <>
      {title && (
        <p className='rank-budget-title' style={{ width: '370px' }}>
          {title}
        </p>
      )}
      <div
        className='rank-budget-state-container'
        style={{
          border: '5px solid #4b4b4b',
          borderRadius: '5px',
          backgroundColor: '#fff',
          padding: '1rem 0',
          width: isLarge ? '440px' : '370px',
        }}
      >
        <div
          className='team-budget-state-inner'
          style={{
            position: 'relative',
            left: isLarge ? '-28px' : '-25px',
            width: isLarge ? '460px' : '390px',
            height: isLarge ? '385px' : 'auto',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <LevelStick type='teamRank' isLarge={isLarge} />
          <LevelStick type='budget' isLarge={isLarge} />
        </div>
      </div>
    </>
  );
};
