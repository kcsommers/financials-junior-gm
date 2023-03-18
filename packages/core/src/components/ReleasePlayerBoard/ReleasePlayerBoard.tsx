import { ReactElement, useState } from 'react';
import { logger } from '../../utils/logger';
import { Player } from '../../game/teams/players';
import { StudentTeam } from '../../game/teams/student-team.type';
import { releasePlayer } from '../../game/teams/utils/release-player';
import { Student } from '../../student/student.interface';
import { useAsyncState } from '../../utils/context/async-state.context';
import { Button } from '../Button';
import { PlayerCard } from '../PlayerCard';
import { ConfirmReleasePlayer } from './ConfirmReleasePlayer';
import { ReleasePlayerSuccess } from './ReleasePlayerSuccess';

type ReleasePlayerBoardProps = {
  student: Student;
  studentTeam: StudentTeam;
  onPlayerReleased: (student: Student) => void;
  player: Player;
  apiBaseUrl: string;
  validateProPlayer: (player: Player) => boolean;
  getTeamLogo: (props: any) => ReactElement;
};

export const ReleasePlayerBoard = ({
  student,
  studentTeam,
  onPlayerReleased,
  apiBaseUrl,
  player,
  getTeamLogo,
  validateProPlayer,
}: ReleasePlayerBoardProps) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [playerReleased, setPlayerReleased] = useState(false);
  const { setIsLoading, setErrorMessage } = useAsyncState();

  const releasePlayerConfirmed = async () => {
    setIsLoading(true);
    try {
      const releasePlayerRes = await releasePlayer(student, player, apiBaseUrl);
      onPlayerReleased(releasePlayerRes.updatedStudent);
      setPlayerReleased(true);
      setIsLoading(false);
    } catch (error: any) {
      logger.error('ReleasePlayerBoard.releasePlayerConfirmed:::: ', error);
      setIsLoading(false);
      setErrorMessage(
        'There was an unexpected error releasing player. Please try again.'
      );
    }
  };

  if (playerReleased) {
    return (
      <ReleasePlayerSuccess
        student={student}
        studentTeam={studentTeam}
        player={player}
        isProPlayer={validateProPlayer(player)}
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
        isProPlayer={validateProPlayer(player)}
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
        isProPlayer={validateProPlayer(player)}
      />
      <div className="mt-8">
        <Button text="Release" onClick={() => setShowConfirm(true)} />
      </div>
    </div>
  );
};