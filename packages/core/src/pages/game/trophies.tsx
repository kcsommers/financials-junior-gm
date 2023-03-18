import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../auth/context/auth-context';
import { logger } from '../../auth/utils/logger';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { Modal } from '../../components/Modal';
import { SeasonCompleteModal } from '../../components/SeasonCompleteModal';
import TrophyIcon from '../../components/svg/trophy.svg';
import { useGame } from '../../game/game-context';
import { postNextSeason } from '../../game/season/next-season';
import { postRepeatSeason } from '../../game/season/repeat-season';
import { Award, getSeasonAwards } from '../../game/season/season-awards';
import { updateVideoCache } from '../../game/update-video-cache';
import { Student } from '../../student/student.interface';
import { useAsyncState } from '../../utils/context/async-state.context';
import { GamePageProps } from './game-page-props';

export const CoreTrophiesPage = ({
  apiBaseUrl,
  promotionVideos,
  opposingTeams,
  studentTeams,
  logo,
}: GamePageProps) => {
  const { authorizedUser, setAuthorizedUser } = useAuth();
  const student = authorizedUser as Student;
  const { seasonState, dispatch, showNextSeasonModal, videoCache } = useGame();
  const [showSeasonCompleteModal, setShowSeasonCompleteModal] = useState(
    seasonState?.seasonComplete
  );
  const [selectedAward, setSelectedAward] = useState<Award>();
  const { setIsLoading, setShowAppSpinner, setErrorMessage } = useAsyncState();

  const router = useRouter();

  useEffect(() => {
    if (seasonState?.seasonComplete && !showNextSeasonModal) {
      setShowSeasonCompleteModal(true);
    }
  }, [seasonState?.seasonComplete, showNextSeasonModal]);

  const trophyRows = useMemo<Award[][]>(() => {
    const rows = [3, 2, 1].map((level) => getSeasonAwards(student, level));
    return rows;
  }, [student]);

  const repeatSeason = async () => {
    setIsLoading(true);
    setShowAppSpinner(true);
    try {
      const repeatSeasonRes = await postRepeatSeason(student, apiBaseUrl);
      setAuthorizedUser(repeatSeasonRes.updatedStudent);
      dispatch({
        type: 'INIT_SEASON',
        payload: {
          student: repeatSeasonRes.updatedStudent,
          studentTeams: studentTeams,
          opposingTeams: opposingTeams,
        },
      });
      setIsLoading(false);
      setShowAppSpinner(false);
      router.push('/game/home');
    } catch (error: any) {
      logger.error('CoreThrophiesPage.repeatSeason:::: ', error);
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
      logger.error('CoreThrophiesPage.acceptPromotion:::: ', error);
      setIsLoading(false);
      setShowAppSpinner(false);
      setErrorMessage(
        'There was an unexpected error accepting promotion. Please try again.'
      );
    }
  };

  const isPromoted =
    student?.awards &&
    student.awards[+student.level - 1] &&
    student.awards[+student.level - 1].thirdCup &&
    student.awards[+student.level - 1].savingsCup;

  return !student || !seasonState?.studentTeam ? (
    <LoadingSpinner isFullPage={true} />
  ) : (
    <div className="flex flex-col h-full">
      <Header inverse={true}>{logo}</Header>
      <div className="flex flex-col relative bg-neutral-200 rounded-md border-4 border-neutral-700 px-4 pb-4 flex-1 mt-4 mx-14">
        <div className="h-80 relative">
          <div className="absolute left-0 top-0 h-full w-full flex items-center justify-center">
            {seasonState?.seasonComplete ? (
              <>
                <button
                  className="btn-secondary btn-small text-base mx-2"
                  onClick={repeatSeason}
                >
                  Repeat Season
                </button>
                {isPromoted && (
                  <button
                    className="btn-secondary btn-small text-base mx-2"
                    onClick={acceptPromotion}
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
            {seasonState?.studentTeam.getLogo()}
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
          studentTeam={seasonState?.studentTeam}
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
