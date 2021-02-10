import React from 'react';
import { ReactSVG } from 'react-svg';
import seasonStick from '@images/season-stick.svg';
import jrSharksLogoWhiteBg from '@images/icons/jr-sharks-logo-white-bg.svg';
import {
  TeamRankStick,
  OpposingTeamRankStick,
  HeaderComponent,
} from '@components';
import { SticklessOpposingTeamRank } from '../components/SticklessOpposingTeamRank';
import '@css/pages/season.css';

const Season = () => {
  return (
    <div className='season-page page-container'>
      <HeaderComponent
        stickBtn={seasonStick}
        largeStick={true}
        objectives={['1. Play the season']}
      />

      {/* season dashboard */}
      <div className='season-dashboard'>
        <div className='season-dashboard-top-row'>
          <div style={{ paddingTop: '1rem' }}>
            <TeamRankStick />
          </div>
          <div>
            <div className='teams-jumbotron'>
              <div className='season-team-left-border'></div>
              <div className='season-teams-playing-box'>
                <p className='season-team-place'>3rd</p>
                <ReactSVG src={jrSharksLogoWhiteBg} />
                <p className='next-opponent-title'>Next Opponent</p>
                <div className='next-opponent-details'>
                  <p className='next-opponent-name'>
                    Blue
                    <br /> Bears
                  </p>
                  <div className='sotr-details'>
                    <SticklessOpposingTeamRank />
                    <p className='season-tr-title'>
                      Team
                      <br /> Rank
                    </p>
                  </div>
                </div>
              </div>
              <div className='season-team-right-border'></div>
            </div>
            <div className='ready-to-play-sign'>
              Your team is ready to play.
            </div>
          </div>
          <div style={{ paddingTop: '1rem' }}>
            <OpposingTeamRankStick />
          </div>
        </div>

        <div className='season-dashboard-bottom-row'>
          <div>
            <p className='season-schedule-title'>Schedule</p>
            <div className='season-schedule-box'>
              <div className='upcoming-games current-upcoming-game'>
                <div className='season-schedule-spacing'>
                  <p className='player-team-title'>Jr Sharks</p>
                  <p className='season-schedule-spacing'>vs</p>
                  <p>Blue Bears</p>
                </div>
                <div className='season-schedule-spacing'>
                  <p>0</p>
                  <p className='season-schedule-spacing'>-</p>
                  <p>0</p>
                </div>
              </div>
              <div className='upcoming-games'>
                <div className='season-schedule-spacing'>
                  <p className='player-team-title'>Jr Sharks</p>
                  <p className='season-schedule-spacing'>vs</p>
                  <p>Red Rabbits</p>
                </div>
                <div className='season-schedule-spacing'>
                  <p>0</p>
                  <p className='season-schedule-spacing'>-</p>
                  <p>0</p>
                </div>
              </div>
              <div className='upcoming-games'>
                <div className='season-schedule-spacing'>
                  <p className='player-team-title'>Jr Sharks</p>
                  <p className='season-schedule-spacing'>vs</p>
                  <p>Purple Panthers</p>
                </div>
                <div className='season-schedule-spacing'>
                  <p>0</p>
                  <p className='season-schedule-spacing'>-</p>
                  <p>0</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className='season-standings-title'>Standings</p>
            <div className='season-standings-box'>
              <div className='standings-team-name-box'>
                <p className='ptn-title'>Pos. Team Name</p>
              </div>
              <div className='standings-team-points-box'>
                <p className='p-title'>Points</p>
              </div>
              <div className='standings-teams-box'>
                <p>1. Green Giraffes</p>
                <p>2. Orange Owls</p>
                <p className='your-team-standing'>3. San Jose Jr Sharks</p>
                <p>4. Blue Bears</p>
                <p>5. Pink Pandas</p>
              </div>
              <div className='standings-teams-points-box'>
                <p>12</p>
                <p>11</p>
                <p className='your-team-standing'>9</p>
                <p>7</p>
                <p>6</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Season;
