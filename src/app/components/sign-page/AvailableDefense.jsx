import React from 'react';
import { ReactSVG } from 'react-svg';
import playerImage from '../../../assets/images/icons/player-image.svg';

const AvailableDefense = () => {
  return (
    <div className='available-players'>
      <p className='available-players-title'>Defense you can sign</p>

      <div className='available-players-cards'>
        <div>
          <p className='player-card-title'>Position</p>
          <div className='team-dashboard-players-card-top card-top-border'>
            <div>
              <div className='rank-text'>Rank</div>
              <div className='rank-number'>50</div>
            </div>
            <div className='player-cost'>$2</div>
          </div>
          <div className='team-dashboard-players-card card-border'>
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
      </div>
    </div>
  );
};

export default AvailableDefense;
