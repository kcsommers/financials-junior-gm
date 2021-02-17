import {
  SET_SCORE, 
  SET_RANK,
  SET_IMAGE,
  SET_NAME,
  SET_STATS,
  SET_STANDINGS,
  UPDATE_CURRENT_OPPONENT,
  SET_TEAMS,
  SET_JUMBOTRON_DISPLAY,
  SET_SEASON_SIGN,
  SET_SIMULATION_BUTTON,
  SET_SIMULATE_GAME,
  UPDATE_OPPONENT_INDEX,
  SET_STUDENT
  UPDATE_TEAMS,
  UPDATE_SEASON_STATE
} from '../actionTypes'
import blueBears from '../../../assets/images/icons/blue-bears-logo.svg'
import jrSharksLogoWhiteBg from '@images/icons/jr-sharks-logo-white-bg.svg';
import redRabbits from '@images/icons/red-rabbits.svg';
import purplePanthers from '@images/icons/purple-panthers.svg';
import whiteWolves from '@images/icons/white-wolves.svg';
import {InitialJumbotronState} from '../../components/season-page/InitialJumbotronState';
import play from '@images/icons/play.svg';
import jrSharksLogo from '@images/icons/jr-sharks-logo.svg';
import { useDispatch} from 'react-redux';
import {setStudent} from '@redux/actions';
import { bindActionCreators } from '@reduxjs/toolkit';
import {cloneDeep} from 'lodash';

const initialState = {
  score: [0,0],
  gamesPlayed: [],
  blocks: [
    [
      {
        rank: 325,
        image: whiteWolves,
        name: 'Green Giraffes',
        stats: {wins: 0, losses: 0, points: 0},
        standings: '6th'
      },
      {
        rank: 325,
        image: whiteWolves,
        name: 'Pink Pandas',
        stats: {wins: 0, losses: 0, points: 0},
        standings: '6th'
      },
      {
        rank: 325,
        image: whiteWolves,
        name: 'Orange Owls',
        stats: {wins: 0, losses: 0, points: 0},
        standings: '6th'
      },
      {
        rank: 325,
        image: whiteWolves,
        name: 'Silver Spiders',
        stats: {wins: 0, losses: 0, points: 0},
        standings: '6th'
      },
    ],
    [
      {
        rank: 325,
        image: whiteWolves,
        name: 'Golden Geckos',
        stats: {wins: 0, losses: 0, points: 0},
        standings: '6th'
      },
      {
        rank: 325,
        image: whiteWolves,
        name: 'Yellow Yaks',
        stats: {wins: 0, losses: 0, points: 0},
        standings: '6th'
      },
      {
        rank: 325,
        image: whiteWolves,
        name: 'Black Beavers',
        stats: {wins: 0, losses: 0, points: 0},
        standings: '6th'
      },
      {
        rank: 325,
        image: whiteWolves,
        name: 'Gray Grasshoppers',
        stats: {wins: 0, losses: 0, points: 0},
        standings: '6th'
      }
    ]
  ],
  teams: [
    {
      rank: 270,
      image: blueBears,
      name: 'Blue Bears',
      stats: {wins: 0, losses: 0, points: 0},
      standings: '12th'
    },
    { 
      rank: 280,
      image: redRabbits,
      name: 'Red Rabbits',
      stats: {wins: 0, losses: 0, points: 0},
      standings: '12th'
    },
    {
      rank: 300,
      image: purplePanthers,
      name: 'Purple Panthers',
      stats: {wins: 0, losses: 0, points: 0},
      standings: '10th'
    },
    {
      rank: 325,
      image: whiteWolves,
      name: 'White Wolves',
      stats: {wins: 0, losses: 0, points: 0},
      standings: '6th'
    }
  ],
  image: jrSharksLogoWhiteBg,
  name: 'Jr Sharks',
  wins: 0,
  losses: 0,
  points: 0,
  standings: '13th',
  //currentOpponent: {
    //rank: 270,
    //image: blueBears,
    //name: 'Blue Bears',
    //stats: {wins: 0, losses: 0, points: 0},
    //standings: '12th'
  //},
  blockIndex: 0,
  currentOpponentIndex: 0,
  //jumbotronDisplay: <InitialJumbotronState seasonState={initialState}/>,
  seasonSign: 'Click play to see your results',
  simulationButton: play,
  simulateGame: null
}
export default function(state = initialState, action) {
  switch(action.type) {
    case SET_SCORE:
      return {
        ...state,
        score: action.payload
      }
    case SET_RANK:
      return {
        ...state,
        rank: action.payload
      }
    case SET_IMAGE:
      return {
        ...state,
        image: action.payload
      }
    case SET_NAME:
      return {
        ...state,
        name: action.payload
      }
    case SET_STATS:
      return {
        ...state,
        wins: action.payload.wins,
        losses: action.payload.losses,
        points: action.payload.points
      }
    case UPDATE_OPPONENT_INDEX:
      return {
        ...state,
        currentOpponentIndex: action.payload
      } 
    case SET_STANDINGS:
      return {
        ...state,
        standings: action.payload
      }
    case UPDATE_OPPONENT_INDEX:
      return {
        ...state,
        currentOpponentIndex: action.payload
      }
    case UPDATE_CURRENT_OPPONENT:
      return {
        ...state,
        currentOpponent: action.payload
      }
    
    case SET_TEAMS:
      return {
        ...state,
        teams: action.payload
      }
    case UPDATE_TEAMS:
      return {
        ...state,
        teams: state.blocks[1]
      }
    case SET_JUMBOTRON_DISPLAY:
      return {
        ...state,
        jumbotronDisplay: action.payload
      }
    case SET_SEASON_SIGN:
      return {
        ...state,
        seasonSign: action.payload
      }
    case SET_SIMULATION_BUTTON:
      return {
        ...state,
        simulationButton: action.payload
      }
    case SET_SIMULATE_GAME:
      return {
        ...state,
        simulationGame: action.payload
      }
      case UPDATE_SEASON_STATE:
        const clonedState = cloneDeep(state)
      return {
        ...clonedState,
        ...action.payload
      }
    default: 
      return state;
  }
}