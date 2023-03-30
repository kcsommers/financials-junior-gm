import { GamePageWrap } from '@statrookie/core/src/components/GamePageWrap';
import { ProtectedRoute } from '@statrookie/core/src/components/ProtectedRoute';
import { GameProvider } from '@statrookie/core/src/game/game-context';
import { CoreTeamPage } from '@statrookie/core/src/pages/game/team';
import FinancialsLogo from '../../components/svg/financials-logo-big.svg';
import SharkieButton from '../../components/svg/sharkie-btn.svg';
import { API_BASE_URL } from '../../constants/api-base-url';
import { PROMOTION_VIDEOS } from '../../game/promotion-videos';
import { opposingTeams } from '../../game/opposing-teams';
import { studentTeams } from '../../game/student-teams';
import { getTeamLogo } from '../../game/utils/get-team-logo';
import { validateProPlayer } from '../../game/utils/validate-pro-player';
import { confirmStartTutorialSlide } from '../../tutorial/slides/confirm-start-tutorial-slide';
import { teamSlides } from '../../tutorial/slides/team-slides';

const TeamPage = () => {
  return (
    <CoreTeamPage
      apiBaseUrl={API_BASE_URL}
      helpButtonIcon={<SharkieButton />}
      getTeamLogo={getTeamLogo}
      validateProPlayer={validateProPlayer}
      logo={
        <FinancialsLogo
          // @ts-ignore
          className="absolute left-1/2 top-2 -translate-x-1/2"
          width={175}
        />
      }
      tutorialSlides={{
        main: teamSlides,
        confirmStart: confirmStartTutorialSlide,
      }}
    />
  );
};

const ProtectedTeamPage = () => {
  return (
    <ProtectedRoute apiBaseUrl={API_BASE_URL} permittedRoles="*">
      <GamePageWrap
        studentTeams={studentTeams}
        opposingTeams={opposingTeams}
        promotionVideos={PROMOTION_VIDEOS}
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
      promotionVideos={PROMOTION_VIDEOS}
      apiBaseUrl={API_BASE_URL}
    >
      {page}
    </GameProvider>
  );
};

export default ProtectedTeamPage;
