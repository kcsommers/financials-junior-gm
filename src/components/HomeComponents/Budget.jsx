import React from 'react';
import { ReactSVG } from 'react-svg';
import icon from '../../icons/budget-hockey-stick.svg'
import '../../css/home_page/budget.css'

function Budget() {
  return (
    <div className="budget-hockey-stick">
      <ReactSVG src={icon} />
      <p className="budget-text">Manage your team's budget.</p>
    </div>
  )
}

export default Budget;