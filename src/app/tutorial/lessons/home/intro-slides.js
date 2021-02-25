import Slide from '../../Slide';
import { SET_ANIMATION_STATE } from '@redux/actions';

const slideConfigs = [
  {
    message: 'Hello there!',
    sharkie: 'play',
    bubbleDelay: 1000,
    timer: 3000,
    hasButtons: false,
  },
  {
    message: 'Are you here to deliver my fish?',
    sharkie: 'play',
    hasButtons: true,
    timer: 0,
  },
  {
    message: 'No?',
    sharkie: 'play',
    hasButtons: true,
    timer: 0,
  },
  {
    message:
      "Wait, aren't you the new General Manager of the San Jose Jr. Sharks?",
    accentText: 'General Manager',
    sharkie: 'speak',
    hasButtons: true,
    timer: 0,
  },
  {
    message: 'Welcome to our stadium, the SAP Center!',
    sharkie: 'speak',
    hasButtons: true,
    timer: 0,
  },
  {
    message: "My name is S.J. Sharkie and I'm here to teach you about your new job!",
    accentText: 'S.J. Sharkie',
    sharkie: 'speak',
    hasButtons: true,
    timer: 0,
  },
  {
    message: 'Ready?',
    sharkie: 'speak',
    hasButtons: true,
    timer: 0,
  },
  {
    message:
      'A General Manager is in charge of getting the team prepared for the season!',
    accentText: 'General Manager',
    sharkie: 'speak',
    hasButtons: true,
    timer: 0,
  },
  {
    message: "Your job is to sign new players and manage the team's money",
    sharkie: 'speak',
    hasButtons: true,
    timer: 0,
  },
  {
    message:
      'You need to spend money on your team to make it the best it can be for the season!',
    sharkie: 'speak',
    hasButtons: true,
    timer: 0,
  },
  {
    message:
      'But you also have to be careful to save some money in case you have a rainy day!',
    sharkie: 'speak',
    hasButtons: true,
    timer: 0,
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
    hasButtons: true,
    timer: 0,
  },
  {
    message: 'We hope that you can build a great team!',
    sharkie: 'speak',
    hasButtons: true,
    timer: 0,
  },
  {
    message: 'Let me show you around so that you can get started!',
    sharkie: 'speak',
    hasButtons: true,
    timer: 0,
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
