import { cloneDeep } from 'lodash';
import { OpposingTeam } from '../../game/teams/opposing-team.type';
import { Student } from '../../student/student.interface';
import { StudentTeam } from '../teams/student-team.type';
import { getStudentTeam } from '../teams/utils/get-student-team';
import { getRandomStat, getRandomTeamRank } from './stats';

export const initializeTeams = (
  student: Student,
  studentTeams: StudentTeam[],
  opposingTeams: OpposingTeam[][]
): { levelOpposingTeams: OpposingTeam[]; studentTeam: StudentTeam } => {
  const studentTeam = getStudentTeam(student, studentTeams);
  const clonedTeams = cloneDeep(opposingTeams[+student.level - 1]);
  const gamesPlayed = student.seasons[+student.level - 1] || [];

  let studentWins = 0;
  let studentLosses = 0;
  let studentPoints = 0;

  gamesPlayed.forEach((game) => {
    studentPoints += game.studentPoints;
    if (game.studentWin) {
      studentWins++;
    } else {
      studentLosses++;
    }

    clonedTeams.forEach((team) => {
      team.stats.rank = getRandomTeamRank(+student.level);
      if (team.name !== game.opposingTeam.name) {
        team.stats.points += getRandomStat(3);
        const wins = getRandomStat(2);
        const losses = wins === 0 ? 1 : 0;
        team.stats.wins += wins;
        team.stats.losses += losses;
      }
    });
  });

  studentTeam.stats.wins = studentWins;
  studentTeam.stats.losses = studentLosses;
  studentTeam.stats.points = studentPoints;

  [...clonedTeams, studentTeam]
    .sort((a, b) => b.stats.points - a.stats.points)
    .forEach((team, i) => {
      team.stats.standing = i + 1;
    });

  return { levelOpposingTeams: clonedTeams, studentTeam };
};
