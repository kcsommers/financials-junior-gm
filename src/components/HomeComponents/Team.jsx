import React from 'react'
import '../../css/home_page/Team.css';
import { ReactSVG } from 'react-svg';
import icon from '../../icons/team-hockey-stick.svg';

function Team() {
  return (

    <div>

      <ReactSVG src={icon} />

      <p className="team-text">See your squad. Sign or scout new players!</p>

    </div>
  )
}

export default Team;
