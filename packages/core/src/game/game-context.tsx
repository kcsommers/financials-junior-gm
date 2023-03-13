import {
  createContext,
  Dispatch,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import { useAuth } from '../auth/context/auth-context';
import { logger } from '../auth/utils/logger';
import { postStudentTimeSpent } from '../student/post-student-time-spent';
import { Student } from '../student/student.interface';
import { loadAudio } from '../utils/asset-loader/load-audio';
import { useUnload } from '../utils/hooks/use-unload';
import {
  SeasonAction,
  seasonReducer,
  SeasonState,
} from './season/season-state';
import { initPlayersByLevel } from './teams/api/init-players-by-level';
import { OpposingTeam } from './teams/opposing-team.type';
import { StudentTeam } from './teams/student-team.type';
import { updateVideoCache } from './update-video-cache';

type GameProviderProps = PropsWithChildren<{
  studentTeams: StudentTeam[];
  opposingTeams: OpposingTeam[][];
  promotionVideos: string[];
  apiBaseUrl: string;
}>;

type GameContext = {
  seasonState: SeasonState;
  dispatch: Dispatch<SeasonAction>;
  showNextSeasonModal: boolean;
  setShowNextSeasonModal: (show: boolean) => void;
  videoCache: Map<string, string>[];
  audioCache: Map<string, string>;
};

const audioUrls = [
  'https://sharks-assets.s3.us-west-2.amazonaws.com/audio/cheering.mp3',
];

const GAME_CONTEXT = createContext<GameContext>({} as GameContext);

export const GameProvider = ({
  children,
  studentTeams,
  opposingTeams,
  promotionVideos,
  apiBaseUrl,
}: GameProviderProps) => {
  const [studentInitialized, setStudentInitialized] = useState(false);
  const [seasonInitialized, setSeasonInitialized] = useState(false);
  const [showNextSeasonModal, setShowNextSeasonModal] = useState(false);
  const { authorizedUser, setAuthorizedUser } = useAuth();
  const student = authorizedUser as Student;
  const studentRef = useRef(student);
  const [seasonState, dispatch] = useReducer(seasonReducer, null);
  const audioCache = useMemo(() => new Map<string, string>(), []);
  const videoCache = useMemo(
    () => [
      new Map<string, string>(),
      new Map<string, string>(),
      new Map<string, string>(),
    ],
    []
  );

  const startTime = useRef<number>();
  const updateTimeSpent = useCallback(
    async (unloadEvent?: BeforeUnloadEvent) => {
      if (unloadEvent) {
        unloadEvent.preventDefault();
        unloadEvent.returnValue = false;
      }
      try {
        await postStudentTimeSpent(
          studentRef.current,
          startTime.current,
          apiBaseUrl
        );
      } catch (error: any) {
        logger.error(error);
      }
    },
    []
  );
  useUnload(updateTimeSpent);
  useEffect(() => {
    startTime.current = Date.now();
    return () => {
      updateTimeSpent();
    };
  }, []);

  useEffect(() => {
    if (!student || studentInitialized) {
      return;
    }
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
        updateVideoCache(
          updatedStudent,
          opposingTeams,
          promotionVideos,
          videoCache
        );
        if (!audioCache.size) {
          loadAudio(audioUrls, audioCache);
        }
      } catch (error: any) {
        // @TODO error handle
      }
    })();
  }, [student, studentInitialized]);

  useEffect(() => {
    if (studentRef.current && !student) {
      // logged out, update time spent
      updateTimeSpent();
    }
    if (student) {
      setStudentInitialized(true);
    }
    studentRef.current = student;
  }, [student]);

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
      videoCache,
      audioCache,
    }),
    [seasonState, showNextSeasonModal]
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
