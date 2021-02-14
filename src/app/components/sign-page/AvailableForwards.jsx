import React from 'react';
import { PlayerCard } from '../PlayerCard';
import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toggleOverlay } from '@redux/actions';
import { SignPlayer } from '../SignPlayer';

const AvailableForwards = () => {
  const dispatch = useDispatch();

  const goToNextSign = () => {
    dispatch(
      toggleOverlay({
        isOpen: true,
        template: <SignPlayer />,
      })
    );
  };

  return (
    <Router>
      <div className='available-players'>
        <p className='available-players-title'>Forwards you can sign</p>

        <div className='available-players-cards'>
          <div onClick={goToNextSign}>
            <PlayerCard />
          </div>
        </div>
      </div>
    </Router>
  );
};

export default AvailableForwards;
