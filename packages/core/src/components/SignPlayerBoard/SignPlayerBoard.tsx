import { useMemo, useState } from 'react';
import { Player, PlayerAssignment } from '../../game/teams/players';
import { StudentTeam } from '../../game/teams/student-team.type';
import { TeamAssignments } from '../../game/teams/team';
import { getAvailableSlots } from '../../game/teams/utils/get-available-slots';
import { signPlayer } from '../../game/teams/utils/sign-player';
import { Student } from '../../student/student.interface';
import { MarketPlayersBoard } from '../MarketPlayersBoard/MarketPlayersBoard';
import { TeamBudgetState } from '../TeamBudgetState';
import { ConfirmSignPlayer } from './ConfirmSignPlayer';
import { PlayerSignSuccess } from './PlayerSignSuccess';

type SignPlayerBoardProps = {
  student: Student;
  studentTeam: StudentTeam;
  onPlayerSigned: (student: Student, completedScenario?: boolean) => void;
  slotAssignment: PlayerAssignment;
  apiBaseUrl: string;
};

export const SignPlayerBoard = ({
  student,
  studentTeam,
  onPlayerSigned,
  slotAssignment,
  apiBaseUrl,
}: SignPlayerBoardProps) => {
  const [signingPlayer, setSigningPlayer] = useState<Player>();
  const [playerSigned, setPlayerSigned] = useState(false);

  const availableSlots = useMemo(
    () => ({
      forwards: getAvailableSlots(TeamAssignments.offense, student),
      defense: getAvailableSlots(TeamAssignments.defense, student),
      goalie: getAvailableSlots(TeamAssignments.goalie, student),
    }),
    []
  );

  const signPlayerConfirmed = async () => {
    try {
      const signPlayerRes = await signPlayer(
        student,
        signingPlayer,
        slotAssignment,
        apiBaseUrl
      );
      setPlayerSigned(true);
      onPlayerSigned(
        signPlayerRes.updatedStudent,
        signPlayerRes.completedScenario
      );
    } catch (error: any) {
      // @TODO error handle
    }
  };

  if (playerSigned) {
    return (
      <PlayerSignSuccess
        student={student}
        player={signingPlayer}
        studentTeam={studentTeam}
      />
    );
  }

  if (signingPlayer) {
    return (
      <ConfirmSignPlayer
        student={student}
        studentTeam={studentTeam}
        player={signingPlayer}
        cancel={() => setSigningPlayer(null)}
        confirm={signPlayerConfirmed}
      />
    );
  }

  return (
    <div className="p-12 h-full flex flex-col justify-between">
      <div className="flex">
        <TeamBudgetState student={student} studentTeam={studentTeam} />
        <div className="flex-1 pl-8">
          <h3 className="text-primary text-2xl">Spaces On Your Team</h3>
          <div className="border-4 border-neutral-700 p-4 rounded-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-primary text-3xl">Forwards:</span>
              <span className="text-secondary text-4xl">
                {availableSlots.forwards}
              </span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-primary text-3xl">Defense:</span>
              <span className="text-secondary text-4xl">
                {availableSlots.defense}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-primary text-3xl">Goalie:</span>
              <span className="text-secondary text-4xl">
                {availableSlots.goalie}
              </span>
            </div>
          </div>
        </div>
      </div>

      <MarketPlayersBoard
        student={student}
        slotAssignment={slotAssignment}
        marketConfig={{ action: 'sign' }}
        onSignPlayer={setSigningPlayer}
      />
    </div>
  );
};
