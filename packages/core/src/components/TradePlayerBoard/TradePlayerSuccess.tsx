import { ReactElement } from 'react';
import { Player } from '../../game/teams/players';
import { StudentTeam } from '../../game/teams/student-team.type';
import { Student } from '../../student/student.interface';
import { PlayerCard } from '../PlayerCard';
import ArrowLeft from '../svg/arrow-left-solid.svg';
import ArrowRight from '../svg/arrow-right-solid.svg';
import { TeamBudgetState } from '../TeamBudgetState';

type TradePlayerSuccessProps = {
  student: Student;
  studentTeam: StudentTeam;
  releasingPlayer: Player;
  signingPlayer: Player;
  validateProPlayer: (player: Player) => boolean;
  getTeamLogo: (props?: { [key: string]: any }) => ReactElement;
};

export const TradePlayerSuccess = ({
  releasingPlayer,
  signingPlayer,
  student,
  studentTeam,
  validateProPlayer,
  getTeamLogo,
}: TradePlayerSuccessProps) => {
  return (
    <div className="py-16 max-w-[928px]">
      <h2 className="text-primary text-center mb-8 text-5xl">
        Players have been traded!
      </h2>
      <div className="flex flex-1 justify-around pl-16 pr-4">
        <div className="flex justify-center pt-6">
          <TeamBudgetState
            student={student}
            size="lg"
            studentTeam={studentTeam}
          />
        </div>
        <div className="flex-1 flex items-center justify-center scale-[0.85]">
          <div>
            <PlayerCard
              size="md"
              player={releasingPlayer}
              isProPlayer={validateProPlayer(releasingPlayer)}
              getTeamLogo={getTeamLogo}
            />
          </div>
          <div className="flex flex-col">
            <span>
              {/* @ts-ignore */}
              <ArrowRight width="50px" className="fill-secondary" />
            </span>
            <span>
              {/* @ts-ignore */}
              <ArrowLeft width="50px" className="fill-primary" />
            </span>
          </div>
          <div>
            <PlayerCard
              size="md"
              player={signingPlayer}
              isProPlayer={validateProPlayer(signingPlayer)}
              getTeamLogo={getTeamLogo}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
