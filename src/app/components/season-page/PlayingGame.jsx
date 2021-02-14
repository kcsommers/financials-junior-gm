import React from 'react'
import { ReactSVG } from 'react-svg';
import '../../../assets/css/components/season-page/playing-game.css'
import jrSharksLogoWhiteBg from '@images/icons/jr-sharks-logo-white-bg.svg';
import jrSharksLogoWhite from '@images/icons/jr-sharks-logo-white.svg';
import blueBears from '@images/icons/blue-bears.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setScore } from '@redux/actions';

export const PlayingGame = () => {

  const dispatch = useDispatch();
  const score = useSelector((state) => {
    return state.season.score
  });

  return (
    <div className="teams-playing-container">
      <div className="season-teams-vs-container">
        <div>
          <p className="season-teams-vs-your-place">3rd</p>
          <ReactSVG src={jrSharksLogoWhite} />
        </div>
        <p className="season-teams-vs">vs</p>
        <div>
          <p className="season-teams-vs-opponent-place">4th</p>
          <ReactSVG src={blueBears} />
        </div>
      </div>
      
      <div>
        <p className="season-score-title">Score</p>
        <div className="team-scores-container">
          
          <div>
            <div className="score-container">
              <p className="score-value">{score[0]}</p>
            </div>
          </div>
          
          <div>
            <div className="score-container">
              <p className="score-value">{score[1]}</p>
            </div>
          </div>
          
        </div>
      </div>
      
    </div>
  )
}
