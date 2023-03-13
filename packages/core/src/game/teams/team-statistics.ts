import { Student } from '../../student/student.interface';
import { OpposingTeam } from './opposing-team.type';
import { teamPlayerProperties } from './players';
import { StudentTeam } from './student-team.type';

export const updateStudentTeamRank = (
  student: Student,
  studentTeam: StudentTeam
): void => {
  let rank = 0;
  teamPlayerProperties.forEach((prop) => {
    const player = (student.players || []).find(
      (p) => p.playerAssignment === prop
    );
    studentTeam.players[prop] = player;
    if (player) {
      rank += +player.overallRank;
    }
  });
  studentTeam.stats.rank = rank;
};

export const updateStandings = (
  studentTeam: StudentTeam,
  opposingTeams: OpposingTeam[]
): void => {
  [...opposingTeams, studentTeam]
    .sort((a, b) => b.stats.points - a.stats.points)
    .forEach((team, i) => {
      team.stats.standing = i + 1;
    });
};

export type TeamStatistics = {
  wins: number;
  losses: number;
  points: number;
  rank: number;
  standing: number;
};
