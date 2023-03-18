import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';

type AsyncStateContext = {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  errorMessage: string;
  setErrorMessage: Dispatch<SetStateAction<string>>;
};

const ASYNC_STATE_CONTEXT = createContext({} as AsyncStateContext);

export const AsyncStateProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const memoizedValue = useMemo(
    () => ({
      isLoading,
      setIsLoading,
      errorMessage,
      setErrorMessage,
    }),
    [isLoading, errorMessage]
  );

  return (
    <ASYNC_STATE_CONTEXT.Provider value={memoizedValue}>
      {children}
    </ASYNC_STATE_CONTEXT.Provider>
  );
};

export const useAsyncState = (): AsyncStateContext => {
  const context: AsyncStateContext = useContext(ASYNC_STATE_CONTEXT);
  if (context === undefined) {
    throw new Error('useAsyncState must be used within an AsyncStateProvider');
  }
  return context;
};
