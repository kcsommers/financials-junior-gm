import { PlayerCard } from '../PlayerCard';
import { Player } from '../../game/teams/players';
import { StudentTeam } from '../../game/teams/student-team.type';
import { StudentTeamStatsView } from './StudentTeamStatsView';

type InjuredPlayerViewProps = {
  player: Player;
  studentTeam: StudentTeam;
};

export const InjuredPlayerView = ({
  player,
  studentTeam,
}: InjuredPlayerViewProps) => {
  return (
    <div className="flex h-full">
      <div className="flex-1">
        <StudentTeamStatsView studentTeam={studentTeam} />
      </div>
      <div className="flex-1">
        <span className="scale-90 inline-block origin-top">
          <PlayerCard player={player} size="md" />
        </span>
      </div>
    </div>
  );
};
