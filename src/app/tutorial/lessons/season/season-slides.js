import Slide from '../../Slide';
import { SET_ANIMATION_STATE } from '@redux/actions';

const slideConfigs = [
  {
    message: 'Welcome to the Season page!',
    sharkie: 'speak',
    hasButtons: true,
    accentText: 'Season',
  },
  {
    message:
      'During the season, your team will play against 12 other teams for trophies.',
    sharkie: 'speak',
    hasButtons: true,
  },
  {
    message:
      'The team with the most points at the end of the season wins 1st place.',
    sharkie: 'speak',
    hasButtons: true,
  },
  {
    message: 'If your team wins a game, your team earns 2 points.',
    sharkie: 'speak',
    hasButtons: true,
  },
  {
    message:
      'If your team loses a game, you earn 0 points, unless they lose in overtime. Then you earn 1 point.',
    sharkie: 'speak',
    hasButtons: true,
    exitActions: [
      {
        type: SET_ANIMATION_STATE,
        payload: {
          page: 'season',
          animationStates: [
            {
              component: 'stats',
              state: {
                borderColor: '#ffd782',
                backgroundColor: 'rgba(112, 112, 112, 0.9)',
                scale: 1.5,
                zIndex: 10,
              },
            },
          ],
        },
      },
    ],
  },
  {
    message:
      "You can see your team's wins, losses and points here on the jumbotron.",
    sharkie: 'present',
    hasButtons: true,
    small: true,
    slideAnimate: {
      y: '80%',
      x: '63%',
    },
    transparentBg: true,
    exitActions: [
      {
        type: SET_ANIMATION_STATE,
        payload: {
          page: 'season',
          animationStates: [
            {
              component: 'stats',
              state: {
                borderColor: 'rgba(0,0,0,0)',
                backgroundColor: 'rgba(0,0,0,0)',
                scale: 1,
                zIndex: 0,
                transition: {
                  default: {
                    duration: 1,
                  },
                  zIndex: {
                    delay: 1,
                  },
                },
              },
            },
            {
              component: 'standings',
              state: {
                borderColor: '#ffd782',
                scale: 1.1,
              },
            },
          ],
        },
      },
    ],
  },
  {
    message: "The standings box shows your team's standing in the season.",
    sharkie: 'lean',
    hasButtons: true,
    small: true,
    transparentBg: true,
    slideAnimate: {
      y: '90%',
      x: '-63%',
    },
  },

  {
    message: 'This is decided by how many points your team has earned.',
    sharkie: 'lean',
    hasButtons: true,
    timer: 0,
    small: true,
    slideAnimate: {
      y: '90%',
      x: '-63%',
    },
    transparentBg: true,
    exitActions: [
      {
        type: SET_ANIMATION_STATE,
        payload: {
          page: 'season',
          animationStates: [
            {
              component: 'standings',
              state: {
                borderColor: '#707070',
                scale: 1,
              },
            },
            {
              component: 'upcomingGames',
              state: {
                borderColor: '#ffd782',
                scale: 1.1,
                zIndex: 10,
              },
            },
          ],
        },
      },
    ],
  },
  {
    message:
      "You can see the teams you'll be playing against here, along with their team ranks.",
    sharkie: 'lean',
    hasButtons: true,
    small: true,
    transparentBg: true,
    slideAnimate: {
      y: '90%',
      x: '-63%',
    },
    exitActions: [
      {
        type: SET_ANIMATION_STATE,
        payload: {
          page: 'season',
          animationStates: [
            {
              component: 'upcomingGames',
              state: {
                borderColor: 'rgba(0,0,0,0)',
                scale: 1,
                zIndex: 0,
                transition: {
                  default: {
                    duration: 1,
                  },
                  zIndex: {
                    delay: 1,
                  },
                },
              },
            },
            {
              component: 'jumbotext',
              state: {
                borderColor: '#ffd782',
                scale: 1.1,
              },
            },
            {
              component: 'playButton',
              state: {
                scale: 1.2,
              },
            },
          ],
        },
      },
    ],
  },
  {
    message:
      'When you press play, the jumbotron will tell you the score of the game and how many points your team earned.',
    sharkie: 'lean',
    hasButtons: true,
    small: true,
    transparentBg: true,
    slideAnimate: {
      y: '-25%',
      x: '-50%',
    },
  },
  {
    message: 'Your team will play against 12 other teams in a season.',
    sharkie: 'lean',
    hasButtons: true,
    small: true,
    transparentBg: true,
    slideAnimate: {
      y: '-25%',
      x: '-50%',
    },
    exitActions: [
      {
        type: SET_ANIMATION_STATE,
        payload: {
          page: 'season',
          animationStates: [
            {
              component: 'upcomingGames',
              state: {
                borderColor: '#ffd782',
                scale: 1.1,
              },
            },
            {
              component: 'studentRank',
              state: {
                scale: 1.1,
                color: '#ffd782',
              },
            },
            {
              component: 'jumbotext',
              state: {
                borderColor: 'rgba(0,0,0,0)',
                scale: 1,
              },
            },
            {
              component: 'playButton',
              state: {
                scale: 1,
              },
            },
          ],
        },
      },
    ],
  },
  {
    message:
      'Your team has to have a higher score than the team they are playing to win a game.',
    sharkie: 'speak',
    hasButtons: true,
    timer: 0,
    small: true,
    transparentBg: true,
    slideAnimate: {
      y: '90%',
      x: '63%',
    },
    exitActions: [
      {
        type: SET_ANIMATION_STATE,
        payload: {
          page: 'season',
          animationStates: [
            {
              component: 'upcomingGames',
              state: {
                borderColor: 'rgba(0,0,0,0)',
                scale: 1,
              },
            },
            {
              component: 'studentRank',
              state: {
                borderColor: 'rgba(0,0,0,0)',
                borderWidth: '0px',
                borderStyle: 'solid',
                borderRadius: '10px',
                color: '#ffffff',
                scale: 1,
              },
            },
          ],
        },
      },
    ],
  },
  {
    message:
      'If your team is in first place at the end of the season you will earn a first place trophy.',
    sharkie: 'speak',
    hasButtons: true,
    slideAnimate: {
      y: '0%',
      x: '0%',
    },
  },
  {
    message:
      'You can also earn trophies for finishing in the top 3 and having savings leftover at the end of the season.',
    sharkie: 'speak',
    hasButtons: true,
  },
  {
    message:
      'You can see all of the trophies you earned on the trophy page, after the season is over.',
    sharkie: 'speak',
    hasButtons: true,
  },
  {
    message:
      'If you finish in the top 3 and having savings left over at the end of the season, you will be promoted to become the general manager of the San Jose Barracuda!',
    sharkie: 'speak',
    hasButtons: true,
    accentText: 'San Jose Barracuda',
  },
  {
    message: 'Just click the accept promotion button on the trophy page.',
    sharkie: 'speak',
    hasButtons: true,
  },
  {
    message: 'Make sure you have savings in case your team loses players.',
    sharkie: 'speak',
    hasButtons: true,
  },
  {
    message:
      "Remember the savings that you don't use carry over to the next season.",
    sharkie: 'speak',
    hasButtons: true,
  },
  {
    message:
      'So you should have enough savings for emergencies and a little left over at the end of every season.',
    sharkie: 'speak',
    hasButtons: true,
  },
  {
    message:
      'You should save money after every season so you can sign the best players and still have money in case of emergencies.',
    sharkie: 'speak',
    hasButtons: true,
  },
  {
    message:
      'If you need more information about the season, click on the ask S.J. Sharkie button and choose the question you are looking for.',
    sharkie: 'speak',
    hasButtons: true,
  },
  {
    message:
      'If you need to go back to the home page, click on the orange hockey stick that says Season.',
    sharkie: 'speak',
    hasButtons: true,
    accentText: 'Season',
  },
  {
    message: 'Good luck and we believe in you!',
    sharkie: 'play',
    hasButtons: true,
  },
];

export const seasonSlides = slideConfigs.map((c) => new Slide(c));
