import React from 'react';
import { ReactSVG } from 'react-svg';
import { Indicator } from '@components';
import blueBearsLogo from '@images/icons/blue-bears-logo.svg';
import '../../../assets/css/components/season-page/initial-jumbotron-state.css';
import { useDispatch, useSelector } from 'react-redux';

export const ScenarioJumbotron = ({seasonState}, player) => {
  

  const currentOpponent = seasonState && seasonState.teams && seasonState.teams[seasonState.currentOpponentIndex]

  const season = useSelector((state) => {return state.season})

  // const teams = useSelector((state) => {
  //   return state.season.teams
  // })

  // const wins = useSelector((state) => {
  //   return state.season.wins
  // })

  // const losses = useSelector((state) => {
  //   return state.season.losses
  // })

  // const points = useSelector((state) => {
  //   return state.season.points
  // })
  //  console.log(wins, losses, points)
  
  // console.log('the current opponent: ', currentOpponent)
  // console.log('the op index', seasonState.currentOpponentIndex)
  return (seasonState && currentOpponent) ? ( 
    <div className='season-initial-container'>
      <div>
        <ReactSVG src={seasonState.image} />
        <div>
          <p className='your-stats-title'>Stats</p>
          <div className='your-stats-container'>
            <div>
              <p className="your-stats-wins">Wins</p>
              <div className="your-stats">{season.wins}</div>
            </div>
            <div>
              <p className="your-stats-losses">Losses</p>
              <div className="your-stats">{season.losses}</div>
            </div>
            <div>
              <p className="your-stats-points">Points</p>
              <div className="your-stats">{season.points}</div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p className='next-opponent-title'>Next Opponent</p>
        <div className='next-opponent-container'>
          <div className="opponent-logo-container" style={{transform: 'scale(0.9)'}}>
            <ReactSVG src={season.teams[0].image}/>
          </div>
          <div className='sotr-details' style={{ transform: 'scale(0.9)' }}>
            <Indicator amount={season.teams[0].rank} />
            <span style={styles.left.text}>teamRank</span>
          </div>
        </div>
        <div>
          <p className='upcoming-games-title'>Upcoming Games</p>
          <div>
            <div className='upcoming-games-container'>
              
              <div className="upcoming-game"  style={{transform: 'scale(0.7)'}}>
                <div className="opponent-logo-container">
                  <ReactSVG src={season.teams[1].image}/>
                </div>
                <div className='sotr-details'>
                  <Indicator amount={season.teams[1].rank} />
                  <span style={styles.left.text}>teamRank</span>
                </div>
              </div>
            
              <div className="upcoming-game" style={{transform: 'scale(0.7)'}}>
                <div className="opponent-logo-container">
                  <ReactSVG src={season.teams[2].image}/>
                </div>
                <div className='sotr-details'>
                  <Indicator amount={season.teams[2].rank} />
                  <span style={styles.left.text}>teamRank</span>
                </div>
              </div>
              
              <div className="upcoming-game" style={{transform: 'scale(0.7)'}}>
                <div className="opponent-logo-container">
                  <ReactSVG src={season.teams[3].image}/>
                </div>
                <div className='sotr-details'>
                  <Indicator 
                  amount={season.teams[3].rank}
                  />
                  <span style={styles.left.text}>teamRank</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
