import { GamePageWrap } from '@statrookie/core/src/components/GamePageWrap';
import { ProtectedRoute } from '@statrookie/core/src/components/ProtectedRoute';
import { GameProvider } from '@statrookie/core/src/game/game-context';
import { CoreHomePage } from '@statrookie/core/src/pages/game/home';
import { confirmStartTutorialSlide } from 'src/tutorial/slides/confirm-start-tutorial-slide';
import SharkieButton from '../../components/svg/sharkie-btn.svg';
import { API_BASE_URL } from '../../constants/api-base-url';
import { PROMOTION_VIDEOS } from '../../game/promotion-videos';
import { opposingTeams } from '../../game/opposing-teams';
import { studentTeams } from '../../game/student-teams';
import {
  homeSlides,
  seasonTransitionSlides,
  teamTransitionSlides,
} from '../../tutorial/slides/home-slides';

const HomePage = () => {
  return (
    <CoreHomePage
      apiBaseUrl={API_BASE_URL}
      studentTeams={studentTeams}
      opposingTeams={opposingTeams}
      promotionVideos={PROMOTION_VIDEOS}
      helpButtonIcon={<SharkieButton />}
      tutorialSlides={{
        main: homeSlides,
        confirmStart: confirmStartTutorialSlide,
        teamTransition: teamTransitionSlides,
        seasonTransition: seasonTransitionSlides,
      }}
    />
  );
};

const ProtectedHomePage = () => {
  return (
    <ProtectedRoute apiBaseUrl={API_BASE_URL} permittedRoles="*">
      <GamePageWrap
        studentTeams={studentTeams}
        opposingTeams={opposingTeams}
        promotionVideos={PROMOTION_VIDEOS}
        apiBaseUrl={API_BASE_URL}
      >
        <HomePage />
      </GamePageWrap>
    </ProtectedRoute>
  );
};

ProtectedHomePage.getLayout = function getLayout(page: any) {
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

export default ProtectedHomePage;
