import React from 'react';
import { ReactSVG } from 'react-svg';
import playerImage from '../../../assets/images/icons/player-image.svg';
import { PlayerCard } from '../PlayerCard';
import { useDispatch } from 'react-redux';
import { toggleOverlay } from '@redux/actions';
import {SignPlayer} from '../SignPlayer';

const AvailableGoalies = () => {

  const dispatch = useDispatch();

  const goToNextSign = () => {
    dispatch(
      toggleOverlay({
        isOpen: true,
        template: <SignPlayer/>
      })
    );
  }

  return (
    <div className='available-players'>
      <p className='available-players-title'>Goalies you can sign</p>

      <div className='available-players-cards'>
        <div onClick={goToNextSign}><PlayerCard/></div>
      </div>
    </div>
  );
};

export default AvailableGoalies;
