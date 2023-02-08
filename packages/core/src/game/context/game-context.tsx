import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
} from 'react';

type GameProviderProps = PropsWithChildren;

type GameContext = {
  id: number;
};

const GAME_CONTEXT = createContext<GameContext>({} as GameContext);

export const GameProvider = ({ children }: GameProviderProps) => {
  const id = useMemo(() => {
    return Math.floor(Math.random() * 100000);
  }, []);

  useEffect(() => {
    console.log('game provider init:::: ', id);
  }, []);

  const memoizedValue = useMemo(
    () => ({
      id,
    }),
    [id]
  );

  return (
    <GAME_CONTEXT.Provider value={memoizedValue}>
      {children}
    </GAME_CONTEXT.Provider>
  );
};

export const useGame = (): GameContext => {
  const context = useContext(GAME_CONTEXT);
  if (context === undefined) {
    throw new Error('useGame must be used within an GameProvider');
  }
  return context;
};
