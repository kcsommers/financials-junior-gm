import React from 'react';
import '../../css/home_page/teamrankcard.css';
import { ReactSVG } from 'react-svg';
import icon from '../../icons/hockey-visual-1.svg';

function TeamRankCard() {
  return (
    <div className="team-rank-card">
      <div className="hockey-stick-title-container">
        <h1 className="team-rank-title">Team <br/>Rank</h1>
        <div className="team-rank-hockey-stick-box">
          <ReactSVG src={icon} />
        </div>
      </div>
      <div className="team-rank-circle"><p>85</p></div>
    </div>
  )
}

export default TeamRankCard;
