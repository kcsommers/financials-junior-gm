import {
  createContext,
  Dispatch,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import { useAuth } from '../auth/context/auth-context';
import { Student } from '../student/student.interface';
import {
  SeasonAction,
  seasonReducer,
  SeasonState,
} from './season/season-state';
import { initPlayersByLevel } from './teams/api/init-players-by-level';
import { OpposingTeam } from './teams/opposing-team.type';
import { StudentTeam } from './teams/student-team.type';

type GameProviderProps = PropsWithChildren<{
  studentTeams: StudentTeam[];
  opposingTeams: OpposingTeam[][];
  apiBaseUrl: string;
}>;

type GameContext = {
  seasonState: SeasonState;
  dispatch: Dispatch<SeasonAction>;
  showNextSeasonModal: boolean;
  setShowNextSeasonModal: (show: boolean) => void;
  id: number;
};

const GAME_CONTEXT = createContext<GameContext>({} as GameContext);

export const GameProvider = ({
  children,
  studentTeams,
  opposingTeams,
  apiBaseUrl,
}: GameProviderProps) => {
  const [studentInitialized, setStudentInitialized] = useState(false);
  const [seasonInitialized, setSeasonInitialized] = useState(false);
  const [showNextSeasonModal, setShowNextSeasonModal] = useState(false);
  const { authorizedUser, setAuthorizedUser } = useAuth();
  const student = authorizedUser as Student;

  const id = useMemo(() => {
    return Math.floor(Math.random() * 100000);
  }, []);

  const [seasonState, dispatch] = useReducer(seasonReducer, null);

  useEffect(() => {
    if (!student || studentInitialized) {
      return;
    }
    setStudentInitialized(true);
    (async () => {
      try {
        let updatedStudent = student;
        if (!student.players?.length) {
          const initPlayersRes = await initPlayersByLevel(
            +student.level,
            apiBaseUrl
          );
          updatedStudent = initPlayersRes.data;
          setAuthorizedUser(updatedStudent);
        }
        dispatch({
          type: 'INIT_SEASON',
          payload: { student: updatedStudent, studentTeams, opposingTeams },
        });
      } catch (error: any) {
        // @TODO error handle
      }
    })();
  }, [student, studentInitialized]);

  useEffect(() => {
    if (!seasonInitialized && seasonState?.seasonComplete) {
      setShowNextSeasonModal(true);
    }
  }, [seasonState, seasonInitialized]);

  useEffect(() => {
    if (seasonState && !seasonInitialized) {
      setSeasonInitialized(true);
    }
  }, [seasonState, seasonInitialized]);

  const memoizedValue = useMemo(
    () => ({
      seasonState,
      showNextSeasonModal,
      setShowNextSeasonModal,
      dispatch,
      id,
    }),
    [seasonState, showNextSeasonModal, id]
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
