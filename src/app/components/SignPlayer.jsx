import React from 'react';
import {TeamRankStick}  from './TeamRankStick';
import {MoneyLeftStick}  from './MoneyLeftStick';
import { ReactSVG } from 'react-svg';
import playerImageBig from '@images/icons/player-image-big.svg';
import cancelBig from '@images/icons/cancel-big.svg';
import confirmBig from '@images/icons/confirm-big.svg'
import '../../assets/css/components/sign-player.css';

export const SignPlayer = () => {

  const handleCancel = () => {
    console.log('hello cancle')
  }

  const handleConfirm = () => {
    console.log('hello confirm')
  }

  return (
    <div className="sign-player-dashboard">
      <div className="sign-player-dashboard-top-row">
        <div>
          <p className="changes-to-rank-budget">Changes To Rank And Budget</p>
          <div className="sign-player-visual-state">
            <TeamRankStick/>
            <MoneyLeftStick/>
          </div>
        </div>
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
            <p>Name</p>
            <ReactSVG src={playerImageBig} />
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

      </div>
      
      
        
        <p className="sign-player-question">Are you sure you want to sign the following player?</p>
        <div className="sign-player-options">
          <div>
            <p>Cancel</p>
            <ReactSVG style={{cursor: 'pointer'}} onClick={handleCancel} src={cancelBig}/>
          </div>
          <div>
            <p>Confirm</p>
            <ReactSVG style={{cursor: 'pointer'}} onClick={handleConfirm} src={confirmBig}/>
          </div>
        </div>
        
        
    </div>
  )
}
