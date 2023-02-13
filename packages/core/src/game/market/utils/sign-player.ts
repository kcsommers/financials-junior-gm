import { cloneDeep } from 'lodash';
import { Player, PlayerAssignment } from '../../../game/teams/players';
import { Student } from '../../../student/student.interface';
import { updateStudent } from '../../../student/update-student';
import { UpdateStudentResponse } from '../../../student/update-student-response.type';

export const signPlayer = async (
  student: Student,
  player: Player,
  assignment: PlayerAssignment,
  apiBaseUrl: string
): Promise<UpdateStudentResponse> => {
  const clonedPlayers = cloneDeep(student.players);
  const signedPlayer = clonedPlayers.find((p) => p._id === player._id);
  signedPlayer.playerAssignment = assignment;

  const updateStudentRes = await updateStudent(
    student._id,
    {
      players: clonedPlayers,
      [assignment]: signedPlayer,
    },
    apiBaseUrl
  );

  return updateStudentRes;
};
