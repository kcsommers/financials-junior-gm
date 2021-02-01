import React from 'react';
import '../../css/home_page/MoneyLeftCard.css';
import { ReactSVG } from 'react-svg';
import icon from '../../icons/hockey-visual-2.svg';

function MoneyLeftCard() {
  return (
    <div className="money-left-card">
      <div className="money-left-circle"><p>25</p></div>
      
      <div className="money-left-hockey-stick-box">
        <ReactSVG src={icon} />
      </div>

      <h1 className="money-left-title">Money <br/>Left</h1>
    </div>
  )
}

export default MoneyLeftCard;
