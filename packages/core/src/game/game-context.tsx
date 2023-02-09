import { createContext, PropsWithChildren, useContext, useMemo } from 'react';

type GameProviderProps = PropsWithChildren;

type GameContext = {};

const GAME_CONTEXT = createContext<GameContext>({} as GameContext);

export const GameProvider = ({ children }: GameProviderProps) => {
  const memoizedValue = useMemo(() => ({}), []);

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
