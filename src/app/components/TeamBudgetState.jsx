import React from 'react';
import { LevelStick, LoadingSpinner } from '@components';
import { useSelector } from 'react-redux';

export const TeamBudgetState = ({ title, isLarge }) => {
  const student = useSelector((state) => state.studentState.student);

  return student ? (
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
          <LevelStick
            type='teamRank'
            amount={student.teamRank}
            denom={100}
            color='#e06d00'
            indicatorDirection='right'
            isLarge={true}
            textJsx={
              <span>
                Team <br />
                Rank
              </span>
            }
          />
          <LevelStick
            type='budget'
            amount={
              student.totalBudget - student.moneySpent - student.savingsBudget
            }
            denom={student.totalBudget}
            color='#002f6c'
            indicatorDirection='left'
            inverse={true}
            isLarge={true}
            textJsx={
              <span>
                Spending <br />
                Budget
              </span>
            }
          />
        </div>
      </div>
    </>
  ) : (
    <LoadingSpinner />
  );
};
