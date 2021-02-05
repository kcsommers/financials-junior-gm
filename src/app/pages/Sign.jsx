import React, {useState} from 'react';
import { ReactSVG } from 'react-svg';
import sign from '../../assets/images/icons/sign.svg';
import sharksLogo from '../../assets/images/icons/sharks-logo.svg';
import comericaLogo from '../../assets/images/icons/comerica-logo.svg';
import hockeyVisual1 from '../../assets/images/icons/hockey-visual-1.svg';
import hockeyVisual2 from '../../assets/images/icons/hockey-visual-2.svg';
import cancel from '../../assets/images/icons/cancel.svg';
import forwardTabSelected from '../../assets/images/icons/forward-tab-selected.svg';
import defenseTabSelected from '../../assets/images/icons/defense-tab-selected.svg';
import goalieTabSelected from '../../assets/images/icons/goalie-tab-selected.svg';
import forwardtab from '../../assets/images/icons/forward-tab.svg';
import defensetab from '../../assets/images/icons/defense-tab.svg';
import goalietab from '../../assets/images/icons/goalie-tab.svg';
import '../../assets/css/pages/sign.css';
import AvailableForwards from './AvailableForwards';
import AvailableDefense from './AvailableDefense';
import AvailableGoalies from './AvailableGoalies';

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
      
      {/* header portion */}
      <div className="team-page-header">
        <ReactSVG className="team-page-hockey-stick" src={sign} />
        <ReactSVG className="sharks-logo" src={sharksLogo} />
        <div className="objectives-board">
          <div className="objective-level-box">
            <div>Objectives</div>
            <div>Lv1</div>
          </div>
          <div className="ordered-list">
            <div>1. Learn about your budget.</div>
          </div>
        </div>
      </div>

      {/* Team Dashboard */}
      <div className="sign-dashboard">
        <div className="sign-dashboard-top-row">{/* top row of sign dashboard */}
          <div className="sign-state-visual">
            <div className="team-state-visual-container">
              <h1 className="team-dashboard-rank-title">Team <br/>Rank</h1>
              <div className="team-dashboard-rank-hockey-stick-box">
                <ReactSVG src={hockeyVisual1} />
              </div>
            </div>
            <div className="team-dashboard-rank-circle"><p>85</p></div>
            <div className="team-money-left-circle"><p>25</p></div>
            <div className="team-money-left-hockey-stick-box">
              <ReactSVG src={hockeyVisual2} />
            </div>
            <h1 className="team-money-left-title">Money <br/>Left</h1>
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

            <div>
              <ReactSVG className="sign-cancel" src={cancel} />
            </div>
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