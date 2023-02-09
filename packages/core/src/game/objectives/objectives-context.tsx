import { Student } from '../../auth/users/student.interface';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Objective, ObjectiveNames } from './objectives';

type ObjectivesProviderProps = PropsWithChildren<{
  student: Student;
}>;

type ObjectivesContext = {};

const OBJECTIVES_CONTEXT = createContext<ObjectivesContext>(
  {} as ObjectivesContext
);

export const ObjectivesProvider = ({ children }: ObjectivesProviderProps) => {
  const [currentObjectives, setCurrentObjectives] = useState<Objective[]>([]);

  const memoizedValue = useMemo(() => ({}), []);

  useEffect(() => {}, []);

  return (
    <OBJECTIVES_CONTEXT.Provider value={memoizedValue}>
      {children}
    </OBJECTIVES_CONTEXT.Provider>
  );
};

export const useObjectives = (): ObjectivesContext => {
  const context = useContext(OBJECTIVES_CONTEXT);
  if (context === undefined) {
    throw new Error('useObjectives must be used within an ObjectivesProvider');
  }
  return context;
};
