import { cloneDeep } from 'lodash';
import { ObjectiveNames } from '../../../game/objectives/objectives';
import { scenarioActive } from '../../../game/season/scenario-active';
import { Player, PlayerAssignment } from '../../../game/teams/players';
import { Student } from '../../../student/student.interface';
import {
  updateStudent,
  UpdateStudentResponse,
} from '../../../student/update-student';
import { startingLineupFull } from './starting-lineup-full';

type SignPlayerResponse = UpdateStudentResponse & {
  completedScenario: boolean;
};

export const signPlayer = async (
  student: Student,
  player: Player,
  assignment: PlayerAssignment,
  apiBaseUrl: string
): Promise<SignPlayerResponse> => {
  const clonedStudent = cloneDeep(student);
  const signedPlayer = clonedStudent.players.find((p) => p._id === player._id);
  signedPlayer.playerAssignment = assignment;

  const updates: Partial<Student> = {
    players: clonedStudent.players,
    [assignment]: signedPlayer,
  };

  clonedStudent[assignment] = signedPlayer;
  let completedScenario = false;
  if (scenarioActive(student) && startingLineupFull(clonedStudent)) {
    completedScenario = true;
    updates.objectives = {
      ...student.objectives,
      [ObjectiveNames.SEASON_SCENARIO]: true,
    };
  }

  const updateStudentRes = await updateStudent(
    student._id,
    updates,
    apiBaseUrl
  );

  return {
    ...updateStudentRes,
    completedScenario,
  };
};
