import {
  SET_SCORE, 
  SET_RANK,
  SET_IMAGE,
  SET_NAME,
  SET_STATS,
  SET_STANDINGS,
  SET_NEXT_OPPONENT,
  SET_UPCOMING_GAMES
} from '../actionTypes'
import blueBears from '../../../assets/images/icons/blue-bears-logo.svg'
import jrSharksLogoWhiteBg from '@images/icons/jr-sharks-logo-white-bg.svg';

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
  standings: 13,
  nextOpponent: {
    rank: 270,
    image: blueBears,
    name: 'Blue Bears',
    stats: {wins: 0, losses: 0, points: 0},
    standings: 12
  },
  upcomingGames: [
    {
      rank: 280,
      image: blueBears,
      name: 'Red Rabbits',
      stats: {wins: 0, losses: 0, points: 0},
      standings: 12
    },
    {
      rank: 300,
      image: blueBears,
      name: 'Purple Panthers',
      stats: {wins: 0, losses: 0, points: 0},
      standings: 10
    },
    {
      rank: 325,
      image: blueBears,
      name: 'White Wolves',
      stats: {wins: 0, losses: 0, points: 0},
      standings: 6
    }
  ]
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
    default: 
      return state;
  }
}