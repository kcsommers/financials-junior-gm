import { useAuth } from '@statrookie/core/src/auth/context/auth-context';
import { Footer } from '@statrookie/core/src/components/Footer';
import { GamePageWrap } from '@statrookie/core/src/components/GamePageWrap';
import { Header } from '@statrookie/core/src/components/Header';
import { LoadingSpinner } from '@statrookie/core/src/components/LoadingSpinner';
import { Modal } from '@statrookie/core/src/components/Modal';
import { ProtectedRoute } from '@statrookie/core/src/components/ProtectedRoute';
import { ReleasePlayerBoard } from '@statrookie/core/src/components/ReleasePlayerBoard';
import { SignPlayerBoard } from '@statrookie/core/src/components/SignPlayerBoard';
import { StickButton } from '@statrookie/core/src/components/StickButton';
import Binoculars from '@statrookie/core/src/components/svg/binoculars.svg';
import ScoutStick from '@statrookie/core/src/components/svg/scout-stick.svg';
import { TeamBoard } from '@statrookie/core/src/components/TeamBoard';
import { TeamBudgetState } from '@statrookie/core/src/components/TeamBudgetState';
import { GameProvider, useGame } from '@statrookie/core/src/game/game-context';
import { checkTeamObjective } from '@statrookie/core/src/game/objectives/check-team-objective';
import {
  Player,
  PlayerAssignment,
} from '@statrookie/core/src/game/teams/players';
import { Student } from '@statrookie/core/src/student/student.interface';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import FinancialsLogo from '../../components/svg/financials-logo-big.svg';
import { API_BASE_URL } from '../../constants/api-base-url';
import { opposingTeams } from '../../game/teams/opposing-teams';
import { studentTeams } from '../../game/teams/student-teams';

const TeamPage = () => {
  const { authorizedUser, setAuthorizedUser } = useAuth();
  const { seasonState, dispatch } = useGame();
  const student = authorizedUser as Student;
  const router = useRouter();
  const [showScoutCompleteModal, setShowScoutCompleteModal] = useState(false);

  const [selectedAssignment, setSelectedAssignment] =
    useState<PlayerAssignment>();
  const [selectedPlayer, setSelectedPlayer] = useState<Player>();

  useEffect(() => {
    const scoutParam = router.query?.scoutingComplete;
    if (scoutParam === 'true') {
      setShowScoutCompleteModal(true);
    }
  }, []);

  useEffect(() => {
    (async () => {
      const checkTeamObjectiveRes = await checkTeamObjective(
        student,
        API_BASE_URL
      );
      if (checkTeamObjectiveRes) {
        setAuthorizedUser(checkTeamObjectiveRes.updatedStudent);
      }
    })();
  }, [student]);

  const onMarketAction = (student: Student, completedScenario = false) => {
    setAuthorizedUser(student);
    const payload: any = {
      student,
    };
    if (completedScenario) {
      payload.injuredPlayer = null;
    }
    dispatch({ type: 'MARKET_ACTION', payload });
  };

  return !student || !seasonState.studentTeam ? (
    <LoadingSpinner isFullPage={true} />
  ) : (
    <div className="flex flex-col h-full">
      <Header>
        <FinancialsLogo
          // @ts-ignore
          className="absolute left-1/2 top-2 -translate-x-1/2"
          width={175}
        />
      </Header>
      <div className="relative bg-neutral-200 rounded-md border-4 border-neutral-700 px-4 pb-4 flex-1 mt-4 mx-14">
        <div className="h-80 relative">
          <h2 className="text-primary text-4xl font-bold absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
            {`${seasonState.studentTeam.city} ${seasonState.studentTeam.name}`}
          </h2>
          <div className="flex items-center justify-between h-full">
            {seasonState.studentTeam.getLogo()}
            <div></div>
          </div>
        </div>

        <div className="flex">
          <div className="flex-75">
            <TeamBudgetState
              student={student}
              studentTeam={seasonState.studentTeam}
            />
          </div>
          <div className="flex-1 pl-4">
            <TeamBoard
              student={student}
              studentTeam={seasonState.studentTeam}
              onPlayerSelected={setSelectedPlayer}
              onAddPlayer={setSelectedAssignment}
            />
          </div>
        </div>

        <div className="absolute bottom-2" style={{ left: '-42px' }}>
          <StickButton
            size="small"
            href="/game/scout"
            // isDisabled={scoutingState.isComplete}
          >
            <ScoutStick />
          </StickButton>
        </div>
      </div>

      <Footer pageLinks={['season', 'budget', 'trophies']} />
      <Modal
        isVisible={!!selectedAssignment}
        onClose={() => setSelectedAssignment(null)}
      >
        <SignPlayerBoard
          apiBaseUrl={API_BASE_URL}
          student={student}
          studentTeam={seasonState.studentTeam}
          onPlayerSigned={onMarketAction}
          slotAssignment={selectedAssignment}
        />
      </Modal>
      <Modal
        isVisible={!!selectedPlayer}
        onClose={() => setSelectedPlayer(null)}
      >
        <ReleasePlayerBoard
          student={student}
          studentTeam={seasonState.studentTeam}
          onPlayerReleased={onMarketAction}
          player={selectedPlayer}
          apiBaseUrl={API_BASE_URL}
        />
      </Modal>
      <Modal
        isVisible={showScoutCompleteModal}
        onClose={() => {
          setShowScoutCompleteModal(false);
          router.push({ query: '' });
        }}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <h3 className="text-primary text-5xl">Nice job Scouting!</h3>
          <div className="my-8">
            <Binoculars />
          </div>
          <p className="text-primary text-4xl">
            The players you scouted can now be signed!
          </p>
        </div>
      </Modal>
    </div>
  );
};

const ProtectedTeamPage = () => {
  return (
    <ProtectedRoute apiBaseUrl={API_BASE_URL} permittedRoles="*">
      <GamePageWrap
        studentTeams={studentTeams}
        opposingTeams={opposingTeams}
        apiBaseUrl={API_BASE_URL}
      >
        <TeamPage />
      </GamePageWrap>
    </ProtectedRoute>
  );
};

ProtectedTeamPage.getLayout = function getLayout(page: any) {
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

export default ProtectedTeamPage;
