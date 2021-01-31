import React from 'react';
import '../../css/home_page/MiddleCard.css';

function MiddleCard() {
  return (
    <div className="middle-card">
      <div className="objective-level-box">
        <div>Objective</div>
        <div>Level</div>
      </div>
      <div className="ordered-list">
        <div>1. Learn about your budget.</div>
        <div>2. Fill your team by signing a player.</div>
        <div>3. Scout three more players to add to your team.</div>
      </div>
    </div>
  )
}

export default MiddleCard;
