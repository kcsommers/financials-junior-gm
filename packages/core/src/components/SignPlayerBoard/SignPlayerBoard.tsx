import classNames from 'classnames';
import { ReactElement, useEffect, useState } from 'react';
import { logger } from '../../utils/logger';
import { Player, PlayerAssignment } from '../../game/teams/players';
import { StudentTeam } from '../../game/teams/student-team.type';
import { signPlayer } from '../../game/teams/utils/sign-player';
import { Student } from '../../student/student.interface';
import { TeamTutorialSlideEvent } from '../../tutorial/component-configs/team-tutorial-components';
import { useAsyncState } from '../../utils/context/async-state.context';
import { MarketPlayersBoard } from '../MarketPlayersBoard/MarketPlayersBoard';
import { PlayerCard } from '../PlayerCard';
import { ConfirmSignPlayer } from './ConfirmSignPlayer';
import { SignPlayerSuccess } from './SignPlayerSuccess';

type SignPlayerBoardProps = {
  student: Student;
  studentTeam: StudentTeam;
  slotAssignment: PlayerAssignment;
  apiBaseUrl: string;
  isDisabled?: boolean;
  validateProPlayer: (player: Player) => boolean;
  getTeamLogo: (props: any) => ReactElement;
  onPlayerSigned: (student: Student, completedScenario?: boolean) => void;
  setTutorialSlideEventListener?: (
    listener: (slideEvent: TeamTutorialSlideEvent) => void
  ) => void;
  close: () => void;
};

export const SignPlayerBoard = ({
  student,
  studentTeam,
  slotAssignment,
  apiBaseUrl,
  isDisabled,
  validateProPlayer,
  getTeamLogo,
  onPlayerSigned,
  setTutorialSlideEventListener,
  close,
}: SignPlayerBoardProps) => {
  const [signingPlayer, setSigningPlayer] = useState<Player>();
  const [playerDetailsPlayer, setPlayerDetailsPlayer] = useState<Player>();
  const [playerSigned, setPlayerSigned] = useState(false);
  const { setIsLoading, setErrorMessage } = useAsyncState();

  const signPlayerConfirmed = async () => {
    setIsLoading(true);
    try {
      const signPlayerRes = await signPlayer(
        student,
        signingPlayer,
        slotAssignment,
        apiBaseUrl
      );
      setPlayerSigned(true);
      onPlayerSigned(
        signPlayerRes.updatedStudent,
        signPlayerRes.completedScenario
      );
      setIsLoading(false);
    } catch (error: any) {
      logger.error('SignPlayerBoard.signPlayerConfirmed::::', error);
      setIsLoading(false);
      setErrorMessage(
        'There was an unexpected error signing this player. Please try again.'
      );
    }
  };

  useEffect(() => {
    if (!setTutorialSlideEventListener) {
      return;
    }
    setTutorialSlideEventListener((slideEvent: TeamTutorialSlideEvent) => {
      switch (slideEvent.name) {
        case 'SHOW_MARKET': {
          setSigningPlayer(null);
          setPlayerDetailsPlayer(null);
          break;
        }
        case 'SHOW_PLAYER_DETAILS': {
          setSigningPlayer(null);
          setPlayerDetailsPlayer(slideEvent.payload.player);
          break;
        }
        case 'SHOW_CONFIRM_SIGN_PLAYER': {
          setPlayerDetailsPlayer(null);
          setSigningPlayer(slideEvent.payload.player);
          break;
        }
      }
    });
  }, []);

  if (playerSigned) {
    return (
      <div
        className={classNames({
          'pointer-events-none': isDisabled,
        })}
      >
        <SignPlayerSuccess
          student={student}
          player={signingPlayer}
          studentTeam={studentTeam}
          isProPlayer={validateProPlayer(signingPlayer)}
          getTeamLogo={getTeamLogo}
        />
      </div>
    );
  }

  if (playerDetailsPlayer) {
    return (
      <div className="h-full flex items-center justify-center">
        <PlayerCard
          player={playerDetailsPlayer}
          size="lg"
          isProPlayer={validateProPlayer(playerDetailsPlayer)}
          getTeamLogo={getTeamLogo}
        />
      </div>
    );
  }

  if (signingPlayer) {
    return (
      <div
        className={classNames({
          'pointer-events-none': isDisabled,
        })}
      >
        <ConfirmSignPlayer
          student={student}
          studentTeam={studentTeam}
          player={signingPlayer}
          cancel={() => setSigningPlayer(null)}
          confirm={signPlayerConfirmed}
          isProPlayer={validateProPlayer(signingPlayer)}
          getTeamLogo={getTeamLogo}
        />
      </div>
    );
  }

  return (
    <div
      className={classNames('p-12 h-full flex flex-col justify-between', {
        'pointer-events-none': isDisabled,
      })}
    >
      <MarketPlayersBoard
        student={student}
        studentTeam={studentTeam}
        slotAssignment={slotAssignment}
        onSignPlayer={setSigningPlayer}
        validateProPlayer={validateProPlayer}
        getTeamLogo={getTeamLogo}
        close={close}
      />
    </div>
  );
};
