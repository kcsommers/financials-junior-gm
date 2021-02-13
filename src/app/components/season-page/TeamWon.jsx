import React from 'react';
import '../../../assets/css/components/season-page/team-won.css'
import {PlayingGame} from './PlayingGame'

export const TeamWon = () => {
  return (
    <div>
      <PlayingGame/>
      <div className="team-scores-container">
        <div>
          <p className="winner-title">Winner</p>
          <div className="score-container">
            <p className="score-value">5</p>
          </div>
        </div>
        <p className="season-score-title">Score</p>
        <div>
          <p className="winner-title">Winner</p>
          <div className="score-container">
            <p className="score-value">2</p>
          </div>
        </div>
        
      </div>
    </div>
  )
}
