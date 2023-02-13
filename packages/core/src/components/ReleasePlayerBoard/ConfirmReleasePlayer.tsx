import { Player } from '../../game/teams/players';
import { Student } from '../../student/student.interface';
import { ConfirmScreen } from '../ConfirmScreen';
import { PlayerCard } from '../PlayerCard';
import { TeamBudgetState } from '../TeamBudgetState';

type ConfirmReleasePlayerProps = {
  confirm: () => void;
  cancel: () => void;
  player: Player;
  student: Student;
};

export const ConfirmReleasePlayer = ({
  confirm,
  cancel,
  player,
  student,
}: ConfirmReleasePlayerProps) => {
  return (
    <ConfirmScreen
      message="Are you sure you want to release this player?"
      cancel={cancel}
      confirm={confirm}
    >
      <div className="flex px-12 pt-8">
        <div className="flex-1">
          <TeamBudgetState student={student} />
        </div>
        <div className="flex-1 -translate-y-6">
          <PlayerCard size="md" player={player} />
        </div>
      </div>
    </ConfirmScreen>
  );
};
