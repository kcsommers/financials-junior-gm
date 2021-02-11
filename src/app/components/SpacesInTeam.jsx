import React from 'react';

export const SpacesInTeam = () => {
  return (
    <div>
      <p className="spaces-in-your-team-title">Spaces in your team</p>
      <div className="spaces-in-your-team-container">
        <div>
          <div className="available-positions">
            <p className="position">Forwards:</p>
            <p className="positions-available-digit">0</p>
          </div>
          <div className="available-positions">
            <p className="position">Defenders:</p>
            <p>1</p>
          </div>
          <div className="available-positions">
            <p>Goalie:</p>
            <p>0</p>
          </div>
          <div className="available-positions">
            <p>Bench:</p>
            <p>3</p>
          </div>
        </div>
      </div>
    </div>
  )
}
