import React from 'react';
import '../../../assets/css/components/release-overlay/release-overlay.css';
import {
  TeamBudgetState,
  FilledPlayerCard,
  PlayerReleased,
} from '../public-api';
import { ReactSVG } from 'react-svg';
import { useDispatch } from 'react-redux';
import { toggleOverlay } from '@redux/actions';
import cancelBig from '../../../assets/images/icons/cancel-big.svg';
import confirmBig from '../../../assets/images/icons/confirm-big.svg';

export const ReleasePlayer = () => {
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(
      toggleOverlay({
        isOpen: true,
        template: null,
      })
    );
  };

  const handleConfirm = () => {
    dispatch(
      toggleOverlay({
        isOpen: true,
        template: <PlayerReleased />,
      })
    );
  };

  return (
    <div className='release-dashboard'>
      <div className='release-d-top-row'>
        <div>
          <p className='rank-budget-title'>Changes to Rank and Budget</p>
          <TeamBudgetState />
        </div>
        <FilledPlayerCard />
      </div>

      <p className='release-player-question'>
        Are you sure you want to release the following player?
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
