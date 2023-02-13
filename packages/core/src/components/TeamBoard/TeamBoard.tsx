import { Player, PlayerAssignment } from '../../game/teams/players';
import { StudentTeam } from '../../game/teams/student-team.type';
import { Student } from '../../student/student.interface';
import { PlayerCard } from '../PlayerCard';
import IceBg from '../svg/ice-bg-small.svg';
import { AddPlayerCard } from './AddPlayerCard';

type TeamBoardProps = {
  student: Student;
  studentTeam: StudentTeam;
  onPlayerSelected: (player: Player) => void;
  onAddPlayer: (assignment: PlayerAssignment) => void;
};

export const TeamBoard = ({
  studentTeam,
  onPlayerSelected,
  onAddPlayer,
}: TeamBoardProps) => {
  return (
    <div
      className="border-4 relative border-neutral-700 rounded-md self-start overflow-hidden bg-white"
      style={{ height: '335px' }}
    >
      <IceBg
        // @ts-ignore
        className="absolute left-0 right-0 top-0 bottom-0 -translate-x-1 translate-y-2 inline-block"
        width="102%"
      />
      <div className="flex items-end justify-around relative flex-1 pt-1">
        {['fOne', 'fTwo', 'fThree'].map((assignment, i) => (
          <div
            key={assignment}
            style={{
              position: 'relative',
              top: i === 1 ? '15px' : '0px',
            }}
          >
            {!!studentTeam.players[assignment] ? (
              <PlayerCard
                player={studentTeam.players[assignment]}
                onClick={onPlayerSelected}
              />
            ) : (
              <AddPlayerCard
                slotAssignment={assignment as PlayerAssignment}
                onClick={onAddPlayer}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex items-end justify-around relative flex-1 pt-1 mt-4">
        {['dOne', 'gOne', 'dTwo'].map((assignment, i) => (
          <div
            key={assignment}
            style={{
              position: 'relative',
              top: i === 1 ? '15px' : '0px',
            }}
          >
            {!!studentTeam.players[assignment] ? (
              <PlayerCard
                player={studentTeam.players[assignment]}
                onClick={onPlayerSelected}
              />
            ) : (
              <AddPlayerCard
                slotAssignment={assignment as PlayerAssignment}
                onClick={onAddPlayer}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
