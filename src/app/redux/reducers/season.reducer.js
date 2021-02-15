import {
  SET_SCORE, 
  SET_RANK,
  SET_IMAGE,
  SET_NAME,
  SET_STATS,
  SET_STANDINGS,
  SET_NEXT_OPPONENT,
  SET_UPCOMING_GAMES,
  SET_JUMBOTRON_DISPLAY,
  SET_SEASON_SIGN,
  SET_SIMULATION_BUTTON,
  SET_SIMULATE_GAME
} from '../actionTypes'
import blueBears from '../../../assets/images/icons/blue-bears-logo.svg'
import jrSharksLogoWhiteBg from '@images/icons/jr-sharks-logo-white-bg.svg';
import redRabbits from '@images/icons/red-rabbits.svg';
import purplePanthers from '@images/icons/purple-panthers.svg';
import whiteWolves from '@images/icons/white-wolves.svg';
import {InitialJumbotronState} from '../../components/season-page/InitialJumbotronState';
import play from '@images/icons/play.svg';

const initialState = {
  score: [0,0],
  rank: 320,
  image: jrSharksLogoWhiteBg,
  name: 'Jr Sharks',
  stats: {
    wins: 0,
    losses: 0,
    points: 0
  },
  standings: '13th',
  nextOpponent: {
    rank: 270,
    image: blueBears,
    name: 'Blue Bears',
    stats: {wins: 0, losses: 0, points: 0},
    standings: '12th'
  },
  upcomingGames: [
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
  jumbotronDisplay: <InitialJumbotronState/>,
  seasonSign: 'Your team is ready to play.',
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
        wins: action.payload,
        losses: action.payload,
        points: action.payload
      }
    case SET_STANDINGS:
      return {
        ...state,
        standings: action.payload
      }
    case SET_NEXT_OPPONENT:
      return {
        ...state,
        nextOpponent: action.payload
      }
    case SET_UPCOMING_GAMES:
      return {
        ...state,
        upcomingGames: action.payload
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
    default: 
      return state;
  }
}