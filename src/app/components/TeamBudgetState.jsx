import React from 'react';
import { LevelStick, LoadingSpinner } from '@components';
import { useSelector } from 'react-redux';

export const TeamBudgetState = ({ title, isLarge, changes }) => {
  const student = useSelector((state) => state.studentState.student);
  const { moneySpent, teamRank } = useSelector((state) => state.players);

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
            amount={teamRank}
            denom={100}
            color='#e06d00'
            indicatorDirection='right'
            isLarge={isLarge}
            textJsx={
              <span>
                Team <br />
                Rank
              </span>
            }
          />
          <LevelStick
            type='budget'
            amount={student.totalBudget - moneySpent - student.savingsBudget}
            denom={student.totalBudget}
            color='#002f6c'
            indicatorDirection='left'
            inverse={true}
            isLarge={isLarge}
            textJsx={
              <span>
                Spending <br />
                Budget
              </span>
            }
          />
        </div>
        {changes && (
          <span
            style={{
              position: 'relative',
              top: '36%',
              left: '-20%',
              fontSize: '2rem',
              color: '#00788d',
            }}
          >
            +{changes[1]}
          </span>
        )}
        {changes && (
          <span
            style={{
              position: 'relative',
              top: '36%',
              right: '-5%',
              fontSize: '2rem',
              color: 'red',
            }}
          >
            -${changes[0]}
          </span>
        )}
      </div>
    </>
  ) : (
    <LoadingSpinner />
  );
};
