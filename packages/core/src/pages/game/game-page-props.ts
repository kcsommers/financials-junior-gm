import { ReactElement } from 'react';
import { OpposingTeam } from '../../game/teams/opposing-team.type';
import { StudentTeam } from '../../game/teams/student-team.type';
import { TutorialSlide } from '../../tutorial/tutorial-slide';

export type GamePageProps = {
  apiBaseUrl: string;
  helpButtonIcon?: ReactElement;
  tutorialSlides?: {
    main: TutorialSlide<any, any>[];
    confirmStart: TutorialSlide<any, any>[];
  };
  promotionVideos?: string[];
  opposingTeams?: OpposingTeam[][];
  studentTeams?: StudentTeam[];
  logo?: ReactElement;
};
