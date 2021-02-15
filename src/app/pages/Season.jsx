import React, {useState} from 'react';
import { ReactSVG } from 'react-svg';
import seasonStick from '@images/season-stick.svg';
import jrSharksLogoWhiteBg from '@images/icons/jr-sharks-logo-white-bg.svg';
import play from '@images/icons/play.svg';
import hockeySticksButton from '@images/icons/hockey-sticks-button.svg';
import {
  TeamRankStick,
  OpposingTeamRankStick,
  HeaderComponent,
  LevelStick
} from '@components';
import { SticklessOpposingTeamRank } from '../components/SticklessOpposingTeamRank';
import '@css/pages/season.css';
import { SeasonTopRow } from '../components/season-page/SeasonTopRow';
import { SeasonTopRowSign } from '../components/season-page/SeasonTopRowSign';
import { InitialJumbotronState } from '../components/season-page/InitialJumbotronState';
import { useDispatch, useSelector } from 'react-redux';
import { setScore, setJumbotronDisplay, setSeasonSign, setSimulationButton, setSimulateGame, setStats, updateCurrentOpponent, updateOpponentIndex} from '@redux/actions';
import { PlayingGame } from '../components/season-page/PlayingGame';

const Season = () => {

  const opponentIndex = useSelector(state => {
    return state.season.currentOpponentIndex
  })

  const opponents = useSelector(state => {
    return state.season.teams
  })

  const score = useSelector(state => {
    return state.season.score
  })

  const currentOpponents = opponents[opponentIndex]

  const dispatch = useDispatch();

  const stats = useSelector(state => {
    return state.season.stats
    console.log('heeeeellloooo')
  })

  const jumbotronDisplay = useSelector((state) => {
    return state.season.jumbotronDisplay
  });

  const seasonSign = useSelector((state) => {
    return state.season.seasonSign
  });

  const simulationButton = useSelector((state) => {
    return state.season.simulationButton
  });

  const simulateGame = useSelector(state => {
    return state.season.simulateGame
  })

  const rank = useSelector(state => {
    return state.season.rank
  })

  const currentOpponent = useSelector(state => {
    return state.season.currentOpponent
  })

  const theResultScore = () => {
    let rankDiff = rank - currentOpponent.rank
    if(rankDiff > 5) {
      return [rankDiff / 10,  0]
    } else if (Math.abs(rankDiff) >= 0 && Math.abs(rankDiff) < 5) {
      return [2, 1]
    } else {
      return [0, rankDiff/10]
    }
  }

  const theResultStats = () => {
    if(score[0] - score[1] > 1) {
      dispatch(
        setStats({
          wins: stats.wins + 1,
          points: stats.points + 2
        })
      )
    }
  }

  const handlePlay = () => {
      dispatch(
        setJumbotronDisplay(<PlayingGame/>)
      );
      setTimeout(() => {
        dispatch(
          setSeasonSign('Coming up next')
        )
      }, 5000)
      setTimeout(() => {
        dispatch(
          setSeasonSign('Jr Sharks vs Blue Bears')
        )
      }, 10000)
      setTimeout(() => {
        dispatch(
          setSeasonSign('The players are warming up')
        )
      }, 15000)
      setTimeout(() => {
        dispatch(
          setSeasonSign('The game is being played')
        )
      }, 20000)
      
      dispatch(
        setSimulationButton(hockeySticksButton)
      )
      setTimeout(() => {
        dispatch(
          setScore(theResultScore())
        )
        dispatch(
          setSeasonSign('GET LOUD! The Jr Sharks Won!')
        )
      }, 25000)
      theResultStats();
      dispatch(
        updateOpponentIndex(opponentIndex + 1)
      )
      dispatch(
        updateCurrentOpponent(currentOpponents)
      )
      setTimeout(function(){
        let countdown = 3
        dispatch(
          setJumbotronDisplay(<InitialJumbotronState/>)
        )
        dispatch(
          setSeasonSign(`The next game starts in ${countdown}`)
        )
      }, 28000)
  }

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
            <LevelStick type='teamRank' />
          </div>
          <div>
            <div className='teams-jumbotron'>
              <div className='season-team-left-border'></div>
              <div className='season-teams-playing-box'>
                {jumbotronDisplay}
              </div>
              <div className='season-team-right-border'></div>
            </div>
            <div className='SeasonTopRow-sign'>
              {seasonSign}
            </div>
          </div>
          <div style={{ paddingTop: '1rem' }}>
            <LevelStick type="opponentTeamRank"/>
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

          <ReactSVG src={simulationButton} onClick={handlePlay}/>

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
