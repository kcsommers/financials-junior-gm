import React from 'react';
import {TeamRankStick}  from './TeamRankStick';
import {MoneyLeftStick}  from './MoneyLeftStick';
import { ReactSVG } from 'react-svg';
import cancelBig from '@images/icons/cancel-big.svg';
import confirmBig from '@images/icons/confirm-big.svg'
import '../../assets/css/components/sign-player.css';
import { useDispatch } from 'react-redux';
import { toggleOverlay } from '@redux/actions';
import {PlayerSigned} from './PlayerSigned';
import Sign from './Sign';

export const SignPlayer = () => {

  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(
      toggleOverlay({
        isOpen: true,
        template: <Sign/>
      })
    );
  }

  const handleConfirm = () => {
    dispatch(
      toggleOverlay({
        isOpen: true,
        template: <PlayerSigned/>
      })
    );
  }

  return (
    <div className="sign-player-dashboard">
      <div className="sign-player-dashboard-top-row">
        <div>
          <p className="changes-to-rank-budget">Changes To Rank And Budget</p>
          <div className="sign-player-visual-state">
            <TeamRankStick/>
            <MoneyLeftStick/>
          </div>
        </div>
        

      </div>
      
      
        
        <p className="sign-player-question">Are you sure you want to sign the following player?</p>
        <div className="sign-player-options">
          <div>
            <p>Cancel</p>
            <ReactSVG style={{cursor: 'pointer'}} onClick={handleCancel} src={cancelBig}/>
          </div>
          <div>
            <p>Confirm</p>
            <ReactSVG style={{cursor: 'pointer'}} onClick={handleConfirm} src={confirmBig}/>
          </div>
        </div>
        
        
    </div>
  )
}