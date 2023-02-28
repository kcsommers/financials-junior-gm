import { StudentTeam } from '../../game/teams/student-team.type';
import { TeamCard } from '../TeamCard';

type StudentTeamStatsViewProps = {
  studentTeam: StudentTeam;
};

export const StudentTeamStatsView = ({
  studentTeam,
}: StudentTeamStatsViewProps) => {
  return (
    <div className="py-4 pl-4 pr-2 h-full flex flex-col justify-between">
      <TeamCard team={studentTeam} />
      <div className="flex items-center justify-between max-w-[195px]">
        <span className="flex flex-col items-center justify-center">
          <span className="text-white text-xl">Wins</span>
          <span className="bg-white rounded-lg flex items-center justify-center text-4xl font-bold shadow-mat w-[55px] h-[55px]">
            {String(studentTeam.stats.wins)}
          </span>
        </span>
        <span className="flex flex-col items-center justify-center">
          <span className="text-white text-xl">Losses</span>
          <span className="bg-white rounded-lg flex items-center justify-center text-4xl font-bold shadow-mat w-[55px] h-[55px]">
            {String(studentTeam.stats.losses)}
          </span>
        </span>
        <span className="flex flex-col items-center justify-center">
          <span className="text-white text-xl">Points</span>
          <span className="bg-white rounded-lg flex items-center justify-center text-4xl font-bold shadow-mat w-[55px] h-[55px]">
            {String(studentTeam.stats.points)}
          </span>
        </span>
      </div>
    </div>
  );
};
