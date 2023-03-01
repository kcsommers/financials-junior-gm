import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect } from 'react';
import { useAuth } from '../../auth';
import { useGame } from '../../game/game-context';
import { GamePage } from '../../game/game-page.type';
import { postNextSeason } from '../../game/season/next-season';
import { postRepeatSeason as postRepeatSeason } from '@statrookie/core/src/game/season/repeat-season';
import { OpposingTeam } from '../../game/teams/opposing-team.type';
import { StudentTeam } from '../../game/teams/student-team.type';
import { Student } from '../../student/student.interface';
import { updateStudent } from '../../student/update-student';
import { Modal } from '../Modal';
import { NextSeasonModal } from '../NextSeasonModal';

type GameLayoutProps = PropsWithChildren<{
  studentTeams: StudentTeam[];
  opposingTeams: OpposingTeam[][];
  apiBaseUrl: string;
}>;

export const GamePageWrap = ({
  children,
  studentTeams,
  opposingTeams,
  apiBaseUrl,
}: GameLayoutProps) => {
  const { showNextSeasonModal, setShowNextSeasonModal, dispatch } = useGame();
  const { authorizedUser, setAuthorizedUser } = useAuth();
  const student = authorizedUser as Student;

  const router = useRouter();

  const repeatSeason = async () => {
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
      router.push('/game/home');
    } catch (error: any) {
      // @TODO error handle
    }
  };

  const acceptPromotion = async () => {
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
      router.push({
        pathname: '/game/home',
        query: { promotion: prevLevel },
      });
    } catch (error: any) {
      // @TODO error handle
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
          // @TODO error handle
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
