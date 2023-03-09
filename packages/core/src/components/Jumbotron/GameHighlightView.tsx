import { logger } from '../../auth/utils/logger';
import { useGame } from '../../game/game-context';
import { OpposingTeam } from '../../game/teams/opposing-team.type';
import { StudentTeam } from '../../game/teams/student-team.type';
import { Student } from '../../student/student.interface';
import { useTimeout } from '../../utils/hooks/use-timeout';

type GameHighlightViewProps = {
  currentOpponent: OpposingTeam;
  studentTeam: StudentTeam;
  student: Student;
  onEnded: () => void;
};

export const GameHighlightView = ({
  currentOpponent,
  studentTeam,
  student,
  onEnded,
}: GameHighlightViewProps) => {
  const { videoCache } = useGame();

  const studentWin = studentTeam.stats.rank >= currentOpponent.stats.rank;
  const videoSrc = studentWin
    ? currentOpponent.videos.gameHighlight.win
    : currentOpponent.videos.gameHighlight.loss;

  useTimeout(() => {
    // move on if video takes longer than 20 seconds to load
    onEnded();
  }, 20000);

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
        src={videoCache[+student.level - 1].get(videoSrc) || videoSrc}
        type="video/mp4"
      />
    </video>
  );
};
