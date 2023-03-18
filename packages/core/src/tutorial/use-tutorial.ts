import { useCallback, useRef, useState } from 'react';
import { useAuth } from '../auth/context/auth-context';
import { logger } from '../utils/logger';
import { Student } from '../student/student.interface';
import { postTutorialCompleted } from './post-tutorial-completed';
import { TutorialName } from './tutorial-name';

export const useTutorial = <ComponentConfigs, SlideEvents>(
  tutorialName: (() => TutorialName) | TutorialName,
  apiBaseUrl: string
) => {
  const { authorizedUser, setAuthorizedUser } = useAuth();
  const student = authorizedUser as Student;
  const [requestedTutorial, setRequestedTutorial] = useState<TutorialName>();
  const [activeTutorial, setActiveTutorial] = useState(
    typeof tutorialName === 'function'
      ? tutorialName()
      : () => {
          if (!student.tutorials || !student.tutorials[tutorialName]) {
            return tutorialName;
          }
          return null;
        }
  );

  const [tutorialComponentConfigs, setTutorialComponentConfigs] = useState(
    {} as ComponentConfigs
  );

  const tutorialEventListener = useRef<(slideEvent: SlideEvents) => void>();
  const setTutorialEventListener = useCallback(
    (listener: (slideEvent: SlideEvents) => void) => {
      tutorialEventListener.current = listener;
    },
    []
  );

  const onTutorialExit = async (
    completed: boolean,
    tutorialName: TutorialName
  ) => {
    if (!completed) {
      setActiveTutorial(null);
      setRequestedTutorial(null);
      return;
    }
    if (requestedTutorial) {
      setActiveTutorial(requestedTutorial);
      setRequestedTutorial(null);
    } else {
      try {
        const tutorialCompletedRes = await postTutorialCompleted(
          student,
          tutorialName,
          apiBaseUrl
        );
        setAuthorizedUser(tutorialCompletedRes.updatedStudent);
        setActiveTutorial(null);
        setTutorialComponentConfigs({} as ComponentConfigs);
      } catch (error: any) {
        logger.error('useTutorial.onTutorialExit:::: ', error);
        setActiveTutorial(null);
        setRequestedTutorial(null);
      }
    }
  };

  const tutorialActionListener = useRef<(args: any) => boolean>();
  const setTutorialActionListener = useCallback(
    (listener: (args: any) => boolean) => {
      tutorialActionListener.current = listener;
    },
    []
  );

  return {
    activeTutorial,
    requestedTutorial,
    setRequestedTutorial,
    onTutorialExit,
    tutorialComponentConfigs,
    setTutorialComponentConfigs,
    tutorialEventListener,
    setTutorialEventListener,
    tutorialActionListener,
    setTutorialActionListener,
  };
};
