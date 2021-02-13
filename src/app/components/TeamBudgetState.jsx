import React from 'react';
import { LevelStick } from './public-api';

export const TeamBudgetState = ({ title }) => {
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
          width: '370px',
        }}
      >
        <div
          className='team-budget-state-inner'
          style={{
            position: 'relative',
            left: '-25px',
            width: 'calc(390px)',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <LevelStick type='teamRank' />
          <LevelStick type='budget' />
        </div>
      </div>
    </>
  );
};
