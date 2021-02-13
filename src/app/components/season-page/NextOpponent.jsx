import React from 'react';
import { ReactSVG } from 'react-svg';
import {LevelStick} from '../LevelStick'
import jrSharksLogoWhiteBg from '@images/icons/jr-sharks-logo-white-bg.svg';

export const NextOpponent = () => {
  return (
    <React.Fragment>
      <p className='season-team-place'>3rd</p>
      <ReactSVG src={jrSharksLogoWhiteBg} />
      <p className='next-opponent-title'>Next Opponent</p>
      <div className='next-opponent-details'>
        <p className='next-opponent-name'>
          Blue
          <br /> Bears
        </p>
        <div className='sotr-details'>
          <LevelStick type='noStickOpponentTeamRank' />
        </div>
      </div>
    </React.Fragment>
  )
}
