import Slide from '../../Slide';
import { SET_ANIMATION_STATE } from '@redux/actions';

const teamStickSlideConfigs = [
  {
    message: 'Go here to manage your team and sign new players!',
    sharkie: 'present',
    hasButtons: false,
    slideAnimate: {
      y: '20%',
      x: '56%',
    },
    timer: 0,
    hasButtons: true,
    small: true,
    exitActions: [
      {
        type: SET_ANIMATION_STATE,
        payload: {
          page: 'home',
          animationStates: [
            {
              component: 'teamStick',
              state: {
                scale: 1,
                y: '0%',
                x: '0%',
                opacity: 0.6,
                transition: {
                  delay: 0,
                  duration: 1,
                },
              },
            },
            {
              component: 'budgetStick',
              state: {
                scale: [1, 1, 1, 1.2],
                y: ['-1200%', '0%', '0%', '-33%'],
                x: ['0%', '0%', '0%', '-5%'],
                times: [0, 0.5, 1.5, 2],
                opacity: 1,
                zIndex: 1002,
                transition: {
                  delay: 0.5,
                  duration: 2,
                },
              },
            },
          ],
        },
      },
    ],
  },
];

const budgetStickSlideConfigs = [
  {
    message: "Your team's money is also called a budget.",
    sharkie: 'speakInverse',
    hasButtons: false,
    slideAnimate: {
      y: '20%',
      x: '-56%',
    },
    timer: 0,
    hasButtons: true,
    bubbleDelay: 2000,
    small: true,
  },
  {
    message: 'Go here to manage your budget and learn more about it!',
    sharkie: 'presentInverse',
    hasButtons: false,
    slideAnimate: {
      y: '20%',
      x: '-56%',
    },
    timer: 0,
    bubbleDelay: 2000,
    hasButtons: true,
    small: true,
    exitActions: [
      {
        type: SET_ANIMATION_STATE,
        payload: {
          page: 'home',
          animationStates: [
            {
              component: 'budgetStick',
              state: {
                scale: 1,
                y: '0%',
                x: '0%',
                opacity: 0.6,
                transition: {
                  delay: 0,
                  duration: 1,
                },
              },
            },
            {
              component: 'trophiesStick',
              state: {
                scale: [1, 1, 1, 1.2],
                y: ['-1200%', '0%', '0%', '-40%'],
                x: ['0%', '0%', '0%', '-5%'],
                times: [0, 0.5, 1.5, 2],
                opacity: 1,
                zIndex: 1002,
                transition: {
                  delay: 0.5,
                  duration: 2,
                },
              },
            },
          ],
        },
      },
    ],
  },
];

const trophiesStickSlideConfigs = [
  {
    message: 'You can earn badges and trophies for managing your team!',
    sharkie: 'speakInverse',
    hasButtons: true,
    slideAnimate: {
      y: '50%',
      x: '-56%',
    },
    timer: 0,
    bubbleDelay: 2000,
    small: true,
  },
  {
    message: 'Go to the trophy room to learn more about them!',
    sharkie: 'presentInverse',
    hasButtons: true,
    slideAnimate: {
      y: '50%',
      x: '-56%',
    },
    timer: 0,
    small: true,
    exitActions: [
      {
        type: SET_ANIMATION_STATE,
        payload: {
          page: 'home',
          animationStates: [
            {
              component: 'trophiesStick',
              state: {
                scale: 1,
                y: '0%',
                x: '0%',
                opacity: 0.6,
                transition: {
                  delay: 0,
                  duration: 1,
                },
              },
            },
            {
              component: 'seasonStick',
              state: {
                scale: [1, 1, 1, 1.2],
                y: ['-1200%', '0%', '0%', '-40%'],
                x: ['0%', '0%', '0%', '5%'],
                times: [0, 0.5, 1.5, 2],
                opacity: 1,
                zIndex: 1002,
                transition: {
                  delay: 0.5,
                  duration: 2,
                },
              },
            },
          ],
        },
      },
    ],
  },
];

const seasonStickSlideConfigs = [
  {
    message:
      'You have to complete your objectives to get your team ready for the season.',
    sharkie: 'speak',
    hasButtons: true,
    slideAnimate: {
      y: '50%',
      x: '56%',
    },
    timer: 0,
    bubbleDelay: 2000,
    small: true,
  },
  {
    message:
      'When your team is ready, go here to see how well it does against other teams.',
    sharkie: 'speak',
    hasButtons: true,
    slideAnimate: {
      y: '50%',
      x: '56%',
    },
    timer: 0,
    small: true,
    exitActions: [
      {
        type: SET_ANIMATION_STATE,
        payload: {
          page: 'home',
          animationStates: [
            {
              component: 'seasonStick',
              state: {
                scale: 1,
                y: '0%',
                x: '0%',
                opacity: 0.6,
                transition: {
                  delay: 0,
                  duration: 1,
                },
              },
            },
          ],
        },
      },
    ],
  },
  {
    message: "Okay I'm starting to get really hungry...",
    sharkie: 'speak',
    hasButtons: true,
    slideAnimate: {
      y: '12%',
      x: '0%',
    },
    timer: 0,
  },
  {
    message: 'Do you know where to go to manage your team?',
    sharkie: 'speak',
    hasButtons: true,
    slideAnimate: {
      y: '12%',
      x: '0%',
    },
    timer: 0,
    repeatIndex: 0,
  },
  {
    message: 'Cool! I am going to go find some fish to eat',
    sharkie: 'speak',
    hasButtons: true,
    slideAnimate: {
      y: '12%',
      x: '0%',
    },
    timer: 0,
    exitActions: [
      {
        type: SET_ANIMATION_STATE,
        payload: {
          page: 'home',
          animationStates: [
            {
              component: 'objectivesBoard',
              state: {
                opacity: 1,
                transition: {
                  delay: 0,
                  duration: 1,
                },
              },
            },
          ],
        },
      },
    ],
  },
  {
    message: 'Follow the objectives to get your team ready!',
    sharkie: 'speak',
    hasButtons: true,
    slideAnimate: {
      y: '12%',
      x: '0%',
    },
    timer: 0,
  },
  {
    message: "I'll be around to help!",
    sharkie: 'speak',
    hasButtons: true,
    slideAnimate: {
      y: '12%',
      x: '0%',
    },
    exitActions: [
      {
        type: SET_ANIMATION_STATE,
        payload: {
          page: 'home',
          animationStates: [
            'objectivesBoard',
            'teamRank',
            'moneyLeft',
            'teamStick',
            'budgetStick',
            'seasonStick',
            'trophiesStick',
          ].map((c) => ({
            component: c,
            state: {
              opacity: 1,
            },
          })),
        },
      },
    ],
  },
];

export const teamStickSlides = teamStickSlideConfigs.map((c) => new Slide(c));
export const budgetStickSlides = budgetStickSlideConfigs.map(
  (c) => new Slide(c)
);
export const trophiesStickSlides = trophiesStickSlideConfigs.map(
  (c) => new Slide(c)
);
export const seasonStickSlides = seasonStickSlideConfigs.map(
  (c) => new Slide(c)
);
