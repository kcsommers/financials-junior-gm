import { ReactElement } from 'react';
import { Player } from '../../game/teams/players';
import { StudentTeam } from '../../game/teams/student-team.type';
import { Student } from '../../student/student.interface';
import { ConfirmScreen } from '../ConfirmScreen';
import { PlayerCard } from '../PlayerCard';
import { TeamBudgetState } from '../TeamBudgetState';

type ConfirmReleasePlayerProps = {
  confirm: () => void;
  cancel: () => void;
  player: Player;
  student: Student;
  studentTeam: StudentTeam;
  isProPlayer: boolean;
  getTeamLogo: (props?: { [key: string]: any }) => ReactElement;
};

export const ConfirmReleasePlayer = ({
  confirm,
  cancel,
  player,
  student,
  studentTeam,
  isProPlayer,
  getTeamLogo,
}: ConfirmReleasePlayerProps) => {
  return (
    <ConfirmScreen
      message="Are you sure you want to release this player?"
      cancel={cancel}
      confirm={confirm}
    >
      <div className="flex px-12 pt-8">
        <div className="flex-1">
          <TeamBudgetState student={student} studentTeam={studentTeam} />
        </div>
        <div className="flex-1 -translate-y-6">
          <PlayerCard
            size="md"
            player={player}
            isProPlayer={isProPlayer}
            getTeamLogo={getTeamLogo}
          />
        </div>
      </div>
    </ConfirmScreen>
  );
};
