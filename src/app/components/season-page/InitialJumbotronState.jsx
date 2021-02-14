import React from 'react';
import { ReactSVG } from 'react-svg';
import {LevelStick} from '../LevelStick'
import jrSharksLogoWhiteBg from '@images/icons/jr-sharks-logo-white-bg.svg';
import blueBearsLogo from '@images/icons/blue-bears-logo.svg'
import '../../../assets/css/components/season-page/initial-jumbotron-state.css'
import { useDispatch, useSelector } from 'react-redux';
import { setImage, setStats, setStandings, setNextOpponent, setUpcomingGames} from '@redux/actions';

export const InitialJumbotronState = () => {

  const dispatch = useDispatch();
  const image = useSelector((state) => {
    return state.season.image
  });
  const stats = useSelector((state) => {
    return state.season.stats
  });
  const standings = useSelector((state) => {
    return state.season.standings
  });
  const nextOpponent = useSelector((state) => {
    return state.season.nextOpponent
  });
  const upcomingGames = useSelector((state) => {
    return state.season.upcomingGames
  });

  return (
    <div className="season-initial-container">
      <div>
        <ReactSVG src={jrSharksLogoWhiteBg} />
        <div>
          <p className="your-stats-title">Stats</p>
          <div className="your-stats-container">
            <div>
              <p className="your-stats-wins">Wins</p>
              <div className="your-stats">{stats.wins}</div>
            </div>
            <div>
              <p className="your-stats-losses">Losses</p>
              <div className="your-stats">{stats.losses}</div>
            </div>
            <div>
              <p className="your-stats-points">Points</p>
              <div className="your-stats">{stats.points}</div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p className='next-opponent-title'>Next Opponent</p>
        <div className='next-opponent-container'>
          <div className="opponent-logo-container" style={{transform: 'scale(0.9)'}}>
            <ReactSVG src={blueBearsLogo}/>
          </div>
          <div className='sotr-details' style={{transform: 'scale(0.9)'}}>
            <LevelStick type='noStickOpponentTeamRank' />
          </div>
        </div>
        <div>
          <p className="upcoming-games-title">Upcoming Games</p>
          <div>
            <div className='upcoming-games-container'>
              
              <div className="upcoming-game"  style={{transform: 'scale(0.7)'}}>
                <div className="opponent-logo-container">
                  <ReactSVG src={blueBearsLogo}/>
                </div>
                <div className='sotr-details'>
                  <LevelStick type='noStickOpponentTeamRank' />
                </div>
              </div>
            
              <div className="upcoming-game" style={{transform: 'scale(0.7)'}}>
                <div className="opponent-logo-container">
                  <ReactSVG src={blueBearsLogo}/>
                </div>
                <div className='sotr-details'>
                  <LevelStick type='noStickOpponentTeamRank' />
                </div>
              </div>
              
              <div className="upcoming-game" style={{transform: 'scale(0.7)'}}>
                <div className="opponent-logo-container">
                  <ReactSVG src={blueBearsLogo}/>
                </div>
                <div className='sotr-details'>
                  <LevelStick type='noStickOpponentTeamRank' />
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
      {/* <p className='season-team-place'>3rd</p>
      <ReactSVG src={jrSharksLogoWhiteBg} />
      <p className='next-opponent-title'>Next Opponent</p>
      <div className='next-opponent-details'>
        <p className='next-opponent-name'>
          Blue
          <br /> Bears
        </p>
        <div className='sotr-details'>
          <LevelStick type='noStickOpponentTeamRank' />
        </div>
      </div> */}
    </div>
  )
}
