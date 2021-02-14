import React from 'react';
import {
  TeamRankStick,
  MoneyLeftStick,
  Cancel,
  FilledPlayerCard,
  LevelStick,
  PlayerTraded,
  TeamBudgetState,
} from '../public-api';
import { ReactSVG } from 'react-svg';
import { useDispatch } from 'react-redux';
import { toggleOverlay } from '@redux/actions';
import { FindTradePlayer } from './FindTradePlayer';
import cancelBig from '../../../assets/images/icons/cancel-big.svg';
import confirmBig from '../../../assets/images/icons/confirm-big.svg';
import arrowRight from '../../../assets/images/icons/arrow-right.svg';
import arrowLeft from '../../../assets/images/icons/arrow-left.svg';
import '../../../assets/css/components/trade-overlay/trade-player-selected.css';

export const TradePlayerSelected = () => {
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(
      toggleOverlay({
        isOpen: true,
        template: <FindTradePlayer />,
      })
    );
  };

  const handleConfirm = () => {
    dispatch(
      toggleOverlay({
        isOpen: true,
        template: <PlayerTraded />,
      })
    );
  };

  return (
    <div className='trade-dashboard'>
      <div className='trade-player-sel-top-row'>
        <div className='rank-budget-container'>
          <p className='rank-budget-title'>Changes to Rank and Budget</p>
          <TeamBudgetState />
        </div>
        <div className='player-exchange-container'>
          <div>
            <p className='player-exchange-out'>OUT</p>
            <FilledPlayerCard />
          </div>

          <div className='player-exchange-arrows'>
            <ReactSVG src={arrowRight} />
            <ReactSVG src={arrowLeft} />
          </div>
          <div>
            <p className='player-exchange-in'>IN</p>
            <FilledPlayerCard />
          </div>
        </div>
      </div>

      <p className='trade-player-question'>
        Are you sure you want to trade Player with Player?
      </p>
      <div className='sign-player-options'>
        <div>
          <p>Cancel</p>
          <ReactSVG
            style={{ cursor: 'pointer' }}
            onClick={handleCancel}
            src={cancelBig}
          />
        </div>
        <div>
          <p>Confirm</p>
          <ReactSVG
            style={{ cursor: 'pointer' }}
            onClick={handleConfirm}
            src={confirmBig}
          />
        </div>
      </div>
    </div>
  );
};
