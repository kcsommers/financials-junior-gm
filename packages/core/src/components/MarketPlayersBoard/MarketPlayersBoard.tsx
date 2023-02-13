import { useMemo } from 'react';
import { logger } from '../../auth/utils/logger';
import { getStudentBudget } from '../../game/budget/utils/get-student-budget';
import { MarketConfig } from '../../game/market/market';
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
  players: Player[];
  marketConfig: MarketConfig;
  onSignPlayer: (player: Player) => void;
};

export const MarketPlayersBoard = ({
  student,
  slotAssignment,
  players,
  marketConfig,
  onSignPlayer,
}: MarketPlayersBoardProps) => {
  const position = getAssignmentPosition(slotAssignment);
  const displayedPlayers = useMemo(() => {
    const market = getMarket(players);
    return market[`${position}${position !== 'defense' ? 's' : ''}`] || [];
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
      logger.log('Insufficient funds:::: ');
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
      <div className="border-4 border-neutral-700 rounded-md pt-2 pb-4 m">
        <p className="text-primary text-xl text-center">
          {capitalize(position)}
          {position !== 'defense' && 's'} you can sign
        </p>
        <div className="flex justify-around">
          {displayedPlayers.map((player) => (
            <PlayerCard player={player} onClick={checkBudget} />
          ))}
        </div>
      </div>
    </div>
  );
};
