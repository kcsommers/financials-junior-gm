import React from 'react';
import '../../../assets/css/components/trade-overlay/find-trade-player.css';
import {FilledPlayerCard} from '../public-api';
import { SpacesInTeam, PlayersAvailable } from '../public-api';

export const FindTradePlayer = () => {
  return (
    <div className="trade-dashboard">
      <p>Pick a player to trade with NAME</p>
      <FilledPlayerCard/>
      <SpacesInTeam/>
      <PlayersAvailable/>
    </div>
  )
}
