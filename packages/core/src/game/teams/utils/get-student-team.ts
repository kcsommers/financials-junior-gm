import { cloneDeep } from 'lodash';
import { Student } from '../../../student/student.interface';
import { teamPlayerProperties } from '../players';
import { StudentTeam } from '../student-team.type';

export const getStudentTeam = (
  student: Student,
  teams: StudentTeam[]
): StudentTeam => {
  const studentTeam = cloneDeep(teams[+student?.level - 1]);
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
  return studentTeam;
};
