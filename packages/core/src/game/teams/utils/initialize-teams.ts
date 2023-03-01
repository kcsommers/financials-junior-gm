import { cloneDeep } from 'lodash';
import { Student } from '../../../student/student.interface';
import { getRandomStat, getRandomTeamRank } from '../../season/stats';
import { OpposingTeam } from '../opposing-team.type';
import { StudentTeam } from '../student-team.type';
import { updateStandings, updateStudentTeamRank } from '../team-statistics';

export const initializeTeams = (
  student: Student,
  studentTeams: StudentTeam[],
  opposingTeams: OpposingTeam[][]
): { levelOpposingTeams: OpposingTeam[]; studentTeam: StudentTeam } => {
  const studentTeam = cloneDeep(studentTeams[+student?.level - 1]);
  const levelOpposingTeams = cloneDeep(opposingTeams[+student.level - 1]);
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

    levelOpposingTeams.forEach((team) => {
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

  updateStudentTeamRank(student, studentTeam);
  updateStandings(studentTeam, levelOpposingTeams);

  return { levelOpposingTeams, studentTeam };
};
