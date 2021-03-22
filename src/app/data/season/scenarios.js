import { INJURE_PLAYER } from '@redux/actions';
import { PlayerAssignments, TeamAssignments } from '@data/players/players';

export class SeasonScenario {
  constructor(config, team) {
    this.message = config.message;
    this.objective = config.objective;
    this.action = config.action;
    this.playerAssignment = config.playerAssignment;
    this.player = config.player;
    this.gameButtonLabel = config.gameButtonLabel;
    this.gameButtonAction = config.gameButtonAction;

    this.setPlayer(config.selectPlayer(team));
  }

  setPlayer(player) {
    this.playerPrevAssignment = player.playerAssignment;
    player.playerAssignment = this.playerAssignment;
    this.player = player;
  }

  getPlayer() {
    return this.player;
  }

  getPlayerPrevAssignment() {
    return this.playerPrevAssignment;
  }
}

const getSecondHighestPlayer = (team) => {
  return Object.keys(team)
    .filter((p) => !TeamAssignments.bench.includes(p))
    .map((p) => team[p])
    .sort((a, b) => +b.overallRank - +a.overallRank)[1];
};

const getStartingPlayer = (team) => {
  const props = [
    PlayerAssignments.F_ONE,
    PlayerAssignments.F_TWO,
    PlayerAssignments.F_THREE,
    PlayerAssignments.G_ONE,
    PlayerAssignments.D_ONE,
    PlayerAssignments.D_TWO,
  ];
  const i = Math.floor(Math.random() * props.length);
  return team[props[i]];
};

export const scenarioConfigs = {
  1: [
    {
      message: 'OH NO! One of your players was injured',
      objective: 'Replace the injured player',
      action: INJURE_PLAYER,
      selectPlayer: getSecondHighestPlayer,
      playerAssignment: PlayerAssignments.UNAVAILABLE,
      player: null,
      gameButtonLabel: 'Click the puck to sign a new player!',
      gameButtonAction: (team, history) => history.push('/team'),
    },
    {
      message: 'OH NO! One of your players was injured',
      objective: 'Replace the injured player',
      action: INJURE_PLAYER,
      selectPlayer: getStartingPlayer,
      playerAssignment: PlayerAssignments.UNAVAILABLE,
      player: null,
      gameButtonLabel: 'Click the puck to sign a new player!',
      gameButtonAction: (team, history) => history.push('/team'),
    },
  ],
  2: [
    {
      message: 'OH NO! One of your players was injured',
      objective: 'Replace the injured player',
      action: INJURE_PLAYER,
      selectPlayer: getSecondHighestPlayer,
      playerAssignment: PlayerAssignments.UNAVAILABLE,
      player: null,
      gameButtonLabel: 'Click the puck to sign a new player!',
      gameButtonAction: (team, history) => history.push('/team'),
    },
    {
      message: 'OH NO! One of your players was injured',
      objective: 'Replace the injured player',
      action: INJURE_PLAYER,
      selectPlayer: getStartingPlayer,
      playerAssignment: PlayerAssignments.UNAVAILABLE,
      player: null,
      gameButtonLabel: 'Click the puck to sign a new player!',
      gameButtonAction: (team, history) => history.push('/team'),
    },
  ],
  3: [
    {
      message: 'OH NO! One of your players was injured',
      objective: 'Replace the injured player',
      action: INJURE_PLAYER,
      selectPlayer: getSecondHighestPlayer,
      playerAssignment: PlayerAssignments.UNAVAILABLE,
      player: null,
      gameButtonLabel: 'Click the puck to sign a new player!',
      gameButtonAction: (team, history) => history.push('/team'),
    },
    {
      message: 'OH NO! One of your players was injured',
      objective: 'Replace the injured player',
      action: INJURE_PLAYER,
      selectPlayer: getStartingPlayer,
      playerAssignment: PlayerAssignments.UNAVAILABLE,
      player: null,
      gameButtonLabel: 'Click the puck to sign a new player!',
      gameButtonAction: (team, history) => history.push('/team'),
    },
  ],
};
