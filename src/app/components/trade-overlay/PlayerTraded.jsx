import React from 'react';
import '../../../assets/css/components/trade-overlay/player-traded.css'
import {TeamBudgetState, PlayerTradeExchange} from '../public-api';

export const PlayerTraded = () => {
  return (
    <div className="trade-dashboard">
      <div className="player-traded-container">
        <p className="player-traded-title">Player has been traded with player!</p>
        <div className="player-traded-info">
          <TeamBudgetState/>
          <PlayerTradeExchange/>
        </div>
      </div>
    </div>
  )
}
