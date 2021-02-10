import React from 'react';
import { ReactSVG } from 'react-svg';
import notepaperPen from '../../assets/images/icons/notepaper-pen.svg';
import playerImageBig from '@images/icons/player-image-big.svg';
import '../../assets/css/components/player-signed.css';
import {SpendingBudgetStickBig} from './public-api';
import {TeamRankStickBig} from './public-api';

export const PlayerSigned = () => {
  return (
    <div className="sign-player-dashboard">
      <p className="player-signed-title">Player has been signed!</p>
      <div className="player-signed-content">
        <div className="state-visual-big">
          <TeamRankStickBig/>
          <SpendingBudgetStickBig/>
        </div>
        <div>
          <div>
            <p className='player-card-title'>Position</p>
            <div className='team-dashboard-players-card-top'>
              <div>
                <div className='rank-text'>Rank</div>
                <div className='rank-number'>50</div>
              </div>
              <div className='player-cost'>$2</div>
            </div>
            <div className='team-dashboard-players-card margin-bottom-2'>
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
          <ReactSVG src={notepaperPen}/>
        </div>
        
      </div>
      
    </div>
  )
}
