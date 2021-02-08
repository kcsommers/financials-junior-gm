import React from 'react';
import {TeamRankStick}  from './TeamRankStick';
import {MoneyLeftStick}  from './MoneyLeftStick';
import { ReactSVG } from 'react-svg';
import playerImage from '@images/icons/player-image.svg';
import cancelBig from '@images/icons/cancel-big.svg';
import confirmBig from '@images/icons/confirm-big.svg'
import '../../assets/css/components/sign-player.css';

export const SignPlayer = () => {
  return (
    <div className="sign-player-dashboard">
      <p>Changes To Rank And Budget</p>
      <TeamRankStick/>
      <MoneyLeftStick/>
      <div>
        <p className='player-card-title'>Position</p>
          <div className='team-dashboard-players-card-top'>
            <div>
              <div className='rank-text'>Rank</div>
              <div className='rank-number'>50</div>
            </div>
            <div className='player-cost'>$2</div>
          </div>
          <div className='team-dashboard-players-card'>
            <ReactSVG src={playerImage} />
            <div className='player-meters-row'>
              <div>
                <p>Off</p>
                <div className='offense-meter'></div>
              </div>
              <div>
                <p>Pass</p>
                <div className='passing-meter'></div>
              </div>
              <div>
                <p>Def</p>
                <div className='defense-meter'></div>
              </div>
            </div>
          </div>
        </div>
        <p>Are you sure you want to sign the following player?</p>
        <p>Cancel</p>
        <ReactSVG src={cancelBig}/>
        <p>Confirm</p>
        <ReactSVG src={confirmBig}/>
    </div>
  )
}
