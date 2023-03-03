import { ReactElement } from 'react';
import { Player } from '../../game/teams/players';
import { StudentTeam } from '../../game/teams/student-team.type';
import { Student } from '../../student/student.interface';
import { ConfirmScreen } from '../ConfirmScreen';
import { PlayerCard } from '../PlayerCard';
import ArrowLeft from '../svg/arrow-left-solid.svg';
import ArrowRight from '../svg/arrow-right-solid.svg';
import { TeamBudgetState } from '../TeamBudgetState';

type ConfirmReleasePlayerProps = {
  confirm: () => void;
  cancel: () => void;
  releasingPlayer: Player;
  signingPlayer: Player;
  student: Student;
  studentTeam: StudentTeam;
  validateProPlayer: (player: Player) => boolean;
  getTeamLogo: (props?: { [key: string]: any }) => ReactElement;
};

export const ConfirmTradePlayer = ({
  confirm,
  cancel,
  releasingPlayer,
  signingPlayer,
  student,
  studentTeam,
  validateProPlayer,
  getTeamLogo,
}: ConfirmReleasePlayerProps) => {
  return (
    <ConfirmScreen
      message="Are you sure you want to trade these player?"
      cancel={cancel}
      confirm={confirm}
    >
      <div className="flex pt-8 px-4">
        <div className="flex-1">
          <TeamBudgetState student={student} studentTeam={studentTeam} />
        </div>
        <div className="flex-1 flex scale-[0.85] origin-top">
          <div>
            <span className="text-secondary font-bold text-xl">OUT</span>
            <PlayerCard
              size="md"
              player={releasingPlayer}
              isProPlayer={validateProPlayer(releasingPlayer)}
              getTeamLogo={getTeamLogo}
            />
          </div>
          <div className="flex flex-col px-2 items-cemter justify-center">
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
            <span className="text-primary font-bold text-xl">IN</span>
            <PlayerCard
              size="md"
              player={signingPlayer}
              isProPlayer={validateProPlayer(signingPlayer)}
              getTeamLogo={getTeamLogo}
            />
          </div>
        </div>
      </div>
    </ConfirmScreen>
  );
};
