import Slide from '../../Slide';
import { SET_ANIMATION_STATE } from '@redux/actions';

const slideConfigs = [
  {
    message:
      'Nice job! Now that your team is ready you can begin playing the season',
    sharkie: 'speak',
    hasButtons: true,
    timer: 0,
    transparentBg: false,
  },
  {
    message:
      'In the season, your team will play against other teams for trophies!',
    sharkie: 'speak',
    hasButtons: true,
    timer: 0,

    transparentBg: false,
  },
  {
    message:
      'In a hockey season, the winning team is the one with the most points',
    sharkie: 'speak',
    hasButtons: true,
    timer: 0,

    transparentBg: false,
  },
  {
    message: 'If your team wins in regular time, they earn two points',
    sharkie: 'speak',
    hasButtons: true,
    timer: 0,

    transparentBg: false,
  },
  {
    message:
      'If the game is close, it can go to overtime and your team earns one point ',
    sharkie: 'speak',
    hasButtons: true,
    timer: 0,

    transparentBg: false,
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
                borderWidth: '8px',
                scale: 1.5,
                color: '#ffd782',
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
      "You can see your team's wins, losses and points here on the jumbotron!",
    sharkie: 'present',
    hasButtons: true,
    small: true,
    timer: 0,
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
                borderWidth: '8px',
                borderStyle: 'solid',
                borderRadius: '10px',
                color: '#ffffff',
                scale: 1,
              },
            },
            {
              component: 'standings',
              state: {
                borderColor: '#ffd782',
                borderWidth: '8px',
                scale: 1.1,
                color: '#ffd782',
              },
            },
          ],
        },
      },
    ],
  },
  {
    message: "The standings box shows your team's place in the season",
    sharkie: 'presentInverse',
    hasButtons: true,
    small: true,
    timer: 0,
    transparentBg: true,
    slideAnimate: {
      y: '90%',
      x: '-63%',
    },
  },

  {
    message: 'This is decided by how many points your team has',
    sharkie: 'speakInverse',
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
                borderColor: 'rgba(0,0,0,0)',
                borderWidth: '0px',
                borderStyle: 'solid',
                borderRadius: '10px',
                color: '#ffffff',
                scale: 1,
              },
            },
            {
              component: 'upcomingGames',
              state: {
                borderColor: '#ffd782',
                scale: 1.1,
                color: '#ffd782',
                borderWidth: '8px',
              },
            },
          ],
        },
      },
    ],
  },
  {
    message:
      "You can see the teams you'll be playing against here, along with their team ranks",
    sharkie: 'speakInverse',
    hasButtons: true,
    timer: 0,
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
                borderWidth: '0px',
                borderStyle: 'solid',
                borderRadius: '10px',
                color: '#ffffff',
                scale: 1,
              },
            },
            {
              component: 'jumbotext',
              state: {
                borderColor: '#ffd782',
                scale: 1.1,
                color: '#ffd782',
                borderWidth: '8px',
              },
            },
            {
              component: 'playButton',
              state: {
                borderColor: '#ffd782',
                scale: 1.2,
                borderWidth: '8px',
                borderRadius: '60px',
                color: '#ffd782',
              },
            },
          ],
        },
      },
    ],
  },
  {
    message:
      'When you press play, the jumbotron will tell you the result of your games',
    sharkie: 'speakInverse',
    hasButtons: true,
    timer: 0,
    small: true,
    transparentBg: true,
    slideAnimate: {
      y: '-25%',
      x: '-50%',
    },
  },
  {
    message: 'Your team will be playing against 12 other teams',
    sharkie: 'speakInverse',
    hasButtons: true,
    timer: 0,
    small: true,
    transparentBg: true,
    slideAnimate: {
      y: '-25%',
      x: '-50%',
    },
  },
  {
    message: 'To get the most points and win the trophy...',
    sharkie: 'speakInverse',
    hasButtons: true,
    timer: 0,
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
                color: '#ffd782',
                borderWidth: '8px',
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
                borderWidth: '0px',
                borderStyle: 'solid',
                borderRadius: '10px',
                color: '#ffffff',
                scale: 1,
              },
            },
            {
              component: 'playButton',
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
      "Try to make sure your rank is as high as the teams you'll be playing against",
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
                borderWidth: '0px',
                borderStyle: 'solid',
                borderRadius: '10px',
                color: '#ffffff',
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
      "Don't forget to save money for emergencies, in case you lose a player",
    sharkie: 'speakInverse',
    hasButtons: true,
    timer: 0,
    slideAnimate: {
      y: '25%',
      x: '0',
    },
    transparentBg: false,
  },
  {
    message: 'Being in first place is not everything',
    sharkie: 'speakInverse',
    hasButtons: true,
    timer: 0,
    transparentBg: false,
  },
  {
    message: 'If you finish in the top 3, you can get a trophy',
    sharkie: 'speakInverse',
    hasButtons: true,
    timer: 0,
    transparentBg: false,
  },
  {
    message:
      'You can also earn a trophy for having savings left over at the end of the season',
    sharkie: 'speakInverse',
    hasButtons: true,

    timer: 0,

    transparentBg: false,
  },
  {
    message: 'Got it?',
    sharkie: 'speakInverse',
    hasButtons: true,

    timer: 0,

    transparentBg: false,
  },
  {
    message: 'Cool!',
    sharkie: 'speakInverse',
    hasButtons: true,

    timer: 0,

    transparentBg: false,
  },
  {
    message: 'Good luck! We believe in you!',
    sharkie: 'speakInverse',
    hasButtons: true,
    timer: 0,
    transparentBg: false,
  },
];

export const seasonSlides = slideConfigs.map((c) => new Slide(c));
