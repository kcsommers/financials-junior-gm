import React from 'react'
import { ReactSVG } from 'react-svg';
import binoculars from '../../assets/images/icons/binoculars.svg';
import confirmBig from '../../assets/images/icons/confirm-big.svg';
import '../../assets/css/components/nice-job-scouting.css';

export const NiceJobScouting = () => {
  return (
    <div className="sign-player-dashboard">
      <div className="nice-job-scouting-container">
        <p className="nice-job-scouting-title">Nice job scouting!</p>
        <div className="nice-job-scouting-row">
          <ReactSVG src={binoculars} className="binos"/>
          <ReactSVG src={confirmBig} className="con-big"/>
        </div>
        <p className="nice-job-scouting-text">The players you scouted can now be signed!</p>
      </div>
    </div>
  )
}
