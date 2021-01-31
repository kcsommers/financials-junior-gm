import React from 'react';
import '../../css/home_page/Season.css';
import { ReactSVG } from 'react-svg';
import icon from '../../icons/season-hockey-stick.svg';

function Season() {
  return (
    <div className="season-hockey-stick">
      <ReactSVG src={icon} />

      <p className="season-text">Play matches and win the championship!</p>

    </div>
  )
}

export default Season;
