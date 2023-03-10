import classNames from 'classnames';
import { ReactElement, useMemo } from 'react';
import { getStudentBudget } from '../../game/budget/get-student-budget';
import { scenarioActive } from '../../game/season/scenario-active';
import { Player, PlayerAssignment } from '../../game/teams/players';
import { StudentTeam } from '../../game/teams/student-team.type';
import { TeamAssignments } from '../../game/teams/team';
import { getAssignmentPosition } from '../../game/teams/utils/get-assignment-position';
import { getAvailableSlots } from '../../game/teams/utils/get-available-slots';
import { getMarket } from '../../game/teams/utils/get-market';
import { Student } from '../../student/student.interface';
import { capitalize } from '../../utils/capitalize';
import { Button } from '../Button';
import { PlayerCard } from '../PlayerCard';
import { TeamBudgetState } from '../TeamBudgetState';

type MarketPlayersBoardProps = {
  student: Student;
  studentTeam: StudentTeam;
  slotAssignment: PlayerAssignment;
  releasingPlayer?: Player;
  onSignPlayer: (player: Player) => void;
  validateProPlayer: (player: Player) => boolean;
  getTeamLogo: (props?: { [key: string]: any }) => ReactElement;
};

export const MarketPlayersBoard = ({
  student,
  studentTeam,
  slotAssignment,
  releasingPlayer,
  onSignPlayer,
  validateProPlayer,
  getTeamLogo,
}: MarketPlayersBoardProps) => {
  const position = getAssignmentPosition(slotAssignment);
  const displayedPlayers = useMemo<Player[]>(() => {
    const market = getMarket(student.players);
    const displayedProp = `${position}${position !== 'defense' ? 's' : ''}`;
    if (scenarioActive(student)) {
      return market.offeredScout[displayedProp] || [];
    }
    return market[displayedProp] || [];
  }, []);

  const availableSlots = useMemo(
    () => ({
      forwards: getAvailableSlots(TeamAssignments.offense, student),
      defense: getAvailableSlots(TeamAssignments.defense, student),
      goalie: getAvailableSlots(TeamAssignments.goalie, student),
    }),
    []
  );

  const checkBudget = (signingPlayer: Player) => {
    const budget = getStudentBudget(student);
    if (releasingPlayer) {
      budget.spendingBudget += +releasingPlayer.playerCost;
    }
    const insufficientFunds =
      budget.spendingBudget - +signingPlayer.playerCost < 0;
    if (insufficientFunds) {
      // @TODO insufficient funds modal
      return;
    }

    onSignPlayer(signingPlayer);
  };

  return (
    <>
      <div className="flex">
        <TeamBudgetState student={student} studentTeam={studentTeam} />
        <div className="flex-1 pl-8">
          {releasingPlayer ? (
            <div className="flex items-center justify-center">
              <span className="-translate-y-4">
                <PlayerCard
                  player={releasingPlayer}
                  size="md"
                  isProPlayer={validateProPlayer(releasingPlayer)}
                  getTeamLogo={getTeamLogo}
                />
              </span>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
      <div>
        <div className="flex justify-around">
          <Button
            text="Forwards"
            size="sm"
            isDisabled={position !== 'forward'}
          />
          <Button
            text="Defense"
            size="sm"
            isDisabled={position !== 'defense'}
          />
          <Button text="Goalies" size="sm" isDisabled={position !== 'goalie'} />
        </div>
        <div className="border-4 border-neutral-700 rounded-md pt-2 pb-4 h-[205px]">
          <p className="text-primary text-xl text-center">
            {capitalize(position)}
            {position !== 'defense' && 's'} you can sign
          </p>
          <div className="flex justify-around">
            {displayedPlayers.map((player) => (
              <span
                key={player._id}
                className={classNames({
                  'scale-90': displayedPlayers.length >= 9,
                })}
              >
                <PlayerCard
                  player={player}
                  onClick={checkBudget}
                  isProPlayer={validateProPlayer(player)}
                  getTeamLogo={getTeamLogo}
                />
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
