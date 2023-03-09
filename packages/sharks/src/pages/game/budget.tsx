import { GamePageWrap } from '@statrookie/core/src/components/GamePageWrap';
import { ProtectedRoute } from '@statrookie/core/src/components/ProtectedRoute';
import { GameProvider } from '@statrookie/core/src/game/game-context';
import { CoreBudgetPage } from '@statrookie/core/src/pages/game/budget';
import { confirmStartTutorialSlide } from 'src/tutorial/slides/confirm-start-tutorial-slide';
import FinancialsLogo from '../../components/svg/financials-logo-big.svg';
import SharkieButton from '../../components/svg/sharkie-btn.svg';
import { API_BASE_URL } from '../../constants/api-base-url';
import { PROMOTION_VIDEOS } from '../../game/promotion-videos';
import { opposingTeams } from '../../game/opposing-teams';
import { studentTeams } from '../../game/student-teams';
import { budgetSlides } from '../../tutorial/slides/budget-slides';

const BudgetPage = () => {
  return (
    <CoreBudgetPage
      apiBaseUrl={API_BASE_URL}
      helpButtonIcon={<SharkieButton />}
      logo={
        <FinancialsLogo
          // @ts-ignore
          className="absolute left-1/2 top-2 -translate-x-1/2"
          width={175}
        />
      }
      tutorialSlides={{
        main: budgetSlides,
        confirmStart: confirmStartTutorialSlide,
      }}
    />
  );
};

const ProtectedBudgetPage = () => {
  return (
    <ProtectedRoute apiBaseUrl={API_BASE_URL} permittedRoles="*">
      <GamePageWrap
        studentTeams={studentTeams}
        opposingTeams={opposingTeams}
        promotionVideos={PROMOTION_VIDEOS}
        apiBaseUrl={API_BASE_URL}
      >
        <BudgetPage />
      </GamePageWrap>
    </ProtectedRoute>
  );
};

ProtectedBudgetPage.getLayout = function getLayout(page: any) {
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

export default ProtectedBudgetPage;
