import { useEffect, useState } from 'react';
import { LevelStick } from '../../components/LevelStick';
import { getMoneySpent } from '../../game/budget/get-money-spent';
import { useGame } from '../../game/game-context';
import { StudentTeam } from '../../game/teams/student-team.type';
import { getMaxTeamRank } from '../../game/teams/utils/get-max-team-rank';
import { Student } from '../../student/student.interface';

type TeamBudgetStateProps = {
  student: Student;
  studentTeam: StudentTeam;
  size?: 'sm' | 'md' | 'lg';
  changes?: {
    playerCost: number;
    playerRank: number;
  };
};

export const TeamBudgetState = ({
  student,
  studentTeam,
  size = 'md',
  changes,
}: TeamBudgetStateProps) => {
  const [moneySpent, setMoneySpent] = useState(0);

  useEffect(() => {
    setMoneySpent(getMoneySpent(student));
  }, [student]);

  return (
    <div
      className="border-4 border-neutral-700 bg-white flex items-center rounded-md"
      style={{
        height: size === 'lg' ? '390px' : '285px',
        width: size === 'lg' ? '440px' : '370px',
      }}
    >
      <div
        className="relative h-auto flex items-center"
        style={{
          left: size === 'lg' ? '-28px' : '-25px',
          width: size === 'lg' ? '460px' : '390px',
        }}
      >
        <div style={{ position: 'relative' }}>
          <LevelStick
            value={studentTeam.stats.rank}
            denom={getMaxTeamRank(+student?.level)}
            color="secondary"
            indicatorDirection="right"
            size={size}
            label="Team\nRank"
          />
          {!!changes?.playerRank && (
            <span className="absolute bottom-0 right-1/2 text-3xl text-primary">
              +{changes.playerRank}
            </span>
          )}
        </div>
        <div className="relative">
          <LevelStick
            isMoney={true}
            size={size}
            value={Math.max(
              +student.totalBudget - moneySpent - +student.savingsBudget,
              0
            )}
            denom={+student.totalBudget}
            color="foreground"
            inverse={true}
            label="Spending\nBudget"
          />
          {!!changes?.playerCost && (
            <span className="absolute bottom-0 left-1/2 text-3xl text-red-600">
              -{changes.playerCost}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
