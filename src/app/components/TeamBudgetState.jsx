import React from 'react';
import { LevelStick, LoadingSpinner } from '@components';
import { useSelector } from 'react-redux';
import { getMaxTeamRank } from '@data/players/players-utils';

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
          height: isLarge ? '390px' : '285px',
          width: isLarge ? '440px' : '370px',
          display: 'flex',
          alignItems: 'center',
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
          <div style={{ position: 'relative' }}>
            <LevelStick
              type='teamRank'
              amount={teamRank}
              denom={getMaxTeamRank(+student.level)}
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
            {changes && (
              <span
                style={{
                  position: 'absolute',
                  bottom: '0',
                  right: '50%',
                  fontSize: '2rem',
                  color: '#00788d',
                }}
              >
                +{changes[1]}
              </span>
            )}
          </div>
          <div style={{ position: 'relative' }}>
            <LevelStick
              type='budget'
              amount={Math.max(
                +student.totalBudget - moneySpent - +student.savingsBudget,
                0
              )}
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
            {changes && (
              <span
                style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '50%',
                  fontSize: '2rem',
                  color: 'red',
                }}
              >
                -${changes[0]}
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  ) : (
    <LoadingSpinner />
  );
};
