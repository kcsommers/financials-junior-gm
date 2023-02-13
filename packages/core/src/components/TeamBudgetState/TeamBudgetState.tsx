import { LevelStick } from '../../components/LevelStick';
import { useEffect, useState } from 'react';
import { getMoneySpent } from '../../game/utils/get-money-spent';
import { getTeamRank } from '../../game/teams/utils/get-team-rank';
import { Student } from '../../student/student.interface';
import { getMaxTeamRank } from '../../game/teams/utils/get-max-team-rank';

type TeamBudgetStateProps = {
  student: Student;
  size?: 'sm' | 'md' | 'lg';
  changes?: {
    playerCost: number;
    playerRank: number;
  };
};

export const TeamBudgetState = ({
  student,
  size = 'md',
  changes,
}: TeamBudgetStateProps) => {
  const [teamRank, setTeamRank] = useState(0);
  const [moneySpent, setMoneySpent] = useState(0);

  useEffect(() => {
    setTeamRank(getTeamRank(student));
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
            type="teamRank"
            amount={teamRank}
            denom={getMaxTeamRank(+student?.level)}
            color="#e06d00"
            indicatorDirection="right"
            size={size}
            textJsx={
              <span>
                Team <br />
                Rank
              </span>
            }
          />
          {!!changes?.playerRank && (
            <span className="absolute bottom-0 right-1/2 text-3xl text-primary">
              +{changes.playerRank}
            </span>
          )}
        </div>
        <div className="relative">
          <LevelStick
            type="budget"
            size={size}
            amount={Math.max(
              +student.totalBudget - moneySpent - +student.savingsBudget,
              0
            )}
            // amount={
            //   tutorialState
            //     ? tutorialState.budget
            //     : Math.max(
            //         +student.totalBudget - moneySpent - +student.savingsBudget,
            //         0
            //       )
            // }
            denom={+student.totalBudget}
            color="#002f6c"
            indicatorDirection="left"
            inverse={true}
            textJsx={
              <span>
                Spending <br />
                Budget
              </span>
            }
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
