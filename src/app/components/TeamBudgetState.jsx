import React from 'react'
import {LevelStick} from './public-api';

export const TeamBudgetState = () => {
  return (
    <div className="rank-budget-state-container">
      <LevelStick type='teamRank' />
      <LevelStick type='budget' />
    </div>
  )
}
