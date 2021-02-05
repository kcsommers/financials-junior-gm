import React from 'react';
import { ReactSVG } from 'react-svg';
import playerImage from '../../icons/player-image.svg';

const AvailableForwards = () => {
  return (
    <div className="available-players">
      <p className="available-players-title">Forwards you can sign</p>
      
      <div className="available-players-cards">

        <div>
          <p className="player-card-title">Position</p>
          <div className="team-dashboard-players-card-top card-top-border">
            <div>
              <div className="rank-text">Rank</div>
              <div className="rank-number">50</div>
            </div>
            <div className="player-cost">$2</div>
          </div>
          <div className="team-dashboard-players-card card-border">
            <ReactSVG src={playerImage} />
            <div className="player-meters-row">
              <div>
                <p>Off</p>
                <div class="offense-meter"></div>
              </div>
              <div>
                <p>Pass</p>
                <div class="passing-meter"></div>
              </div>
              <div>
                <p>Def</p>
                <div class="defense-meter"></div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="player-card-title">Position</p>
          <div className="team-dashboard-players-card-top card-top-border">
            <div>
              <div className="rank-text">Rank</div>
              <div className="rank-number">50</div>
            </div>
            <div className="player-cost">$2</div>
          </div>
          <div className="team-dashboard-players-card card-border">
            <ReactSVG src={playerImage} />
            <div className="player-meters-row">
              <div>
                <p>Off</p>
                <div class="offense-meter"></div>
              </div>
              <div>
                <p>Pass</p>
                <div class="passing-meter"></div>
              </div>
              <div>
                <p>Def</p>
                <div class="defense-meter"></div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="player-card-title">Position</p>
          <div className="team-dashboard-players-card-top card-top-border">
            <div>
              <div className="rank-text">Rank</div>
              <div className="rank-number">50</div>
            </div>
            <div className="player-cost">$2</div>
          </div>
          <div className="team-dashboard-players-card card-border">
            <ReactSVG src={playerImage} />
            <div className="player-meters-row">
              <div>
                <p>Off</p>
                <div class="offense-meter"></div>
              </div>
              <div>
                <p>Pass</p>
                <div class="passing-meter"></div>
              </div>
              <div>
                <p>Def</p>
                <div class="defense-meter"></div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="player-card-title">Position</p>
          <div className="team-dashboard-players-card-top card-top-border">
            <div>
              <div className="rank-text">Rank</div>
              <div className="rank-number">50</div>
            </div>
            <div className="player-cost">$2</div>
          </div>
          <div className="team-dashboard-players-card card-border">
            <ReactSVG src={playerImage} />
            <div className="player-meters-row">
              <div>
                <p>Off</p>
                <div class="offense-meter"></div>
              </div>
              <div>
                <p>Pass</p>
                <div class="passing-meter"></div>
              </div>
              <div>
                <p>Def</p>
                <div class="defense-meter"></div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default AvailableForwards;
