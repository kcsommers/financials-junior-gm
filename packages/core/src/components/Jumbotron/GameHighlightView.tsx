import { logger } from '../../auth/utils/logger';
import { OpposingTeam } from '../../game/teams/opposing-team.type';
import { StudentTeam } from '../../game/teams/student-team.type';
import { useTimeout } from '../../utils/hooks/use-timeout';

type GameHighlightViewProps = {
  currentOpponent: OpposingTeam;
  studentTeam: StudentTeam;
  onEnded: () => void;
};

export const GameHighlightView = ({
  currentOpponent,
  studentTeam,
  onEnded,
}: GameHighlightViewProps) => {
  const studentWin = studentTeam.stats.rank >= currentOpponent.stats.rank;

  useTimeout(() => {
    // move on if video takes longer than 10 seconds to load
    onEnded();
  }, 10000);

  return (
    <video
      key="game-highlight-video"
      className="w-full h-full object-cover"
      autoPlay
      muted
      poster="https://res.cloudinary.com/ddbcnnu7h/image/upload/v1676866443/game-on-bg_najxwc.png"
      onEnded={onEnded}
      onError={onEnded}
      onLoadStart={() => logger.log('video load started:::::')}
      onLoadedData={() => logger.log('vid data loaded::::')}
    >
      <source
        src={
          studentWin
            ? currentOpponent.videos.gameHighlight.win
            : currentOpponent.videos.gameHighlight.loss
        }
        type="video/mp4"
      />
    </video>
  );
};
