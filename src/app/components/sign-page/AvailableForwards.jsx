import React from 'react';
import { ReactSVG } from 'react-svg';
import playerImage from '../../../assets/images/icons/player-image.svg';
import {PlayerCard} from '../PlayerCard';
import {BrowserRouter as Router} from 'react-router-dom';

const AvailableForwards = () => {

  const goToNextSign = () => {
    
  }

  return (
    <Router>
      <div className='available-players'>
        <p className='available-players-title'>Forwards you can sign</p>

        <div className='available-players-cards'>
          
          <PlayerCard onClick={goToNextSign}/>
        </div>
      </div>
    </Router>
  );
};

export default AvailableForwards;
