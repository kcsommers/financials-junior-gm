import { Player } from '../../game/teams/players';
import { StudentTeam } from '../../game/teams/student-team.type';
import { Student } from '../../student/student.interface';
import { PlayerCard } from '../PlayerCard';
import NotepadIcon from '../svg/notepaper-pen.svg';
import { TeamBudgetState } from '../TeamBudgetState';

type PlayerSignSuccessProps = {
  student: Student;
  studentTeam: StudentTeam;
  player: Player;
};

export const PlayerSignSuccess = ({
  player,
  student,
  studentTeam,
}: PlayerSignSuccessProps) => {
  return (
    <div className="py-16">
      <h2 className="text-primary text-center mb-8 text-5xl">
        {player.playerName} has been signed!
      </h2>
      <div className="flex flex-1 justify-around px-16">
        <div className="flex justify-center pt-6">
          <TeamBudgetState
            student={student}
            studentTeam={studentTeam}
            size="lg"
          />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="flex-1">
            <PlayerCard size="md" player={player} />
          </div>
          <NotepadIcon
            // @ts-ignore
            className="mt-8 ml-4"
            width={140}
          />
        </div>
      </div>
    </div>
  );
};
