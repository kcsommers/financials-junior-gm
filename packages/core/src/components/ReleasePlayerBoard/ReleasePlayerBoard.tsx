import { ReactElement, useState } from 'react';
import { Player } from '../../game/teams/players';
import { StudentTeam } from '../../game/teams/student-team.type';
import { releasePlayer } from '../../game/teams/utils/release-player';
import { Student } from '../../student/student.interface';
import { Button } from '../Button';
import { PlayerCard } from '../PlayerCard';
import { ConfirmReleasePlayer } from './ConfirmReleasePlayer';
import { PlayerReleaseSuccess } from './PlayerReleaseSuccess';

type ReleasePlayerBoardProps = {
  student: Student;
  studentTeam: StudentTeam;
  onPlayerReleased: (student: Student) => void;
  player: Player;
  apiBaseUrl: string;
  isProPlayer: boolean;
  getTeamLogo: (props: any) => ReactElement;
};

export const ReleasePlayerBoard = ({
  student,
  studentTeam,
  onPlayerReleased,
  apiBaseUrl,
  player,
  getTeamLogo,
  isProPlayer,
}: ReleasePlayerBoardProps) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [playerReleased, setPlayerReleased] = useState(false);

  const releasePlayerConfirmed = async () => {
    try {
      const releasePlayerRes = await releasePlayer(student, player, apiBaseUrl);
      onPlayerReleased(releasePlayerRes.updatedStudent);
      setPlayerReleased(true);
    } catch (error: any) {
      // @TODO error handle
    }
  };

  if (playerReleased) {
    return (
      <PlayerReleaseSuccess
        student={student}
        studentTeam={studentTeam}
        player={player}
        isProPlayer={isProPlayer}
        getTeamLogo={getTeamLogo}
      />
    );
  }

  if (showConfirm) {
    return (
      <ConfirmReleasePlayer
        student={student}
        studentTeam={studentTeam}
        player={player}
        cancel={() => setShowConfirm(false)}
        confirm={releasePlayerConfirmed}
        isProPlayer={isProPlayer}
        getTeamLogo={getTeamLogo}
      />
    );
  }

  return (
    <div className="p-12 h-full flex flex-col items-center justify-center">
      <PlayerCard
        size="lg"
        player={player}
        getTeamLogo={getTeamLogo}
        isProPlayer={isProPlayer}
      />
      <div className="mt-8">
        <Button text="Release" onClick={() => setShowConfirm(true)} />
      </div>
    </div>
  );
};
