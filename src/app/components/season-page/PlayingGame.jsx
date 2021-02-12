import React from 'react'
import { ReactSVG } from 'react-svg';
import '../../../assets/css/components/season-page/playing-game.css'
import jrSharksLogoWhiteBg from '@images/icons/jr-sharks-logo-white-bg.svg';
import jrSharksLogoWhite from '@images/icons/jr-sharks-logo-white.svg';
import blueBears from '@images/icons/blue-bears.svg';

export const PlayingGame = () => {
  return (
    <div className="teams-playing-container">
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
  )
}
