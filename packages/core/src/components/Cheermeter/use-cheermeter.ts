import { useEffect, useRef, useState } from 'react';
import { useGame } from '../../game/game-context';
import { useInterval } from '../../utils/hooks/use-interval';
import { GamePhases } from '../../game/season/game-phases';

export const useCheermeter = (): {
  onCheer: () => void;
  cheerPoints: number;
  cheerLevel: number;
} => {
  const { seasonState } = useGame();
  const [cheerCounter, setCheerCounter] = useState(0); // increases every click
  const [cheerPoints, setCheerPoints] = useState(0); // increases every 15 clicks
  const [cheerLevel, setCheerLevel] = useState(0); // controls needle rotation
  const [cheerInterval, setCheerInterval] = useState<number>();

  const { reset } = useInterval(() => {
    setCheerLevel((prevLevel) => Math.max(0, prevLevel - 1));
    setCheerCounter((prevCount) => {
      const newCount = Math.max(0, prevCount - 5);
      updateCheerPoints(newCount, prevCount);
      return newCount;
    });
  }, cheerInterval);

  const updateCheerPoints = (newCheerCount: number, prevCheerCount: number) => {
    setCheerPoints((prevPoints) => {
      let newPoints = prevPoints;
      if (prevCheerCount > newCheerCount) {
        // if the cheer count has gone down,
        // reduce the team rank
        newPoints = Math.max(prevPoints - 1, 0);
      } else if (newCheerCount && newCheerCount % 15 === 0) {
        // otherwise every 15 clicks the team rank goes up 1 (max 5)
        newPoints = Math.min(prevPoints + 1, 5);
      }
      if (newPoints !== prevPoints) {
        setCheerPoints(newPoints);
      }
      return newPoints;
    });
  };

  const onCheer = () => {
    // update the click count
    setCheerCounter((prevCount) => {
      // initial cheer
      if (cheerLevel === 0 && cheerCounter === 0) {
        setCheerInterval(2000);
      }

      const newCount = prevCount + 1;
      // every 5 clicks the cheerlevel increases and
      // the timer is reset
      if (newCount % 5 === 0) {
        setCheerLevel((prevLevel) => Math.min(prevLevel + 1, 15));
        reset();
      }
      updateCheerPoints(newCount, prevCount);
      return newCount;
    });
  };

  useEffect(() => {}, [cheerCounter]);

  useEffect(() => {
    if (seasonState?.gamePhase?.name === GamePhases.GAME_OVER) {
      setCheerLevel(0);
      setCheerCounter(0);
      setCheerPoints(0);
      setCheerInterval(null);
    }
  }, [seasonState?.gamePhase?.name]);

  return {
    onCheer,
    cheerPoints,
    cheerLevel,
  };
};
