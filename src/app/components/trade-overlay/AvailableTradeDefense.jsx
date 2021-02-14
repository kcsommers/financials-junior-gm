import React from 'react';
import { ReactSVG } from 'react-svg';
import playerImage from '../../../assets/images/icons/player-image.svg';
import { PlayerCard } from '../PlayerCard';
import { useDispatch } from 'react-redux';
import { toggleOverlay } from '@redux/actions';
import { TradePlayerSelected } from '../public-api';

const AvailableDefense = () => {
  const dispatch = useDispatch();

  const goToNextTrade = () => {
    dispatch(
      toggleOverlay({
        isOpen: true,
        template: <TradePlayerSelected />,
      })
    );
  };

  return (
    <div className='available-players'>
      <p className='available-players-title'>Defense you can sign</p>

      <div className='available-players-cards'>
        <div onClick={goToNextTrade}>
          <PlayerCard />
        </div>
        <div onClick={goToNextTrade}>
          <PlayerCard />
        </div>
        <div onClick={goToNextTrade}>
          <PlayerCard />
        </div>
        <div onClick={goToNextTrade}>
          <PlayerCard />
        </div>
      </div>
    </div>
  );
};

export default AvailableDefense;
