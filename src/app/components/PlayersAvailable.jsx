import React, {useState} from 'react'
import { ReactSVG } from 'react-svg';
import forwardTabSelected from '@images/icons/forward-tab-selected.svg';
import defenseTabSelected from '@images/icons/defense-tab-selected.svg';
import goalieTabSelected from '@images/icons/goalie-tab-selected.svg';
import forwardtab from '@images/icons/forward-tab.svg';
import defensetab from '@images/icons/defense-tab.svg';
import goalietab from '@images/icons/goalie-tab.svg';
import '../../assets/css/pages/sign.css';
import AvailableForwards from './sign-page/AvailableForwards';
import AvailableDefense from './sign-page/AvailableDefense';
import AvailableGoalies from './sign-page/AvailableGoalies';

export const PlayersAvailable = () => {

  const [availablePlayers, setAvailablePlayers] = useState(<AvailableForwards/>);
  const [forwardTab, setForwardTab] = useState(forwardtab);
  const [defenseTab, setDefenseTab] = useState(defensetab);
  const [goalieTab, setGoalieTab] = useState(goalietab);



  const handleForwardsTab = () => {
    setAvailablePlayers(<AvailableForwards/>)
    setForwardTab(forwardTabSelected);
    setDefenseTab(defensetab);
    setGoalieTab(goalietab);
  }

  const handleDefenseTab = () => {
    setAvailablePlayers(<AvailableDefense/>)
    setForwardTab(forwardtab);
    setDefenseTab(defenseTabSelected);
    setGoalieTab(goalietab);
  }

  const handleGoalieTab = () => {
    setAvailablePlayers(<AvailableGoalies/>)
    setForwardTab(forwardtab);
    setDefenseTab(defensetab);
    setGoalieTab(goalieTabSelected);
  }

  return (
    <div>
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

        {availablePlayers}
    </div>
  )
}
