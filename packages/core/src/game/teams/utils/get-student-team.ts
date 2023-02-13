import { cloneDeep } from 'lodash';
import { Student } from '../../../student/student.interface';
import { teamPlayerProperties } from '../players';
import { StudentTeam } from '../student-team.type';

export const getStudentTeam = (
  student: Student,
  teams: StudentTeam[]
): StudentTeam => {
  const studentTeam = cloneDeep(teams[+student?.level - 1]);
  teamPlayerProperties.forEach((prop) => {
    const player = (student.players || []).find(
      (p) => p.playerAssignment === prop
    );
    studentTeam.players[prop] = player;
  });
  return studentTeam;
};
