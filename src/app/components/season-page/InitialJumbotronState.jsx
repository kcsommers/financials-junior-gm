import React from 'react';
import { ReactSVG } from 'react-svg';
import { Indicator } from '@components';
import blueBearsLogo from '@images/icons/blue-bears-logo.svg';
import '../../../assets/css/components/season-page/initial-jumbotron-state.css';
import { useDispatch, useSelector } from 'react-redux';

export const InitialJumbotronState = ({seasonState}) => {

  const currentOpponent = seasonState && seasonState.teams && seasonState.teams[seasonState.currentOpponentIndex]

  console.log('the current opponent: ', currentOpponent)
  console.log('the op index', seasonState.currentOpponentIndex)
  return (seasonState && currentOpponent) ? ( 
    <div className='season-initial-container'>
      <div>
        <ReactSVG src={seasonState.image} />
        <div>
          <p className='your-stats-title'>Stats</p>
          <div className='your-stats-container'>
            <div>
              <p className="your-stats-wins">Wins</p>
              <div className="your-stats">{seasonState.wins}</div>
            </div>
            <div>
              <p className="your-stats-losses">Losses</p>
              <div className="your-stats">{seasonState.losses}</div>
            </div>
            <div>
              <p className="your-stats-points">Points</p>
              <div className="your-stats">{seasonState.points}</div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p className='next-opponent-title'>Next Opponent</p>
        <div className='next-opponent-container'>
          <div className="opponent-logo-container" style={{transform: 'scale(0.9)'}}>
            <ReactSVG src={currentOpponent.image}/>
          </div>
          <div className='sotr-details' style={{ transform: 'scale(0.9)' }}>
            <Indicator amount={25} />
          </div>
        </div>
        <div>
          <p className='upcoming-games-title'>Upcoming Games</p>
          <div>
            <div className='upcoming-games-container'>
              
              <div className="upcoming-game"  style={{transform: 'scale(0.7)'}}>
                <div className="opponent-logo-container">
                  <ReactSVG src={seasonState.teams[1].image}/>
                </div>
                <div className='sotr-details'>
                  <Indicator amount={25} />
                </div>
              </div>
            
              <div className="upcoming-game" style={{transform: 'scale(0.7)'}}>
                <div className="opponent-logo-container">
                  <ReactSVG src={seasonState.teams[2].image}/>
                </div>
                <div className='sotr-details'>
                  <Indicator amount={25} />
                </div>
              </div>
              
              <div className="upcoming-game" style={{transform: 'scale(0.7)'}}>
                <div className="opponent-logo-container">
                  <ReactSVG src={seasonState.teams[3].image}/>
                </div>
                <div className='sotr-details'>
                  <Indicator amount={25} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
