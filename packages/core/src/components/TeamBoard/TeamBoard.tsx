import { ReactElement } from 'react';
import { Player, PlayerAssignment } from '../../game/teams/players';
import { StudentTeam } from '../../game/teams/student-team.type';
import { Student } from '../../student/student.interface';
import { TeamTutorialComponents } from '@statrookie/core/src/tutorial/component-configs/team-tutorial-components';
import { PlayerCard } from '../PlayerCard';
import IceBg from '../svg/ice-bg-small.svg';
import { AddPlayerCard } from './AddPlayerCard';

type TeamBoardProps = {
  student: Student;
  studentTeam: StudentTeam;
  tutorialComponents: TeamTutorialComponents;
  onPlayerSelected: (player: Player) => void;
  onAddPlayer: (assignment: PlayerAssignment) => void;
  getTeamLogo: (props?: { [key: string]: any }) => ReactElement;
  validateProPlayer: (player: Player) => boolean;
};

export const TeamBoard = ({
  studentTeam,
  tutorialComponents,
  getTeamLogo,
  onPlayerSelected,
  onAddPlayer,
  validateProPlayer,
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
                isProPlayer={validateProPlayer(studentTeam.players[assignment])}
                getTeamLogo={getTeamLogo}
              />
            ) : (
              <AddPlayerCard
                componentConfig={tutorialComponents.forwardCards}
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
                isProPlayer={validateProPlayer(studentTeam.players[assignment])}
                getTeamLogo={getTeamLogo}
                onClick={onPlayerSelected}
              />
            ) : (
              <AddPlayerCard
                componentConfig={
                  assignment === 'gOne'
                    ? tutorialComponents.goalieCard
                    : tutorialComponents.defenseCards
                }
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
