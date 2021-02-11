import React from 'react';
import '../../../assets/css/components/trade-overlay/find-trade-player.css';
import {FilledPlayerCard} from '../public-api';
import { SpacesInTeam, PlayersAvailable } from '../public-api';

export const FindTradePlayer = () => {
  return (
    <div className="trade-dashboard">
      <div className="find-trade-top-row">
        <div className="player-being-traded">
          <p className="player-to-trade-title">Pick a player to trade with NAME</p>
          <div style={{ margin: '0 auto'}}>
            <FilledPlayerCard/>
          </div>
          
        </div>
        <div>
          <SpacesInTeam/>
        </div>
      </div>
      
      <PlayersAvailable/>
    </div>
  )
}
