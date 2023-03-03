import { cloneDeep } from 'lodash';
import {
  Player,
  PlayerAssignment,
  PlayerAssignments,
} from '../../../game/teams/players';
import { Student } from '../../../student/student.interface';
import {
  updateStudent,
  UpdateStudentResponse,
} from '../../../student/update-student';

export const tradePlayer = async (
  student: Student,
  releasingPlayer: Player,
  signingPlayer: Player,
  apiBaseUrl: string
): Promise<UpdateStudentResponse> => {
  const releasingPlayerAssignment = releasingPlayer.playerAssignment;
  const clonedPlayers = cloneDeep(student.players);
  const clonedReleasingPlayer = clonedPlayers.find(
    (p) => p._id === releasingPlayer._id
  );
  const clonedSigningPlayer = clonedPlayers.find(
    (p) => p._id === signingPlayer._id
  );
  clonedReleasingPlayer.playerAssignment =
    PlayerAssignments.TRADED as PlayerAssignment;
  clonedSigningPlayer.playerAssignment = releasingPlayerAssignment;

  const updateStudentRes = await updateStudent(
    student._id,
    {
      players: clonedPlayers,
      [releasingPlayerAssignment]: signingPlayer._id,
    },
    apiBaseUrl
  );

  return updateStudentRes;
};
