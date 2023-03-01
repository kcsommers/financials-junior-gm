import { getMoneySpent } from '../../game/budget/get-money-spent';
import { SeasonState } from '../../game/season/season-state';
import { getTopPlayer } from '../../game/teams/utils/get-top-player';
import { Student } from '../../student/student.interface';
import { getDollarString } from '../../utils/get-dollar-string';
import { Button } from '../Button';

type SeasonStatsModalProps = {
  student: Student;
  seasonState: SeasonState;
  onContinue: () => void;
  onSaveAndExit: () => void;
};

export const SeasonStatsModal = ({
  student,
  seasonState,
  onContinue,
  onSaveAndExit,
}: SeasonStatsModalProps) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-12">
      <h3 className="text-primary mb-2 text-3xl">
        You have completed a double header!
      </h3>
      <p className="text-secondary text-lg">
        Here are your stats for the season so far:
      </p>
      <div className="stats-container mt-8 w-1/2">
        <div className="stat-wrap text-primary mt-4 flex items-center justify-between text-base">
          <span>Wins</span>
          <span>{seasonState.studentTeam.stats.wins}</span>
        </div>
        <div className="stat-wrap text-primary mt-4 flex items-center justify-between text-base">
          <span>Losses</span>
          <span>{seasonState.studentTeam.stats.losses}</span>
        </div>
        <div className="stat-wrap text-primary mt-4 flex items-center justify-between text-base">
          <span>Team Standing</span>
          <span>{seasonState.studentTeam.stats.standing}</span>
        </div>
        <div className="stat-wrap text-primary mt-4 flex items-center justify-between text-base">
          <span>Money Spent</span>
          <span>{getDollarString(getMoneySpent(student))}</span>
        </div>
        <div className="stat-wrap text-primary mt-4 flex items-center justify-between text-base">
          <span>Savings</span>
          <span>{getDollarString(student.savingsBudget) || '$0'}</span>
        </div>
        <div className="stat-wrap text-primary mt-4 flex items-center justify-between text-base">
          <span>Top Player</span>
          <span>{getTopPlayer(student.players).playerName}</span>
        </div>
      </div>
      <div className="flex items-center justify-center w-full mt-8">
        <span className="mr-8">
          <Button text="Continue Season" onClick={onContinue} />
        </span>
        <span className="ml-8">
          <Button text="Save and Exit" onClick={onSaveAndExit} />
        </span>
      </div>
    </div>
  );
};
