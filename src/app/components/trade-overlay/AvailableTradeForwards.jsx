import React from 'react';
import {PlayerCard} from '../PlayerCard';
import {BrowserRouter as Router} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toggleOverlay } from '@redux/actions';
import {TradePlayerSelected} from '../public-api';

const AvailableForwards = () => {

  const dispatch = useDispatch();

  const goToNextTrade = () => {
    dispatch(
      toggleOverlay({
        isOpen: true,
        template: <TradePlayerSelected/>
      })
    );
  }

  return (
    <Router>
      <div className='available-players'>
        <p className='available-players-title'>Forwards you can sign</p>

        <div className='available-players-cards'>
          
          <div onClick={goToNextTrade}><PlayerCard /></div>
        </div>
      </div>
    </Router>
  );
};

export default AvailableForwards;
