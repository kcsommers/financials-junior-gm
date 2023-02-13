import { useState } from 'react';
import { releasePlayer } from '../../game/market/utils/release-player';
import { Player } from '../../game/teams/players';
import { Student } from '../../student/student.interface';
import { Button } from '../Button';
import { PlayerCard } from '../PlayerCard';
import { ConfirmReleasePlayer } from './ConfirmReleasePlayer';
import { PlayerReleaseSuccess } from './PlayerReleaseSuccess';

type ReleasePlayerBoardProps = {
  student: Student;
  setStudent: (student: Student) => void;
  player: Player;
  apiBaseUrl: string;
};

export const ReleasePlayerBoard = ({
  student,
  setStudent,
  apiBaseUrl,
  player,
}: ReleasePlayerBoardProps) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [playerReleased, setPlayerReleased] = useState(false);

  const releasePlayerConfirmed = async () => {
    try {
      const releasePlayerRes = await releasePlayer(student, player, apiBaseUrl);
      setStudent(releasePlayerRes.updatedStudent);
      setPlayerReleased(true);
    } catch (error: any) {
      // @TODO error handle
    }
  };

  if (playerReleased) {
    return <PlayerReleaseSuccess student={student} player={player} />;
  }

  if (showConfirm) {
    return (
      <ConfirmReleasePlayer
        student={student}
        player={player}
        cancel={() => setShowConfirm(false)}
        confirm={releasePlayerConfirmed}
      />
    );
  }

  return (
    <div className="p-12 h-full flex flex-col items-center justify-center">
      <PlayerCard size="lg" player={player} />
      <div className="mt-8">
        <Button text="Release" onClick={() => setShowConfirm(true)} />
      </div>
    </div>
  );
};
