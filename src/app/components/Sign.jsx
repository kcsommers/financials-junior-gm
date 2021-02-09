import React, {useState} from 'react';
import { ReactSVG } from 'react-svg';
import sign from '@images/icons/sign.svg';
import sharksLogo from '@images/icons/sharks-logo.svg';
import comericaLogo from '@images/icons/comerica-logo.svg';
import cancel from '@images/icons/cancel.svg';
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
import {ObjectivesBoard, TeamRankStick, MoneyLeftStick} from './public-api';

const Sign = () => {

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
    <div className="sign-page">
      
      {/* header portion
      <div className="team-page-header">
        <ReactSVG className="team-page-hockey-stick" src={sign} />
        <ReactSVG className="sharks-logo" src={sharksLogo} />
        <ObjectivesBoard/>
      </div> */}

      {/* Team Dashboard */}
      <div className="sign-dashboard">
        <div className="sign-dashboard-top-row">{/* top row of sign dashboard */}
          <div className="sign-state-visual">
            <div className="team-state-visual-container">
              <TeamRankStick/>
              <MoneyLeftStick/>
            </div>
          </div>

          <ReactSVG src={comericaLogo}/>

          <div className="sign-top-right-dashboard">

            <div>
              <p className="spaces-in-your-team-title">Spaces in your team</p>
              <div className="spaces-in-your-team-container">
                <div>
                  <div className="available-positions">
                    <p className="position">Forwards:</p>
                    <p className="positions-available-digit">0</p>
                  </div>
                  <div className="available-positions">
                    <p className="position">Defenders:</p>
                    <p>1</p>
                  </div>
                  <div className="available-positions">
                    <p>Goalie:</p>
                    <p>0</p>
                  </div>
                  <div className="available-positions">
                    <p>Bench:</p>
                    <p>3</p>
                  </div>
                </div>
              </div>
            </div>

            {/* <div>
              <ReactSVG className="sign-cancel" src={cancel} />
            </div> */}
          </div>

        </div>{/* end of top row of sign dashboard */}

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

      </div>{/* end of sign dashboard div */}

    </div>
  )
}

export default Sign;