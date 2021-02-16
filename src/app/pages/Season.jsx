import React, { useState } from 'react';
import { ReactSVG } from 'react-svg';
import seasonStick from '@images/season-stick.svg';
import jrSharksLogoWhiteBg from '@images/icons/jr-sharks-logo-white-bg.svg';
import play from '@images/icons/play.svg';
import hockeySticksButton from '@images/icons/hockey-sticks-button.svg';
import { HeaderComponent, LevelStick } from '@components';
import '@css/pages/season.css';
import { SeasonTopRow } from '../components/season-page/SeasonTopRow';
import { SeasonTopRowSign } from '../components/season-page/SeasonTopRowSign';
import { InitialJumbotronState } from '../components/season-page/InitialJumbotronState';
import { useDispatch, useSelector } from 'react-redux';
import {
  setScore,
  setJumbotronDisplay,
  setSeasonSign,
  setSimulationButton,
  setSimulateGame,
  setStats,
  updateCurrentOpponent,
  updateOpponentIndex
} from '@redux/actions';
import { PlayingGame } from '../components/season-page/PlayingGame';
import { setLoginState, updateSeasonState } from '../redux/actions';

const Season = () => {

  const seasonState = useSelector((state) => {
    return state.season
  });

  const [display, setDisplay] = useState(<InitialJumbotronState seasonState={seasonState}/>)

  const [gameOn, setGameOn] = useState(false)
  const [score, setScore] = useState([0,0])

  const opponentIndex = seasonState.currentOpponentIndex

  const currentOpponent = seasonState.teams[seasonState.currentOpponentIndex]

  //const score = seasonState.score

  const dispatch = useDispatch();

  const wins = seasonState.wins

  const losses = seasonState.losses

  const points = seasonState.points

  const jumbotronDisplay = seasonState.jumbotronDisplay

  const seasonSign = seasonState.seasonSign

  const simulationButton = seasonState.simulationButton

  const simulateGame = seasonState.simulateGame

  const rank = seasonState.rank


  const theResultScore = () => {
    let rankDiff = rank - currentOpponent.rank
    if(rankDiff > 5) {
      score[0] = rankDiff / 10
      score[1] = 0
      dispatch(
        setSeasonSign('GET LOUD! The Jr Sharks Won!')
      )
      dispatch(
        setStats({
          wins: wins + 1,
          points: points + 2,
          losses: losses + 0
        })
      )
      return [rankDiff / 10,  0]
    } else if (Math.abs(rankDiff) >= 0 && Math.abs(rankDiff) < 5) {
      score[0] = 2
      score[1] = 1
      dispatch(
        setSeasonSign('CLOSE GAME! The Jr Sharks won in overtime.')
      )
      dispatch(
        setStats({
          wins: wins + 1,
          points: points + 1,
          losses: losses + 0
        })
      )
      return [2, 1]
    } else {
      score[0] = 0
      score[1] = rankDiff / 10
      dispatch(
        setSeasonSign('OH NO! The Jr Sharks lost:(')
      )
      dispatch(
        setStats({
          wins: wins + 0,
          points: points + 0,
          losses: losses + 1
        })
      )
      return [0, rankDiff/10]
    }
  };

  const theResultStats = () => {
    if(score[0] - score[1] > 1) {
      dispatch(
        setStats({
          wins: wins + 1,
          points: points + 2,
          losses: losses + 0
        })
      )
    } else if (Math.abs(score[0] - score[1]) == 1) {
      dispatch(
        setStats({
          wins: wins + 1,
          points: points + 1,
          losses: losses + 0
        })
      )
    } else {
      dispatch(
        setStats({
          wins: wins + 0,
          points: points + 0,
          losses: losses + 1
        })
      )
    }
  }

  const handlePlay = () => {
      setTimeout(() => {
        dispatch(
          setSeasonSign('Coming up next')
        )
      }, 100)
      setTimeout(() => {
        setDisplay(<PlayingGame seasonState={seasonState} score={score}/>)
        dispatch(
          setSeasonSign(`Jr Sharks vs ${currentOpponent.name}`)
        )
      }, 3000)
      
      setTimeout(() => {
        dispatch(
          setSeasonSign('The players are warming up')
        )
      }, 6000)
      setTimeout(() => {
        dispatch(
          setSeasonSign('The game is being played')
        )
      }, 9000)
      dispatch(
        setSimulationButton(hockeySticksButton)
      )
      setTimeout(() => {
        //dispatch(
          //setScore(theResultScore())
        //)
        //theResultStats();
        setDisplay(<PlayingGame seasonState={seasonState} score={theResultScore()}/>)
      }, 12000)
      setTimeout(function(){
        //dispatch(
        setDisplay(<InitialJumbotronState seasonState={seasonState}/>)
        //)
        dispatch(
          updateOpponentIndex(opponentIndex + 1)
        )
        dispatch(
          setSeasonSign('Play next team')
        )
        dispatch (
          setSimulationButton(play)
        )
      }, 15000)
  }
  
  let playGame = false;
  const startSequence = () => {
    //setDisplay(<PlayingGame seasonState={seasonState} score={score}/>)
    setGameOn(true)
    handlePlay()
  }

  console.log(currentOpponent)
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
            <LevelStick
              type='teamRank'
              amount={50}
              denom={100}
              color='#e06d00'
              indicatorDirection='right'
              textJsx={
                <span>
                  Team <br />
                  Rank
                </span>
              }
            />
          </div>
          <div>
            <div className='teams-jumbotron'>
              <div className='season-team-left-border'></div>
              <div className='season-teams-playing-box'>
                  {display}
                  {/* {gameOn ? (<PlayingGame seasonState={seasonState} score={}/>) : (<InitialJumbotronState seasonState={seasonState}/>)} */}
                </div>
              <div className='season-team-right-border'></div>
            </div>
            <div className='SeasonTopRow-sign'>{seasonSign}</div>
          </div>
          <div style={{ paddingTop: '1rem' }}>
            <LevelStick
              type='teamRank'
              amount={50}
              denom={100}
              color='#002f6c'
              indicatorDirection='left'
              inverse={true}
              textJsx={
                <span>
                  Team <br />
                  Rank
                </span>
              }
            />
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
          
          <ReactSVG src={simulationButton} onClick={startSequence}/>

          <div>
            <p className='season-standings-title'>Standings</p>
            <div className='season-standings-box'>
              <div>
                <div className='standings-team-name-box'>
                  <p className='ptn-title'>Pos. Team Name</p>
                </div>

                <div className='standings-teams-box'>
                  <p>1. Green Giraffes</p>
                  <p>2. Orange Owls</p>
                  <p className='your-team-standing'>3. San Jose Jr Sharks</p>
                  <p>4. Blue Bears</p>
                  <p>5. Pink Pandas</p>
                </div>
              </div>

              <div>
                <div className='standings-team-points-box'>
                  <p className='p-title'>Points</p>
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
    </div>
  );
};

export default Season;
