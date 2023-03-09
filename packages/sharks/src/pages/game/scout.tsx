import { GamePageWrap } from '@statrookie/core/src/components/GamePageWrap';
import { PlayerCard } from '@statrookie/core/src/components/PlayerCard';
import { ProtectedRoute } from '@statrookie/core/src/components/ProtectedRoute';
import { GameProvider } from '@statrookie/core/src/game/game-context';
import { CoreScoutPage } from '@statrookie/core/src/pages/game/scout';
import { DndProvider } from 'react-dnd';
import { Preview } from 'react-dnd-preview';
import { TouchBackend } from 'react-dnd-touch-backend';
import FinancialsLogo from '../../components/svg/financials-logo-big.svg';
import SharkieButton from '../../components/svg/sharkie-btn.svg';
import { API_BASE_URL } from '../../constants/api-base-url';
import { PROMOTION_VIDEOS } from '../../game/promotion-videos';
import { opposingTeams } from '../../game/opposing-teams';
import { studentTeams } from '../../game/student-teams';
import { getTeamLogo } from '../../game/utils/get-team-logo';
import { validateProPlayer } from '../../game/utils/validate-pro-player';
import { confirmStartTutorialSlide } from '../../tutorial/slides/confirm-start-tutorial-slide';
import { scoutSlides } from '../../tutorial/slides/scout-slides';

const ScoutPage = () => {
  return (
    <CoreScoutPage
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
        main: scoutSlides,
        confirmStart: confirmStartTutorialSlide,
      }}
    />
  );
};

const ProtectedScoutPage = () => {
  return (
    <ProtectedRoute apiBaseUrl={API_BASE_URL} permittedRoles="*">
      <GamePageWrap
        studentTeams={studentTeams}
        opposingTeams={opposingTeams}
        promotionVideos={PROMOTION_VIDEOS}
        apiBaseUrl={API_BASE_URL}
      >
        <ScoutPage />
      </GamePageWrap>
    </ProtectedRoute>
  );
};

const generatePreview = ({ itemType, item, style }) => {
  return (
    <div style={style}>
      <PlayerCard
        player={item.player}
        isProPlayer={validateProPlayer(item.player)}
        getTeamLogo={getTeamLogo}
      />
    </div>
  );
};

ProtectedScoutPage.getLayout = function getLayout(page: any) {
  return (
    <GameProvider
      studentTeams={studentTeams}
      opposingTeams={opposingTeams}
      promotionVideos={PROMOTION_VIDEOS}
      apiBaseUrl={API_BASE_URL}
    >
      <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
        {page}
        <Preview>{generatePreview}</Preview>
      </DndProvider>
    </GameProvider>
  );
};

export default ProtectedScoutPage;
