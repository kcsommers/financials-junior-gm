import classNames from 'classnames';
import { useMemo } from 'react';
import { getStudentBudget } from '../../game/budget/get-student-budget';
import { scenarioActive } from '../../game/season/scenario-active';
import { MarketConfig } from '../../game/teams/market';
import { Player, PlayerAssignment } from '../../game/teams/players';
import { getAssignmentPosition } from '../../game/teams/utils/get-assignment-position';
import { getMarket } from '../../game/teams/utils/get-market';
import { Student } from '../../student/student.interface';
import { capitalize } from '../../utils/capitalize';
import { Button } from '../Button';
import { PlayerCard } from '../PlayerCard';

type MarketPlayersBoardProps = {
  student: Student;
  slotAssignment: PlayerAssignment;
  marketConfig: MarketConfig;
  onSignPlayer: (player: Player) => void;
};

export const MarketPlayersBoard = ({
  student,
  slotAssignment,
  marketConfig,
  onSignPlayer,
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

  const checkBudget = (signingPlayer: Player) => {
    const budget = getStudentBudget(student);
    let { spendingBudget } = budget;
    if (marketConfig.tradedPlayer) {
      spendingBudget += +marketConfig.tradedPlayer.playerCost;
    }

    const insufficientFunds =
      budget.spendingBudget - +signingPlayer.playerCost < 0;
    if (insufficientFunds) {
      return;
    }

    onSignPlayer(signingPlayer);
  };

  return (
    <div>
      <div className="flex justify-around">
        <Button text="Forwards" size="sm" isDisabled={position !== 'forward'} />
        <Button text="Defense" size="sm" isDisabled={position !== 'defense'} />
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
              <PlayerCard player={player} onClick={checkBudget} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
