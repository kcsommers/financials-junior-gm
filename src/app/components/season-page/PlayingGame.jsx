import React from 'react'
import { ReactSVG } from 'react-svg';
import '../../../assets/css/components/season-page/playing-game.css'
import jrSharksLogoBig from '@images/icons/jr-sharks-logo-big.svg';
import blueBearsLogoBig from '@images/icons/blue-bears-logo-big.svg';
import { useSelector } from 'react-redux';

export const PlayingGame = (score) => {
  console.log('yo hello hey: ', score)

  const yourStanding = useSelector((state) => {
    return state.season.standings
  });
  const opponentStanding = useSelector((state) => {
    return state.season.currentOpponent.standings
  });

  console.log('yoyoyo: ', useSelector(state => {
    return state.season.currentOpponent;
  }))

  return (
    <div className="teams-playing-container">
      <div className="season-teams-vs-container">
        <div className="team-container">
          <p className="text-white your-standings">{yourStanding}</p>
          <ReactSVG src={jrSharksLogoBig} />
        </div>
        <p className="season-teams-vs">vs</p>
        <div className="team-container">
          <p className="text-white opponent-standings">{opponentStanding}</p>
          <ReactSVG src={blueBearsLogoBig} />
        </div>
      </div>
      
      <div>
        <p className="season-score-title">Score</p>
        <div className="team-scores-container">
          
          <div>
            <div className="score-container">
              <p className="score-value">{score.score[0]}</p>
            </div>
          </div>
          
          <div>
            <div className="score-container">
              <p className="score-value">{score.score[1]}</p>
            </div>
          </div>
          
        </div>
      </div>
      
    </div>
  )
}
