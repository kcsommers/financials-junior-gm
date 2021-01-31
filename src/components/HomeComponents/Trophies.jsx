import React from 'react';
import { ReactSVG } from 'react-svg';
import icon from '../../icons/trophies-hockey-stick.svg'
import '../../css/trophies.css'

function Trophies() {
  return (
    <div className="trophies-hockey-stick">
      <ReactSVG src={icon} />
      <p className="team-text">See your badges and</p>
    </div>
  )
}

export default Trophies;