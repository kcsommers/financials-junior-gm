import { initPlayersByLevel, updateStudentById } from './../../api-helper';
import {
  possibleScores,
  levelOneOpponents,
  levelTwoOpponents,
  levelThreeOpponents,
  GamePhases,
  studentTeams,
} from './season';
import { cloneDeep } from 'lodash';
import { scenarioConfigs, SeasonScenario } from './scenarios';

export const resetSeason = (newLevel, prevLevel, student, wonGame) => {
  return new Promise((resolve, reject) => {
    const clonedSeasons = cloneDeep(student.seasons);
    clonedSeasons[newLevel - 1] = [];

    const studentUpdates = {
      seasons: clonedSeasons,
      level: newLevel,
      objectives: {},
      savingsBudget: 0,
      pagesVisited: [],
    };

    if (newLevel > prevLevel) {
      studentUpdates.rollOverBudget = 0;
    }

    if (wonGame) {
      studentUpdates.wonGame = true;
    }

    updateStudentById(student._id, studentUpdates)
      .then((res) => {
        if (!res.success || !res.updatedStudent) {
          console.error(new Error('Unexpected error updating student season'));
          return;
        }

        initPlayersByLevel(newLevel)
          .then((initializedStudentRes) => {
            const initializedStudent = initializedStudentRes.data;
            if (!initializedStudentRes.success || !initializedStudent) {
              console.error(new Error('Unexpected error initializing players'));
              return;
            }

            resolve(initializedStudent);
          })
          .catch((err) => reject(err));
      })
      .catch((err) => reject(err));
  });
};

export const getGameResult = (studentTeamRank, opponent) => {
  const rankDiff = Math.abs(studentTeamRank - opponent.teamRank);

  let scoresIndex;
  if (rankDiff > 50) {
    scoresIndex = 0;
  } else if (rankDiff > 20 && rankDiff <= 50) {
    scoresIndex = 1;
  } else if (rankDiff > 5 && rankDiff <= 20) {
    scoresIndex = 2;
  } else {
    scoresIndex = 3;
  }

  const score =
    possibleScores[scoresIndex][
      Math.floor(Math.random() * possibleScores[scoresIndex].length)
    ];

  let messageIndex;
  let win;
  let points;
  if (studentTeamRank >= opponent.teamRank) {
    win = true;
    points = 2;
    messageIndex = scoresIndex === 3 ? 1 : 0;
  } else {
    win = false;
    points = scoresIndex === 3 ? 1 : 0;
    messageIndex = scoresIndex === 3 ? 2 : 3;
    const oppScore = score[0];
    const studentScore = score[1];
    score[0] = studentScore;
    score[1] = oppScore;
  }

  return {
    score,
    messageIndex,
    points,
    win,
    opponent: opponent.name,
  };
};

export const getGamePhases = (level) => [
  {
    phase: GamePhases.READY,
    messages: ['Your team is ready to play'],
  },
  {
    phase: GamePhases.UP_NEXT,
    messages: ['Coming up next', ''],
    messageTimer: 2000,
  },
  {
    phase: GamePhases.WARMING_UP,
    messages: ['The players are warming up'],
    timer: 5000,
  },
  {
    phase: GamePhases.GAME_ON,
    messages: ['The game is being played'],
    timer: 15000,
  },
  {
    phase: GamePhases.GAME_OVER,
    timer: 5000,
    messages: [
      `GET LOUD! The ${studentTeams[level - 1].name} Won!`,
      `CLOSE! The ${studentTeams[level - 1].name} won in overtime!`,
      `CLOSE! The ${studentTeams[level - 1].name} lost in overtime!`,
      `OH NO! The ${studentTeams[level - 1].name} lost :(`,
    ],
  },
];

export const getRandomTeamRank = (level) => {
  if (level === 1) {
    return Math.floor(Math.random() * (95 - 70) + 70);
  }

  if (level === 2) {
    return Math.floor(Math.random() * (295 - 240) + 240);
  }

  if (level === 3) {
    return Math.floor(Math.random() * (490 - 425) + 425);
  }
};

export const getRandomStat = (mult) => {
  return Math.floor(Math.random() * mult);
};

export const getStandings = (teams) => {
  return teams.sort((a, b) => b.stats.points - a.stats.points);
};

export const getStanding = (team, standings) => {
  if (!team) {
    return '';
  }

  const standing = (
    standings.findIndex((t) => t.name === team.name) + 1
  ).toString();
  if (standing.endsWith('1') && standing !== '11') {
    return `${standing}st`;
  }
  if (standing.endsWith('2') && standing !== '12') {
    return `${standing}nd`;
  }
  if (standing.endsWith('3') && standing !== '13') {
    return `${standing}rd`;
  }
  return `${standing}th`;
};

export const getAllOpponents = (level) => {
  let opponents = levelOneOpponents;
  if (level === 2) {
    opponents = levelTwoOpponents;
  } else if (level === 3) {
    opponents = levelThreeOpponents;
  }

  const clonedTeams = cloneDeep(opponents);
  return clonedTeams.map((t) => {
    t.teamRank = getRandomTeamRank(level);
    return t;
  });
};

export const getStudentTeam = (level) => {
  return studentTeams[level - 1];
};

export const getNewScenario = (level, index, team) => {
  const config = scenarioConfigs[level][index];
  return new SeasonScenario(config, team);
};
