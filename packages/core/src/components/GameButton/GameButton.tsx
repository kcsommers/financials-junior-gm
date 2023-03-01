import classNames from 'classnames';
import { useGame } from '../../game/game-context';
import { GamePhase, GamePhases } from '../../game/season/game-phases';
import { scenarioActive } from '../../game/season/scenario-active';
import { seasonPageUnlocked } from '../../game/utils/unlocked-pages';
import { Student } from '../../student/student.interface';
import { useKeydown } from '../../utils/hooks/use-keydown';
import { ActiveGameButton } from './ActiveGameButton';
import PlayButton from './play-button.svg';

type GameButtonProps = {
  student: Student;
  gamePhase: GamePhase;
  onClick: () => void;
};

export const GameButton = ({
  gamePhase,
  onClick,
  student,
}: GameButtonProps) => {
  useKeydown('Space', onClick, false);
  // useKeydown('Space', onClick, gamePhase.name === GamePhases.READY);

  return (
    <button
      onClick={onClick}
      className={classNames({
        'pointer-events-none':
          gamePhase.name !== GamePhases.READY && !scenarioActive(student),
        disabled: !seasonPageUnlocked(student) && !scenarioActive(student),
      })}
    >
      {gamePhase.name === GamePhases.READY && !scenarioActive(student) ? (
        <PlayButton />
      ) : (
        <ActiveGameButton gamePhase={gamePhase} student={student} />
      )}
    </button>
  );
};
