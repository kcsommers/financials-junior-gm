import { ReactElement, useMemo, useState } from 'react';
import { Player, PlayerAssignment } from '../../game/teams/players';
import { StudentTeam } from '../../game/teams/student-team.type';
import { TeamAssignments } from '../../game/teams/team';
import { getAvailableSlots } from '../../game/teams/utils/get-available-slots';
import { signPlayer } from '../../game/teams/utils/sign-player';
import { Student } from '../../student/student.interface';
import { MarketPlayersBoard } from '../MarketPlayersBoard/MarketPlayersBoard';
import { TeamBudgetState } from '../TeamBudgetState';
import { ConfirmSignPlayer } from './ConfirmSignPlayer';
import { SignPlayerSuccess } from './SignPlayerSuccess';

type SignPlayerBoardProps = {
  student: Student;
  studentTeam: StudentTeam;
  onPlayerSigned: (student: Student, completedScenario?: boolean) => void;
  slotAssignment: PlayerAssignment;
  apiBaseUrl: string;
  validateProPlayer: (player: Player) => boolean;
  getTeamLogo: (props: any) => ReactElement;
};

export const SignPlayerBoard = ({
  student,
  studentTeam,
  onPlayerSigned,
  slotAssignment,
  apiBaseUrl,
  validateProPlayer,
  getTeamLogo,
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
      <SignPlayerSuccess
        student={student}
        player={signingPlayer}
        studentTeam={studentTeam}
        isProPlayer={validateProPlayer(signingPlayer)}
        getTeamLogo={getTeamLogo}
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
        isProPlayer={validateProPlayer(signingPlayer)}
        getTeamLogo={getTeamLogo}
      />
    );
  }

  return (
    <div className="p-12 h-full flex flex-col justify-between">
      <MarketPlayersBoard
        student={student}
        studentTeam={studentTeam}
        slotAssignment={slotAssignment}
        onSignPlayer={setSigningPlayer}
        validateProPlayer={validateProPlayer}
        getTeamLogo={getTeamLogo}
      />
    </div>
  );
};
