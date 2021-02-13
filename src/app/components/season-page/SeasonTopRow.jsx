import React from 'react'
import { ReactSVG } from 'react-svg';
import {LevelStick} from '../LevelStick'
import jrSharksLogoWhiteBg from '@images/icons/jr-sharks-logo-white-bg.svg';
import { NextOpponent } from './NextOpponent';
import {PlayingGame} from './PlayingGame'
import {TeamWon} from './TeamWon'

export const SeasonTopRow = () => {
  return (
    <div className='season-dashboard-top-row'>
      <div style={{ paddingTop: '1rem' }}>
        <LevelStick type='teamRank' />
      </div>
      <div>
        <div className='teams-jumbotron'>
          <div className='season-team-left-border'></div>
          <div className='season-teams-playing-box'>
            <TeamWon/>
          </div>
          <div className='season-team-right-border'></div>
        </div>
        <div className='ready-to-play-sign'>
          Your team is ready to play.
        </div>
      </div>
      <div style={{ paddingTop: '1rem' }}>
        <LevelStick type="opponentTeamRank"/>
      </div>
    </div>
  )
}
