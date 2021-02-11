import React from 'react';
import { ReactSVG } from 'react-svg';
import playerImageBig from '@images/icons/player-image-big.svg';

export const FilledPlayerCard = () => {
  return (
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
  )
}
