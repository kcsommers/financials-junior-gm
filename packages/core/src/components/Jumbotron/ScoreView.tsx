import { GameResult } from '@statrookie/core/src/game/season/game-result';
import { motion } from 'framer-motion';
import { GamePhase, GamePhases } from '../../game/season/game-phases';
import { OpposingTeam } from '../../game/teams/opposing-team.type';
import { StudentTeam } from '../../game/teams/student-team.type';
import { TeamCard } from '../TeamCard';

type ScoreViewProps = {
  studentTeam: StudentTeam;
  currentOpponent: OpposingTeam;
  gameResult: GameResult;
  gamePhase: GamePhase;
};

export const ScoreView = ({
  studentTeam,
  currentOpponent,
  gameResult,
  gamePhase,
}: ScoreViewProps) => {
  const shouldAnimate = gamePhase.name === GamePhases.UP_NEXT;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center px-4 pt-4">
        <TeamCard team={studentTeam} />
        <span className="text-white text-xl px-2">VS</span>
        <motion.div
          className="game-on-top-right"
          initial={{ transform: shouldAnimate ? 'scale(0.5)' : 'scale(1)' }}
          animate={{ transform: 'scale(1)' }}
          transition={{
            default: {
              type: 'tween',
              duration: 1,
            },
          }}
        >
          <TeamCard team={currentOpponent} />
        </motion.div>
      </div>
      <div className="flex flex-1 justify-center items-center">
        <span className="text-5xl shadow-mat bg-white rounded-md w-[125px] h-[92px] flex items-center justify-center">
          {gameResult?.score[0] || '0'}
        </span>
        <span className="text-3xl text-white self-start m-4">Score</span>
        <span className="text-5xl shadow-mat bg-white rounded-md w-[125px] h-[92px] flex items-center justify-center">
          {gameResult?.score[1] || '0'}
        </span>
      </div>
    </div>
  );
};
