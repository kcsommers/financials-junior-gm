import React from 'react';
import { ReactSVG } from 'react-svg';
import icon from '../../icons/trophies-hockey-stick.svg'
import '../../css/home_page/trophies.css'

function Trophies() {
  return (
    <div className="trophies-hockey-stick">
      <ReactSVG src={icon} />
      <p className="trophies-text">See your badges and trophies!</p>
    </div>
  )
}

export default Trophies;