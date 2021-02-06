import React from 'react';
import { ReactSVG } from 'react-svg';
import playerImage from '../../../assets/images/icons/player-image.svg';
import { PlayerCard } from '../PlayerCard';

const AvailableDefense = () => {
  return (
    <div className='available-players'>
      <p className='available-players-title'>Defense you can sign</p>

      <div className='available-players-cards'>

        <PlayerCard/>
        <PlayerCard/>
        <PlayerCard/>
        <PlayerCard/>

      </div>
    </div>
  );
};

export default AvailableDefense;
