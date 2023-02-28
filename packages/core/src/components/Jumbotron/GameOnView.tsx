import { OpposingTeam } from '../../game/teams/opposing-team.type';

type GameOnViewProps = {
  currentOpponent: OpposingTeam;
};

export const GameOnView = ({ currentOpponent }: GameOnViewProps) => {
  return (
    <video
      key="game-on-video"
      className="w-full h-full object-cover"
      autoPlay
      muted
      loop
      poster="https://res.cloudinary.com/ddbcnnu7h/image/upload/v1676866443/game-on-bg_najxwc.png"
    >
      <source src={currentOpponent.videos.gameOn} type="video/mp4" />
    </video>
  );
};
