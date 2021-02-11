import React from 'react'
import {FilledPlayerCard} from '../public-api';
import {ReactSVG} from 'react-svg';
import arrowRight from '../../../assets/images/icons/arrow-right.svg'
import arrowLeft from '../../../assets/images/icons/arrow-left.svg'

export const PlayerTradeExchange = () => {
  return (
    <div className="player-exchange-container">
      <div>
        <p className="player-exchange-out">OUT</p>
        <FilledPlayerCard/>
      </div>
      
      <div className="player-exchange-arrows">
        <ReactSVG src={arrowRight}/>
        <ReactSVG src={arrowLeft}/>
      </div>
      <div>
        <p className="player-exchange-in">IN</p>
        <FilledPlayerCard/>
      </div>
    </div>
  )
}
