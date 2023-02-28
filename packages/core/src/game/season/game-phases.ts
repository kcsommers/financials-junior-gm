import { isEmpty } from 'lodash';
import { OpposingTeam } from '../../game/teams/opposing-team.type';
import { StudentTeam } from '../../game/teams/student-team.type';
import { GameResult } from './game-result';

export enum GamePhases {
  READY = 'READY',
  UP_NEXT = 'UP_NEXT',
  WARMING_UP = 'WARMING_UP',
  GAME_ON = 'GAME_ON',
  GAME_OVER = 'GAME_OVER',
  GAME_HIGHLIGHT = 'GAME_HIGHLIGHT',
  SEASON_SCENARIO = 'SEASON_SCENARIO',
}

export type GamePhase = {
  name: GamePhases;
  messages: string[];
  timer?: number;
  messageTimer?: number;
};

const getGameOverMessage = (
  studentTeam: StudentTeam,
  gameResult: GameResult
): string => {
  if (!gameResult) {
    return '';
  }
  const scoreDiff = Math.abs(gameResult.score[0] - gameResult.score[1]);
  if (scoreDiff <= 1) {
    return gameResult.studentWin
      ? `CLOSE! The ${studentTeam.name} won in overtime!`
      : `CLOSE! The ${studentTeam.name} lost in overtime!`;
  }
  return gameResult.studentPoints
    ? `GET LOUD! The ${studentTeam.name} Won!`
    : `OH NO! The ${studentTeam.name} lost :(`;
};

export const getGamePhase = (
  phaseIndex: number,
  studentTeam: StudentTeam,
  opposingTeam: OpposingTeam,
  gameResult?: GameResult
): GamePhase => {
  const phases: GamePhase[] = [
    {
      name: GamePhases.READY,
      messages: ['Your team is ready to play'],
    },
    {
      name: GamePhases.UP_NEXT,
      messages: [
        'Coming up next',
        `${studentTeam.name} vs ${opposingTeam?.name}`,
      ],
      messageTimer: 500,
    },
    {
      name: GamePhases.WARMING_UP,
      messages: ['The players are warming up'],
      timer: 1000,
    },
    {
      name: GamePhases.GAME_ON,
      messages: ['1st Period', '2nd Period', '3rd Period'],
      messageTimer: 1000,
    },
  ];

  if (!isEmpty(opposingTeam?.videos?.gameHighlight)) {
    phases.push({
      name: GamePhases.GAME_HIGHLIGHT,
      messages: ['3rd Period'],
    });
  }
  phases.push({
    name: GamePhases.GAME_OVER,
    messages: [getGameOverMessage(studentTeam, gameResult)],
  });

  return phases[phaseIndex];
};
