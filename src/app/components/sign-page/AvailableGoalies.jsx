import React from 'react';
import { ReactSVG } from 'react-svg';
import playerImage from '../../../assets/images/icons/player-image.svg';
import { PlayerCard } from '../PlayerCard';

const AvailableGoalies = () => {
  return (
    <div className='available-players'>
      <p className='available-players-title'>Goalies you can sign</p>

      <div className='available-players-cards'>
        <PlayerCard/>
      </div>
    </div>
  );
};

export default AvailableGoalies;
