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
    message: "Wait, aren't you the new General Manager of the San Jose Sharks?",
    accentText: 'General Manager',
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
    message: "My name is S.J Sharkie, I'm here to teach about your new job!",
    accentText: 'S.J Sharkie',
    sharkie: 'speak',
    hasButtons: false,
    timer: Slide.SLIDE_DURATION + 3000,
  },
  {
    message: 'Ready?',
    sharkie: 'speak',
    hasButtons: true,
    timer: 0,
  },
  {
    message: 'A General Manager is in charge of getting the team ready to play in the season!',
    accentText: 'General Manager',
    sharkie: 'speak',
    hasButtons: false,
    timer: Slide.SLIDE_DURATION + 5000,
  },
  {
    message:
      "Your job is to sign new players to the team and manage the team's money. ",
    sharkie: 'speak',
    hasButtons: false,
    timer: Slide.SLIDE_DURATION + 5000,
  },
  {
    message:
      'It is good to spend money on your team to make it stronger for the season!',
    sharkie: 'speak',
    hasButtons: false,
    timer: Slide.SLIDE_DURATION + 5000,
  },
  {
    message:
      'But you also have to be careful to save some money in case you have a rainy day!',
    sharkie: 'speak',
    hasButtons: false,
    timer: Slide.SLIDE_DURATION + 5000,
  },
  {
    message: 'Got it?',
    sharkie: 'speak',
    hasButtons: true,
    timer: 0,
  },
  {
    message: 'We are very excited to have someone smart like you for the job!',
    sharkie: 'speak',
    hasButtons: false,
    timer: Slide.SLIDE_DURATION + 5000,
  },
  {
    message: "We hope that you can build a great team!",
    sharkie: 'speak',
    hasButtons: false,
    timer: Slide.SLIDE_DURATION + 4000,
  },
  {
    message: 'Let me show you around so that you can get started!',
    sharkie: 'speak',
    hasButtons: false,
    timer: Slide.SLIDE_DURATION + 4000,
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
                y: '15%',
                opacity: 1,
                zIndex: 1001,
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
