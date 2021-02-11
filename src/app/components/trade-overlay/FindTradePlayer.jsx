import React, {useState} from 'react';
import '../../../assets/css/components/trade-overlay/find-trade-player.css';
import {FilledPlayerCard} from '../public-api';
import { SpacesInTeam} from '../public-api';
import { ReactSVG } from 'react-svg';
import forwardTabSelected from '@images/icons/forward-tab-selected.svg';
import defenseTabSelected from '@images/icons/defense-tab-selected.svg';
import goalieTabSelected from '@images/icons/goalie-tab-selected.svg';
import forwardtab from '@images/icons/forward-tab.svg';
import defensetab from '@images/icons/defense-tab.svg';
import goalietab from '@images/icons/goalie-tab.svg';
import AvailableTradeForwards from './AvailableTradeForwards';
import AvailableTradeDefense from './AvailableTradeDefense';
import AvailableTradeGoalies from './AvailableTradeGoalies';

export const FindTradePlayer = () => {

  const [availableTradePlayers, setAvailableTradePlayers] = useState(<AvailableTradeForwards/>);
  const [forwardTab, setForwardTab] = useState(forwardtab);
  const [defenseTab, setDefenseTab] = useState(defensetab);
  const [goalieTab, setGoalieTab] = useState(goalietab);



  const handleForwardsTab = () => {
    setAvailableTradePlayers(<AvailableTradeForwards/>)
    setForwardTab(forwardTabSelected);
    setDefenseTab(defensetab);
    setGoalieTab(goalietab);
  }

  const handleDefenseTab = () => {
    setAvailableTradePlayers(<AvailableTradeDefense/>)
    setForwardTab(forwardtab);
    setDefenseTab(defenseTabSelected);
    setGoalieTab(goalietab);
  }

  const handleGoalieTab = () => {
    setAvailableTradePlayers(<AvailableTradeGoalies/>)
    setForwardTab(forwardtab);
    setDefenseTab(defensetab);
    setGoalieTab(goalieTabSelected);
  }

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
      
      {/* Position Tabs */}
      <div className="position-tabs">
          <div>
            <ReactSVG onClick={handleForwardsTab} src={forwardTab} />
          </div>
          <div>
            <ReactSVG onClick={handleDefenseTab} src={defenseTab} />
          </div>
          <div>
            <ReactSVG onClick={handleGoalieTab} src={goalieTab} />
          </div>
        </div>

        {availableTradePlayers}
    </div>
  )
}
