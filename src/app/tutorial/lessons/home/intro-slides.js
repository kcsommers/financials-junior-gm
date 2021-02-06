import Slide from '../../Slide';
import { SET_ANIMATION_STATE } from '@redux/actionTypes';

const slideConfigs = [
  {
    message: 'Hello there!',
    sharkie: 'play',
    bubbleDelay: 1000,
    timer: Slide.SLIDE_DURATION + 1000,
  },
  {
    message: 'Are you here to deliver my fish?',
    sharkie: 'play',
    hasButtons: false,
    timer: Slide.SLIDE_DURATION,
  },
  {
    message: 'No?',
    sharkie: 'play',
    hasButtons: false,
    timer: Slide.SLIDE_DURATION,
  },
  {
    message: "Wait, aren't you the new Junior Manager of the San Jose Sharks?",
    accentText: 'Junior Mananger',
    sharkie: 'speak',
    hasButtons: true,
    timer: 0,
  },
  {
    message: 'Welcome to our stadium!',
    sharkie: 'speak',
    hasButtons: false,
    timer: Slide.SLIDE_DURATION,
  },
  {
    message: "My name is Sharkie, I'm here to teach about your new job!",
    sharkie: 'speak',
    hasButtons: false,
    timer: Slide.SLIDE_DURATION,
  },
  {
    message: 'Ready?',
    sharkie: 'speak',
    hasButtons: true,
    timer: 0,
  },
  {
    message: 'Our junior team really needs your help to win the next season!',
    sharkie: 'speak',
    hasButtons: false,
    timer: Slide.SLIDE_DURATION,
  },
  {
    message:
      'As you must know, everyone had to stay at home last year to be safe.',
    sharkie: 'speak',
    hasButtons: false,
    timer: Slide.SLIDE_DURATION,
  },
  {
    message:
      'Our fans could not come to the stadium to see the junior team play.',
    sharkie: 'speak',
    hasButtons: false,
    timer: Slide.SLIDE_DURATION,
  },
  {
    message:
      "This meant that the team did not get money because we couldn't sell tickets.",
    sharkie: 'speak',
    hasButtons: false,
    timer: Slide.SLIDE_DURATION,
  },
  {
    message: 'Now the junior team is not ready for the next season.',
    sharkie: 'speak',
    hasButtons: false,
    timer: Slide.SLIDE_DURATION,
  },
  {
    message: "But that's where you can help!",
    sharkie: 'speak',
    hasButtons: false,
    timer: Slide.SLIDE_DURATION,
  },
  {
    message:
      'We need someone smart like you to get the team ready for the next season!',
    sharkie: 'speak',
    hasButtons: false,
    timer: Slide.SLIDE_DURATION,
  },
  {
    message: 'Let me show you around so that you can get started!',
    sharkie: 'speak',
    hasButtons: false,
    timer: Slide.SLIDE_DURATION,
  },
  {
    message: 'Ready?',
    sharkie: 'speak',
    hasButtons: true,
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
                scale: 1.5,
                zIndex: 1,
                y: '15%',
                opacity: 1,
                transition: { duration: 1 },
              },
            },
          ],
        },
      },
    ],
  },
];

export const introSlides = slideConfigs.map((c) => new Slide(c));
