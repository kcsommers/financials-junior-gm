import Slide from '../../Slide';
import { SET_ANIMATION_STATE, TOGGLE_OVERLAY } from '@redux/actionTypes';
import { PlayerCard } from '@components';

const slideConfigs = [
  {
    message: 'Okay for your final objective, you will Scout new players!',
    sharkie: 'play',
    accentText: 'Scout',
    timer: Slide.SLIDE_DURATION,
  },
  {
    message: 'But what does Scouting mean?',
    sharkie: 'speak',
    accentText: 'Scouting',
    timer: Slide.SLIDE_DURATION,
  },
  {
    message:
      'Scouting is when a manager studies new players to see how well they play!',
    sharkie: 'speak',
    accentText: 'Scouting',
    timer: Slide.SLIDE_DURATION,
  },
  {
    message:
      'Then the manager can decide which players they want to sign to their team!',
    sharkie: 'speak',
    timer: Slide.SLIDE_DURATION,
  },
  {
    message: 'To sign them the manager has to offer them money.',
    sharkie: 'speak',
    timer: Slide.SLIDE_DURATION,
  },
  {
    message:
      'If a manager really likes a player, they can offer them more money to sign them!',
    sharkie: 'speak',
    timer: Slide.SLIDE_DURATION,
  },
  {
    message:
      'But if a manager does not offer them enough money, then the player can say no.',
    sharkie: 'speak',
    timer: Slide.SLIDE_DURATION,
  },
  {
    message:
      'So when Scouting, a manager has to be careful in deciding which players they like...',
    sharkie: 'speak',
    accentText: 'Scouting',
    timer: Slide.SLIDE_DURATION,
  },
  {
    message: 'And how much money to give them to join their team!',
    sharkie: 'speak',
    accentText: 'Scouting',
    timer: Slide.SLIDE_DURATION,
  },
  {
    message: 'Do you understand what Scouting is?',
    sharkie: 'speak',
    accentText: 'Scouting',
    timer: 0,
    hasButtons: true,
    repeatIndex: 0,
  },
  {
    message: 'Cool! Let me show you how its done!',
    sharkie: 'speak',
    timer: Slide.SLIDE_DURATION,
    exitActions: [
      {
        type: SET_ANIMATION_STATE,
        payload: {
          page: 'scout',
          animationStates: [
            {
              component: 'newPlayersBoard',
              state: {
                opacity: [0, 1],
                scale: [1, 1.1],
              },
            },
          ],
        },
      },
    ],
  },
  {
    message: "They don't have a contract value yet!",
    sharkie: 'speak',
    timer: Slide.SLIDE_DURATION,
  },
  {
    message:
      'You have to decide how much money you want to offer them in their contract.',
    sharkie: 'speak',
    timer: Slide.SLIDE_DURATION,
  },
];

export const scoutSlides = slideConfigs.map((c) => new Slide(c));
