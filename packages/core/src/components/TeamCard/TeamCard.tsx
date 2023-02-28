import { Team } from '../../game/teams/team.type';
import { addOrdinalSuffix } from '../../utils/add-ordinal-suffix';

type TeamCardProps = {
  team: Team;
};

export const TeamCard = ({ team }: TeamCardProps) => {
  return (
    <div className="flex items-center justify-center rounded-lg bg-white p-2 relative h-[167px] max-w-[195px] min-w-[195px]">
      {team.getLogo({ className: 'w-full h-full' })}
      <span className="absolute right-2 top-1 text-2xl">
        {addOrdinalSuffix(team.stats.standing)}
      </span>
    </div>
  );
};
