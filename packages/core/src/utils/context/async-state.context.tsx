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
  showAppSpinner: boolean;
  setShowAppSpinner: Dispatch<SetStateAction<boolean>>;
};

const ASYNC_STATE_CONTEXT = createContext({} as AsyncStateContext);

export const AsyncStateProvider = ({ children }) => {
  // using this state affects the entire app. When isLoading is true, all user actions are disabled
  const [isLoading, setIsLoading] = useState(false);

  // triggers an error modal in _app.js
  const [errorMessage, setErrorMessage] = useState('');

  // overlays a loading spinner over entire app
  const [showAppSpinner, setShowAppSpinner] = useState(false);

  const memoizedValue = useMemo(
    () => ({
      isLoading,
      setIsLoading,
      errorMessage,
      setErrorMessage,
      showAppSpinner,
      setShowAppSpinner,
    }),
    [isLoading, errorMessage, showAppSpinner]
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
