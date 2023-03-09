import { GamePageWrap } from '@statrookie/core/src/components/GamePageWrap';
import { ProtectedRoute } from '@statrookie/core/src/components/ProtectedRoute';
import { GameProvider } from '@statrookie/core/src/game/game-context';
import { CoreTrophiesPage } from '@statrookie/core/src/pages/game/trophies';
import FinancialsLogo from '../../components/svg/financials-logo-big.svg';
import { API_BASE_URL } from '../../constants/api-base-url';
import { PROMOTION_VIDEOS } from '../../game/promotion-videos';
import { opposingTeams } from '../../game/opposing-teams';
import { studentTeams } from '../../game/student-teams';

const TrophiesPage = () => {
  return (
    <CoreTrophiesPage
      apiBaseUrl={API_BASE_URL}
      studentTeams={studentTeams}
      opposingTeams={opposingTeams}
      promotionVideos={PROMOTION_VIDEOS}
      logo={
        <FinancialsLogo
          // @ts-ignore
          className="absolute left-1/2 top-2 -translate-x-1/2"
          width={175}
        />
      }
    />
  );
};

const ProtectedSeasonPage = () => {
  return (
    <ProtectedRoute apiBaseUrl={API_BASE_URL} permittedRoles="*">
      <GamePageWrap
        studentTeams={studentTeams}
        opposingTeams={opposingTeams}
        promotionVideos={PROMOTION_VIDEOS}
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
      promotionVideos={PROMOTION_VIDEOS}
      apiBaseUrl={API_BASE_URL}
    >
      {page}
    </GameProvider>
  );
};

export default ProtectedSeasonPage;
