import { StudentTeam } from '../../game/teams/student-team.type';
import { OpposingTeam } from '../teams/opposing-team.type';

export type GameResult = {
  opposingTeam: OpposingTeam;
  studentWin: boolean;
  studentPoints: number;
  score: [number, number];
};

export const possibleScores: [number, number][][] = [
  [
    [5, 0],
    [5, 1],
    [5, 2],
    [5, 3],
    [4, 0],
    [4, 1],
    [4, 2],
    [3, 0],
    [3, 1],
    [6, 2],
    [6, 3],
    [6, 4],
    [7, 2],
    [7, 3],
    [7, 4],
  ],
  [
    [1, 0],
    [2, 1],
    [3, 0],
    [3, 1],
    [4, 0],
    [4, 1],
    [4, 2],
    [5, 0],
    [5, 1],
    [5, 2],
    [5, 3],
    [6, 1],
    [6, 2],
    [6, 3],
    [6, 4],
    [7, 3],
    [7, 4],
    [7, 5],
  ],
  [
    [1, 0],
    [2, 0],
    [2, 1],
    [3, 0],
    [3, 1],
    [3, 2],
    [4, 0],
    [4, 1],
    [4, 2],
    [4, 3],
    [5, 1],
    [5, 2],
    [5, 3],
    [5, 4],
    [6, 2],
    [6, 3],
    [6, 4],
    [6, 5],
    [7, 3],
    [7, 4],
    [7, 5],
  ],
  [
    [1, 0],
    [2, 1],
    [3, 2],
    [4, 3],
    [5, 4],
  ],
];

export const getGameResult = (
  studentTeam: StudentTeam,
  opposingTeam: OpposingTeam
): GameResult => {
  const rankDiff = Math.abs(studentTeam.stats.rank - opposingTeam.stats.rank);

  let scoresIndex: number;
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

  let studentWin: boolean;
  let studentPoints: number;
  let oppScore: number;
  let studentScore: number;
  if (studentTeam.stats.rank >= opposingTeam.stats.rank) {
    studentWin = true;
    studentPoints = 2;
    oppScore = Math.min(score[0], score[1]);
    studentScore = Math.max(score[0], score[1]);
  } else {
    studentWin = false;
    studentPoints = scoresIndex === 3 ? 1 : 0;
    oppScore = Math.max(score[0], score[1]);
    studentScore = Math.min(score[0], score[1]);
  }
  score[0] = studentScore;
  score[1] = oppScore;
  return {
    opposingTeam,
    studentWin,
    studentPoints,
    score,
  };
};
