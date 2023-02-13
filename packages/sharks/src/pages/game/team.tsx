import { useAuth } from '@statrookie/core/src/auth/context/auth-context';
import { Footer } from '@statrookie/core/src/components/Footer';
import { Header } from '@statrookie/core/src/components/Header';
import { LoadingSpinner } from '@statrookie/core/src/components/LoadingSpinner';
import { Modal } from '@statrookie/core/src/components/Modal';
import { ProtectedRoute } from '@statrookie/core/src/components/ProtectedRoute';
import { ReleasePlayerBoard } from '@statrookie/core/src/components/ReleasePlayerBoard';
import { SignPlayerBoard } from '@statrookie/core/src/components/SignPlayerBoard';
import { StickButton } from '@statrookie/core/src/components/StickButton';
import ScoutStick from '@statrookie/core/src/components/svg/scout-stick.svg';
import { TeamBoard } from '@statrookie/core/src/components/TeamBoard';
import { TeamBudgetState } from '@statrookie/core/src/components/TeamBudgetState';
import { GameProvider } from '@statrookie/core/src/game/game-context';
import {
  Player,
  PlayerAssignment,
} from '@statrookie/core/src/game/teams/players';
import { getStudentTeam } from '@statrookie/core/src/game/teams/utils/get-student-team';
import { Student } from '@statrookie/core/src/student/student.interface';
import { useState } from 'react';
import FinancialsLogo from '../../components/svg/financials-logo-big.svg';
import { API_BASE_URL } from '../../constants/api-base-url';
import { studentTeams } from '../../game/teams/student-teams';

const TeamPage = () => {
  const { authorizedUser, setAuthorizedUser } = useAuth();
  const student = authorizedUser as Student;
  const studentTeam = getStudentTeam(student, studentTeams);

  const [selectedAssignment, setSelectedAssignment] =
    useState<PlayerAssignment>();
  const [selectedPlayer, setSelectedPlayer] = useState<Player>();

  return !student ? (
    <LoadingSpinner />
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
            {`${studentTeam.city} ${studentTeam.nickName}`}
          </h2>
          <div className="flex items-center justify-between h-full">
            {studentTeam.logo}
            <div></div>
          </div>
        </div>

        <div className="flex">
          <div className="flex-75">
            <TeamBudgetState student={student} />
          </div>
          <div className="flex-1 pl-4">
            <TeamBoard
              student={student}
              studentTeam={studentTeam}
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
          setStudent={setAuthorizedUser}
          slotAssignment={selectedAssignment}
        />
      </Modal>
      <Modal
        isVisible={!!selectedPlayer}
        onClose={() => setSelectedPlayer(null)}
      >
        <ReleasePlayerBoard
          student={student}
          setStudent={setAuthorizedUser}
          player={selectedPlayer}
          apiBaseUrl={API_BASE_URL}
        />
      </Modal>
    </div>
  );
};

const ProtectedTeamPage = () => {
  return (
    <ProtectedRoute apiBaseUrl={API_BASE_URL} permittedRoles="*">
      <TeamPage />
    </ProtectedRoute>
  );
};

ProtectedTeamPage.getLayout = function getLayout(page: any) {
  return <GameProvider>{page}</GameProvider>;
};

export default ProtectedTeamPage;
