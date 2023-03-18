import { postRepeatSeason } from '@statrookie/core/src/game/season/repeat-season';
import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect } from 'react';
import { useAuth } from '../../auth/context/auth-context';
import { logger } from '../../utils/logger';
import { useGame } from '../../game/game-context';
import { GamePage } from '../../game/game-page';
import { postNextSeason } from '../../game/season/next-season';
import { OpposingTeam } from '../../game/teams/opposing-team.type';
import { StudentTeam } from '../../game/teams/student-team.type';
import { updateVideoCache } from '../../game/update-video-cache';
import { Student } from '../../student/student.interface';
import { updateStudent } from '../../student/update-student';
import { useAsyncState } from '../../utils/context/async-state.context';
import { Modal } from '../Modal';
import { NextSeasonModal } from '../NextSeasonModal';

type GameLayoutProps = PropsWithChildren<{
  studentTeams: StudentTeam[];
  opposingTeams: OpposingTeam[][];
  promotionVideos: string[];
  apiBaseUrl: string;
}>;

export const GamePageWrap = ({
  children,
  studentTeams,
  opposingTeams,
  promotionVideos,
  apiBaseUrl,
}: GameLayoutProps) => {
  const { showNextSeasonModal, setShowNextSeasonModal, dispatch, videoCache } =
    useGame();
  const { authorizedUser, setAuthorizedUser } = useAuth();
  const student = authorizedUser as Student;
  const { setIsLoading, setErrorMessage, setShowAppSpinner } = useAsyncState();

  const router = useRouter();

  const repeatSeason = async () => {
    setIsLoading(true);
    setShowAppSpinner(true);
    try {
      const resetSeasonRes = await postRepeatSeason(student, apiBaseUrl);
      setAuthorizedUser(resetSeasonRes.updatedStudent);
      dispatch({
        type: 'INIT_SEASON',
        payload: {
          student: resetSeasonRes.updatedStudent,
          studentTeams: studentTeams,
          opposingTeams: opposingTeams,
        },
      });
      setShowNextSeasonModal(false);
      setIsLoading(false);
      setShowAppSpinner(false);
      router.push('/game/home');
    } catch (error: any) {
      logger.error('GamePageWrap.repeatSeason:::: ', error);
      setIsLoading(false);
      setShowAppSpinner(false);
      setErrorMessage(
        'There was an unexpected error repeating season. Please try again.'
      );
    }
  };

  const acceptPromotion = async () => {
    setIsLoading(true);
    setShowAppSpinner(true);
    try {
      const prevLevel = +student.level;
      const nextSeasonRes =
        prevLevel === 3
          ? await postRepeatSeason(student, apiBaseUrl)
          : await postNextSeason(student, apiBaseUrl);
      setAuthorizedUser(nextSeasonRes.updatedStudent);
      dispatch({
        type: 'INIT_SEASON',
        payload: {
          student: nextSeasonRes.updatedStudent,
          studentTeams: studentTeams,
          opposingTeams: opposingTeams,
        },
      });
      setShowNextSeasonModal(false);
      updateVideoCache(
        nextSeasonRes.updatedStudent,
        opposingTeams,
        promotionVideos,
        videoCache
      );
      setIsLoading(false);
      setShowAppSpinner(false);
      router.push({
        pathname: '/game/home',
        query: { promotion: prevLevel },
      });
    } catch (error: any) {
      logger.error('GamePageWrap.acceptPromotion:::: ', error);
      setIsLoading(false);
      setShowAppSpinner(false);
      setErrorMessage(
        'There was an unexpected error accepting promotion. Please try again.'
      );
    }
  };

  useEffect(() => {
    if (!student) {
      return;
    }
    const pathSegments = router.pathname.split('/');
    const gamePage = pathSegments[pathSegments.length - 1] as GamePage;
    if (!(student.pagesVisited || []).includes(gamePage)) {
      (async () => {
        try {
          const updateStudentRes = await updateStudent(
            student._id,
            { pagesVisited: [...(student.pagesVisited || []), gamePage] },
            apiBaseUrl
          );
          setAuthorizedUser(updateStudentRes.updatedStudent);
        } catch (error: any) {
          logger.error('GamePageWrap.useEffect:::: ', error);
        }
      })();
    }
  }, [student]);

  return (
    <>
      {children}
      <Modal isVisible={showNextSeasonModal}>
        <NextSeasonModal
          student={student}
          onRepeatSeason={repeatSeason}
          onNextSeason={acceptPromotion}
        />
      </Modal>
    </>
  );
};
