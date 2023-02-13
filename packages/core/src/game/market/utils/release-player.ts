import { cloneDeep } from 'lodash';
import {
  Player,
  PlayerAssignment,
  PlayerAssignments,
} from '../../../game/teams/players';
import { Student } from '../../../student/student.interface';
import { updateStudent } from '../../../student/update-student';
import { UpdateStudentResponse } from '../../../student/update-student-response.type';

export const releasePlayer = async (
  student: Student,
  player: Player,
  apiBaseUrl: string
): Promise<UpdateStudentResponse> => {
  const prevAssignment = player.playerAssignment;
  const clonedPlayers = cloneDeep(student.players);
  const releasedPlayer = clonedPlayers.find((p) => p._id === player._id);
  releasedPlayer.playerAssignment =
    PlayerAssignments.MARKET as PlayerAssignment;

  const updateStudentRes = await updateStudent(
    student._id,
    {
      players: clonedPlayers,
      [prevAssignment]: null,
    },
    apiBaseUrl
  );

  return updateStudentRes;
};
