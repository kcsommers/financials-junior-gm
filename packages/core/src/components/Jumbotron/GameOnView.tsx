import { useGame } from '../../game/game-context';
import { OpposingTeam } from '../../game/teams/opposing-team.type';
import { Student } from '../../student/student.interface';

type GameOnViewProps = {
  currentOpponent: OpposingTeam;
  student: Student;
};

export const GameOnView = ({ currentOpponent, student }: GameOnViewProps) => {
  const { videoCache } = useGame();

  return (
    <video
      key="game-on-video"
      className="w-full h-full object-cover"
      autoPlay
      muted
      loop
      poster="https://res.cloudinary.com/ddbcnnu7h/image/upload/v1676866443/game-on-bg_najxwc.png"
    >
      <source
        src={
          videoCache[+student.level - 1].get(currentOpponent.videos.gameOn) ||
          currentOpponent.videos.gameOn
        }
        type="video/mp4"
      />
    </video>
  );
};
