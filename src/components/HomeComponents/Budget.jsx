import React from 'react';
import { ReactSVG } from 'react-svg';
import icon from '../../icons/budget-hockey-stick.svg'
import '../../css/budget.css'

function Budget() {
  return (
    <div className="budget-hockey-stick">
      <ReactSVG src={icon} />
      <p className="team-text">Manage your team's</p>
    </div>
  )
}

export default Budget;