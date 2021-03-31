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
    slideAnimate: {
      y: '0%',
      x: '0%',
    },
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
    previousActions: [
      {
        type: SET_ANIMATION_STATE,
        payload: {
          page: 'season',
          animationStates: [
            {
              component: 'stats',
              state: {
                borderColor: 'rgba(0, 0, 0, 0)',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                scale: 1,
                zIndex: 0,
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
              component: 'playButton',
              state: {
                scale: 1.2,
              },
            },
          ],
        },
      },
    ],
    previousActions: [
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
            {
              component: 'standings',
              state: {
                borderColor: '#707070',
                scale: 1,
              },
            },
          ],
        },
      },
    ],
  },
  {
    message: 'To start a game, press play.',
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
              component: 'playButton',
              state: {
                scale: 1,
              },
            },
          ],
        },
      },
    ],
    previousActions: [
      {
        type: SET_ANIMATION_STATE,
        payload: {
          page: 'season',
          animationStates: [
            {
              component: 'standings',
              state: {
                borderColor: '#ffd782',
                scale: 1.1,
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
      'At the end of the season, you can see all of the trophies you won on the trophy page.',
    sharkie: 'speak',
    hasButtons: true,
    slideAnimate: {
      y: '0%',
      x: '0%',
    },
    previousActions: [
      {
        type: SET_ANIMATION_STATE,
        payload: {
          page: 'season',
          animationStates: [
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
      'If you finish in the top 3 and have savings left at the end of the season, you will be promoted!',
    sharkie: 'speak',
    hasButtons: true,
  },
  {
    message:
      'If you need more information about the season, click on the ask S.J. Sharkie button.',
    sharkie: 'speak',
    hasButtons: true,
  },
];

export const seasonSlides = slideConfigs.map((c) => new Slide(c));
