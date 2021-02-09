import React from 'react';

export const AddPlayer = () => {
  return (
    <div>
      <div className='player-card-wrap player-card-large'></div>
      <div className='player-modal-buttons-wrap'>
        <button class='player-modal-button outline-black box-shadow'>
          Trade
        </button>
        <button class='player-modal-button outline-black box-shadow'>
          Release
        </button>
      </div>
    </div>
  );
};
