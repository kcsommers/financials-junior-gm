import { useAuth } from '@statrookie/core/src/auth/context/auth-context';
import { Footer } from '@statrookie/core/src/components/Footer';
import { GamePageWrap } from '@statrookie/core/src/components/GamePageWrap';
import { Header } from '@statrookie/core/src/components/Header';
import { LoadingSpinner } from '@statrookie/core/src/components/LoadingSpinner';
import { Modal } from '@statrookie/core/src/components/Modal';
import { ProtectedRoute } from '@statrookie/core/src/components/ProtectedRoute';
import { SeasonCompleteModal } from '@statrookie/core/src/components/SeasonCompleteModal';
import TrophyIcon from '@statrookie/core/src/components/svg/trophy.svg';
import { GameProvider, useGame } from '@statrookie/core/src/game/game-context';
import { postNextSeason } from '@statrookie/core/src/game/season/next-season';
import { postResetSeason } from '@statrookie/core/src/game/season/reset-season';
import {
  Award,
  getSeasonAwards,
} from '@statrookie/core/src/game/season/season-awards';
import { Student } from '@statrookie/core/src/student/student.interface';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import FinancialsLogo from '../../components/svg/financials-logo-big.svg';
import { API_BASE_URL } from '../../constants/api-base-url';
import { opposingTeams } from '../../game/teams/opposing-teams';
import { studentTeams } from '../../game/teams/student-teams';

const TrophiesPage = () => {
  const { authorizedUser, setAuthorizedUser } = useAuth();
  const student = authorizedUser as Student;
  const { seasonState, dispatch, showNextSeasonModal } = useGame();
  const [showSeasonCompleteModal, setShowSeasonCompleteModal] = useState(
    seasonState.seasonComplete
  );
  const [selectedAward, setSelectedAward] = useState<Award>();

  const router = useRouter();

  useEffect(() => {
    if (seasonState.seasonComplete && !showNextSeasonModal) {
      setShowSeasonCompleteModal(true);
    }
  }, [seasonState.seasonComplete, showNextSeasonModal]);

  const trophyRows = useMemo<Award[][]>(() => {
    const rows = [3, 2, 1].map((level) => getSeasonAwards(student, level));
    return rows;
  }, [student]);

  const resetSeason = async () => {
    try {
      const resetSeasonRes = await postResetSeason(student, API_BASE_URL);
      setAuthorizedUser(resetSeasonRes.updatedStudent);
      dispatch({
        type: 'INIT_SEASON',
        payload: {
          student: resetSeasonRes.updatedStudent,
          studentTeams: studentTeams,
          opposingTeams: opposingTeams,
        },
      });
      router.push('/game/home');
    } catch (error: any) {
      // @TODO error handle
    }
  };

  const nextSeason = async () => {
    try {
      const resetSeasonRes = await postNextSeason(student, API_BASE_URL);
      setAuthorizedUser(resetSeasonRes.updatedStudent);
      dispatch({
        type: 'INIT_SEASON',
        payload: {
          student: resetSeasonRes.updatedStudent,
          studentTeams: studentTeams,
          opposingTeams: opposingTeams,
        },
      });
      router.push('/game/home');
    } catch (error: any) {
      // @TODO error handle
    }
  };

  const isPromoted =
    student?.awards &&
    student.awards[+student.level - 1] &&
    student.awards[+student.level - 1].thirdCup &&
    student.awards[+student.level - 1].savingsCup;

  return !student || !seasonState.studentTeam ? (
    <LoadingSpinner isFullPage={true} />
  ) : (
    <div className="flex flex-col h-full">
      <Header inverse={true}>
        <FinancialsLogo
          // @ts-ignore
          className="absolute left-1/2 top-2 -translate-x-1/2"
          width={175}
        />
      </Header>
      <div className="flex flex-col relative bg-neutral-200 rounded-md border-4 border-neutral-700 px-4 pb-4 flex-1 mt-4 mx-14">
        <div className="h-80 relative">
          <div className="absolute left-0 top-0 h-full w-full flex items-center justify-center">
            {seasonState.seasonComplete ? (
              <>
                <button
                  className="btn-secondary btn-small text-base mx-2"
                  onClick={resetSeason}
                >
                  Repeat Season
                </button>
                {isPromoted && (
                  <button
                    className="btn-secondary btn-small text-base mx-2"
                    onClick={nextSeason}
                  >
                    {+student.level === 3 ? 'Accept Award' : 'Accept Promotion'}
                  </button>
                )}
              </>
            ) : (
              <p className="text-primary text-xl">
                Tap a trophy to learn more about it!
              </p>
            )}
          </div>

          <div className="flex items-center h-full">
            {seasonState.studentTeam.getLogo()}
          </div>
        </div>
        <div className="flex-1 flex flex-col w-4/5 rounded-md border-[#4D3629] border-4 mx-auto">
          {trophyRows.map((row, i) => (
            <div
              key={`trophy-row-${i}`}
              className={classNames(
                'flex flex-1 border-b-[15px] border-[#4D3629] relative',
                {
                  'bg-white': +student.level >= 3 - i,
                  'bg-white/25': +student.level < 3 - i,
                }
              )}
            >
              <span className="absolute text-primary text-xl top-1/2 -translate-y-1/2 pr-4 left-0 -translate-x-full text-bold">
                Level {i + 3 - i * 2}
              </span>
              {row.map((award, i) => (
                <div
                  key={`${award.name}-${i}`}
                  className={classNames(
                    'flex-1 flex items-center justify-center'
                  )}
                >
                  <button
                    onClick={() => setSelectedAward(award)}
                    className={classNames('translate-y-2', {
                      'opacity-50': !award.studentReceived,
                    })}
                  >
                    {/* @ts-ignore */}
                    <TrophyIcon width="95px" />
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <Footer pageLinks={['team', 'season', 'budget']} />
      <Modal
        isVisible={showSeasonCompleteModal}
        onClose={() => setShowSeasonCompleteModal(false)}
      >
        <SeasonCompleteModal
          studentTeam={seasonState.studentTeam}
          onClose={() => setShowSeasonCompleteModal(false)}
        />
      </Modal>
      <Modal isVisible={!!selectedAward} onClose={() => setSelectedAward(null)}>
        <div className="h-full flex flex-col items-center justify-center">
          <h4 className="text-secondary-2 text-5xl">{selectedAward?.name}</h4>
          <div className="my-8">
            {/* @ts-ignore */}
            <TrophyIcon width="160px" />
          </div>
          <p className="text-primary text-3xl w-2/3 text-center font-light">
            {selectedAward?.description}
          </p>
        </div>
      </Modal>
    </div>
  );
};

const ProtectedSeasonPage = () => {
  return (
    <ProtectedRoute apiBaseUrl={API_BASE_URL} permittedRoles="*">
      <GamePageWrap
        studentTeams={studentTeams}
        opposingTeams={opposingTeams}
        apiBaseUrl={API_BASE_URL}
      >
        <TrophiesPage />
      </GamePageWrap>
    </ProtectedRoute>
  );
};

ProtectedSeasonPage.getLayout = function getLayout(page: any) {
  return (
    <GameProvider
      studentTeams={studentTeams}
      opposingTeams={opposingTeams}
      apiBaseUrl={API_BASE_URL}
    >
      {page}
    </GameProvider>
  );
};

export default ProtectedSeasonPage;
