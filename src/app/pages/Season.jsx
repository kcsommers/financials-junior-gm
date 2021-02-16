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
import {LoadingSpinner} from '@components'

import {
  setScore,
  setJumbotronDisplay,
  setSeasonSign,
  setSimulationButton,
  setSimulateGame,
  setStats,
  updateCurrentOpponent,
  updateOpponentIndex,
} from '@redux/actions';
import { PlayingGame } from '../components/season-page/PlayingGame';
import { setLoginState, updateSeasonState } from '../redux/actions';

const Season = () => {

  let seasonState = useSelector((state) => {
    return state.season
  });

  // const student = useSelector((state) => state.studentState.student);


  const [gameOn, setGameOn] = useState(false)
  const [score, setScore] = useState([0,0])
  const [results, setResults] = useState([])

  const opponentIndex = seasonState.currentOpponentIndex

  const currentOpponent = seasonState.teams[seasonState.currentOpponentIndex]

  //const score = seasonState.score

  const dispatch = useDispatch();

  let wins = seasonState.wins

  let losses = seasonState.losses

  let points = seasonState.points

  const [display, setDisplay] = useState(<InitialJumbotronState seasonState={seasonState}/>)

  const jumbotronDisplay = seasonState.jumbotronDisplay

  const seasonSign = seasonState.seasonSign

  const simulationButton = seasonState.simulationButton

  const simulateGame = seasonState.simulateGame

  const rank = seasonState.rank

  const teams = seasonState.teams


  const theResultScore = (rank, opponentRank) => {
    // let rankDiff = student.rank - opponentRank
    let rankDiff = rank - opponentRank
    console.log(rankDiff, opponentRank)
    // if (!student) return
    dispatch (
      setSeasonSign('Your results are here!')
    )
    if(rankDiff > 5) {
      score[0] = rankDiff / 10
      score[1] = 0
      // dispatch(
      //   setSeasonSign('GET LOUD! The Jr Sharks Won!')
      // )
      // dispatch(
      //   setStats({
      //     wins: seasonState.wins + 1,
      //     points: seasonState.points + 2,
      //     losses: seasonState.losses + 0
      //   })
      // )
      return [rankDiff / 10,  0]
    } else if (Math.abs(rankDiff) > 0 && Math.abs(rankDiff) <= 5) {
      score[0] = 2
      score[1] = 1
      // dispatch(
      //   setSeasonSign('CLOSE GAME! The Jr Sharks won in overtime.')
      // )
      // dispatch(
      //   setStats({
      //     wins: seasonState.wins + 1,
      //     points: seasonState.points + 1,
      //     losses: seasonState.losses + 0
      //   })
      // )
      return [2, 1]
    } else {
      score[0] = 0
      score[1] = rankDiff / 10
      // dispatch(
      //   setSeasonSign('OH NO! The Jr Sharks lost:(')
      // )
      // dispatch(
      //   setStats({
      //     wins: seasonState.wins + 0,
      //     points: seasonState.points + 0,
      //     losses: seasonState.losses + 1
      //   })
      // )
      return [0, rankDiff/10]
    }
  };

  const getResults =  (teams) => {
    let r = []
    for (let i = 0; i < teams.length; i++) {
      console.log(rank, teams[i].rank)
      let result = {
        team: teams[i].name,
        score: theResultScore(rank, teams[i].rank)
      }
      r.push(result)
    }
    console.log(r)
    let w = 0
    let l = 0
      let p = 0
    for (let i = 0; i < r.length; i++) {
      
      // console.log(r[i].score[0], r[i].score[1] )
      if (r[i].score[0] - r[i].score[1] >= 2 ) {
        
        w += 1
        p += 2
        console.log('win', r[i].score[0], r[i].score[1], w, p )
      } else if (r[i].score[0] - r[i].score[1] >= 1 && r[i].score[0] - r[i].score[1] < 2) {
        w += 1
        p += 1
        console.log('otwin', r[i].score[0], r[i].score[1], w, p )
      } else if (r[i].score[1] - r[i].score[0] > 2 ) {
        l += 1
        console.log('loss', r[i].score[0], r[i].score[1] )
      }
      console.log('computed stats', w, l , p)
      dispatch (
        setStats ({
          wins: w,
          losses: l,
          points: p
        })
      )
    }
    return r
  }

  const theResultStats = () => {
    if (score[0] - score[1] > 1) {
      dispatch(
        setStats({
          wins: wins + 1,
          points: points + 2,
          losses: losses + 0,
        })
      );
    } else if (Math.abs(score[0] - score[1]) == 1) {
      dispatch(
        setStats({
          wins: wins + 1,
          points: points + 1,
          losses: losses + 0,
        })
      );
    } else {
      dispatch(
        setStats({
          wins: wins + 0,
          points: points + 0,
          losses: losses + 1,
        })
      );
    }
  };
  //let gameresults = []
  const handlePlay = () => {
    // setTimeout(() => {
    //   dispatch(setSeasonSign('Coming up next'));
    // }, 100);
    // setTimeout(() => {
    //   dispatch(setJumbotronDisplay(<PlayingGame />));
    //   dispatch(setSeasonSign(`Jr Sharks vs ${currentOpponent.name}`));
    // }, 3000);
    // setTimeout(() => {
    //   dispatch(setSeasonSign('The players are warming up'));
    // }, 6000);
    // setTimeout(() => {
    //   dispatch(setSeasonSign('The game is being played'));
    // }, 9000);

    // dispatch(setSimulationButton(hockeySticksButton));
    // setTimeout(() => {
    //   dispatch(setScore(theResultScore()));
    //   dispatch(setSeasonSign('GET LOUD! The Jr Sharks Won!'));
    //   theResultStats();
    // }, 12000);
    // setTimeout(function () {
    //   dispatch(setJumbotronDisplay(<InitialJumbotronState />));
    //   dispatch(updateOpponentIndex(opponentIndex + 1));
    //   dispatch(updateCurrentOpponent(currentOpponents));
    //   setTimeout(() => {
    //     dispatch(
    //       setSeasonSign('Coming up next')
    //     )
    //   }, 100)
    //   setTimeout(() => {
    //     setDisplay(<PlayingGame seasonState={seasonState} score={score}/>)
    //     dispatch(
    //       setSeasonSign(`Jr Sharks vs ${currentOpponent.name}`)
    //     )
    //   }, 3000)
      
    //   setTimeout(() => {
    //     dispatch(setSeasonSign(`The next game starts in ${2}`));
    //   }, 2000);
    //   setTimeout(() => {
    //     dispatch(
    //       setSeasonSign('The game is being played')
    //     )
    //   }, 9000)
    //   dispatch(
    //     setSimulationButton(hockeySticksButton)
    //   )
    //   setTimeout(() => {
    //     //dispatch(
    //       //setScore(theResultScore())
    //     //)
    //     //theResultStats();
    //     setDisplay(<PlayingGame seasonState={seasonState} score={theResultScore()}/>)
    //   }, 12000)
    //   setTimeout(function(){
    //     //dispatch(
    //     setDisplay(<InitialJumbotronState seasonState={seasonState}/>)
    //     //)
    //     dispatch(
    //       updateOpponentIndex(opponentIndex + 1)
    //     )
    //     dispatch(
    //       setSeasonSign('Play next team')
    //     )
    //     dispatch (
    //       setSimulationButton(play)
    //     )
    //   }, 15000)
       setResults(getResults(teams))
       setTimeout(() => {setDisplay(<InitialJumbotronState seasonState={seasonState}/>)}, 100)
    }
  
  const startSequence = () => {
    //setDisplay(<PlayingGame seasonState={seasonState} score={score}/>)
    //setGameOn(true)
    handlePlay()
  }

  

  console.log(currentOpponent)
  
  // student ?  
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
            <p className='season-schedule-title'>Results</p>
            <div className='season-schedule-box'>
              <div className='upcoming-games'>
                <div className='season-schedule-spacing'>
                  <p className='player-team-title'>Jr Sharks</p>
                  <p className='season-schedule-spacing'>vs</p>
                  <p>{teams[0].name}</p>
                </div>
                <div className='season-schedule-spacing'>
                  <p>{results.length > 0 ? results[0].score[0]: 0}</p>
                  <p className='season-schedule-spacing'>-</p>
                  <p>{results.length > 0 ? results[0].score[1]: 0}</p>
                </div>
              </div>
              <div className='upcoming-games'>
                <div className='season-schedule-spacing'>
                  <p className='player-team-title'>Jr Sharks</p>
                  <p className='season-schedule-spacing'>vs</p>
                  <p>{teams[1].name}</p>
                </div>
                <div className='season-schedule-spacing'>
                  <p>{results.length > 0 ? results[1].score[0]: 0}</p>
                  <p className='season-schedule-spacing'>-</p>
                  <p>{results.length > 0 ? results[1].score[1]: 0}</p>
                </div>
              </div>
              <div className='upcoming-games'>
                <div className='season-schedule-spacing'>
                  <p className='player-team-title'>Jr Sharks</p>
                  <p className='season-schedule-spacing'>vs</p>
                  <p>{teams[2].name}</p>
                </div>
                <div className='season-schedule-spacing'>
                  <p>{results.length > 0 ? results[2].score[0]: 0}</p>
                  <p className='season-schedule-spacing'>-</p>
                  <p>{results.length > 0 ? results[2].score[1]: 0}</p>
                </div>
              </div>
              <div className='upcoming-games'>
                <div className='season-schedule-spacing'>
                  <p className='player-team-title'>Jr Sharks</p>
                  <p className='season-schedule-spacing'>vs</p>
                  <p>{teams[3].name}</p>
                </div>
                <div className='season-schedule-spacing'>
                  <p>{results.length > 0 ? results[3].score[0]: 0}</p>
                  <p className='season-schedule-spacing'>-</p>
                  <p>{results.length > 0 ? results[3].score[1]: 0}</p>
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
  ) 
  // : (<div
  //   style={{
  //     position: 'absolute',
  //     top: 0,
  //     bottom: 0,
  //     left: 0,
  //     right: 0,
  //     display: 'flex',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //   }}
  // >
  //   <LoadingSpinner />
  // </div>)
  ;
};

export default Season;
