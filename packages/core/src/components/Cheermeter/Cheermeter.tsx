import { motion } from 'framer-motion';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import CheermeterNeedle from '../../components/svg/cheermeter-needle.svg';
import CheermeterSvg from '../../components/svg/cheermeter.svg';
import { GamePhase, GamePhases } from '../../game/season/game-phases';
import { useInterval } from '../../utils/hooks/use-interval';
import { useKeydown } from '../../utils/hooks/use-keydown';

type CheermeterProps = {
  gamePhase: GamePhase;
  setCheerPoints: Dispatch<SetStateAction<number>>;
};

export const Cheermeter = ({ gamePhase, setCheerPoints }: CheermeterProps) => {
  const [cheerLevel, setCheerLevel] = useState(0);
  const [cheerCounter, setCheerCounter] = useState(0);
  const [cheerInterval, setCheerInterval] = useState<number>();

  const { reset } = useInterval(() => {
    setCheerLevel((prevLevel) => Math.max(0, prevLevel - 1));
    setCheerCounter((prevCount) => Math.max(0, prevCount - 5));
  }, cheerInterval);

  const getRotate = () => {
    const rotate = 12 * cheerLevel;
    return rotate - 25;
  };

  const onCheer = useCallback(() => {
    // initial cheer
    if (cheerLevel === 0 && cheerCounter === 0) {
      setCheerInterval(2000);
    }

    // update the click count
    setCheerCounter((prevCount) => {
      const newCount = prevCount + 1;
      // every 5 clicks the cheerlevel increases and
      // the timer is reset
      if (newCount % 5 === 0) {
        setCheerLevel((prevLevel) => Math.min(prevLevel + 1, 15));
        reset();
      }
      return newCount;
    });
  }, [cheerLevel, cheerCounter]);

  const prevCheerCount = useRef(cheerCounter);
  useEffect(() => {
    setCheerPoints((prevPoints) => {
      let newPoints = prevPoints;
      if (prevCheerCount.current > cheerCounter) {
        // if the cheer count has gone down,
        // reduce the team rank
        newPoints = Math.max(prevPoints - 1, 0);
      } else if (cheerCounter && cheerCounter % 15 === 0) {
        // otherwise every 15 clicks the team rank goes up 1 (max 5)
        newPoints = Math.min(prevPoints + 1, 5);
      }
      if (newPoints !== prevPoints) {
        setCheerPoints(newPoints);
      }
      return newPoints;
    });

    prevCheerCount.current = cheerCounter;
  }, [cheerCounter]);

  useKeydown('Space', onCheer, true);
  // useKeydown('Space', onCheer, gamePhase?.name === GamePhases.GAME_ON);

  const prevCheerLevel = useRef<number>(cheerLevel);
  useEffect(() => {
    if (prevCheerLevel.current !== cheerLevel) {
      prevCheerLevel.current = cheerLevel;
    }
  }, [cheerLevel]);

  return (
    <div className="relative">
      <CheermeterSvg />
      <motion.span
        className="absolute left-1/2 bottom-0 inline-block w-[40px] h-[40px]"
        initial={{
          x: '-58%',
          y: '-70%',
        }}
        animate={{
          rotate: getRotate(),
        }}
        transition={{
          rotate:
            prevCheerLevel.current <= cheerLevel
              ? {
                  type: 'spring',
                  stiffness: 500,
                }
              : {
                  type: 'tween',
                  duration: 2,
                },
        }}
      >
        <span
          className="inline-block"
          style={{ transform: 'translate(-39%, -14%)' }}
        >
          <CheermeterNeedle />
        </span>
      </motion.span>
    </div>
  );
};
