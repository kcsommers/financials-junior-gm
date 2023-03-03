import { ReactElement, useState } from 'react';
import { Player } from '../../game/teams/players';
import { StudentTeam } from '../../game/teams/student-team.type';
import { tradePlayer } from '../../game/teams/utils/trade-players';
import { Student } from '../../student/student.interface';
import { Button } from '../Button';
import { MarketPlayersBoard } from '../MarketPlayersBoard';
import { PlayerCard } from '../PlayerCard';
import { ConfirmTradePlayer } from './ConfirmTradePlayer';
import { TradePlayerSuccess } from './TradePlayerSuccess';

type TradePlayerBoardProps = {
  student: Student;
  studentTeam: StudentTeam;
  onPlayersTraded: (student: Student) => void;
  apiBaseUrl: string;
  validateProPlayer: (player: Player) => boolean;
  getTeamLogo: (props: any) => ReactElement;
  releasingPlayer: Player;
};

export const TradePlayerBoard = ({
  student,
  studentTeam,
  onPlayersTraded,
  apiBaseUrl,
  getTeamLogo,
  validateProPlayer,
  releasingPlayer,
}: TradePlayerBoardProps) => {
  const [tradeSuccess, setTradeSuccess] = useState(false);
  const [showMarket, setShowMarket] = useState(false);
  const [signingPlayer, setSigningPlayer] = useState<Player>();

  const tradePlayerConfirmed = async () => {
    try {
      const tradePlayerRes = await tradePlayer(
        student,
        releasingPlayer,
        signingPlayer,
        apiBaseUrl
      );
      onPlayersTraded(tradePlayerRes.updatedStudent);
      setTradeSuccess(true);
    } catch (error: any) {
      // @TODO error handle
    }
  };

  if (tradeSuccess) {
    return (
      <TradePlayerSuccess
        student={student}
        studentTeam={studentTeam}
        releasingPlayer={releasingPlayer}
        signingPlayer={signingPlayer}
        validateProPlayer={validateProPlayer}
        getTeamLogo={getTeamLogo}
      />
    );
  }

  if (!!signingPlayer) {
    return (
      <ConfirmTradePlayer
        student={student}
        studentTeam={studentTeam}
        cancel={() => setSigningPlayer(null)}
        confirm={tradePlayerConfirmed}
        validateProPlayer={validateProPlayer}
        signingPlayer={signingPlayer}
        releasingPlayer={releasingPlayer}
        getTeamLogo={getTeamLogo}
      />
    );
  }

  if (showMarket) {
    return (
      <div className="p-12 h-full flex flex-col justify-between">
        <MarketPlayersBoard
          student={student}
          studentTeam={studentTeam}
          slotAssignment={releasingPlayer.playerAssignment}
          releasingPlayer={releasingPlayer}
          onSignPlayer={setSigningPlayer}
          getTeamLogo={getTeamLogo}
          validateProPlayer={validateProPlayer}
        />
      </div>
    );
  }

  return (
    <div className="p-12 h-full flex flex-col items-center justify-center">
      <PlayerCard
        size="lg"
        player={releasingPlayer}
        getTeamLogo={getTeamLogo}
        isProPlayer={validateProPlayer(releasingPlayer)}
      />
      <div className="mt-8">
        <Button text="Trade" onClick={() => setShowMarket(true)} />
      </div>
    </div>
  );
};
