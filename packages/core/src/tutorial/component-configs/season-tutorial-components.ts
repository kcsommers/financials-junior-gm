import { TutorialComponentConfig } from './tutorial-component-config';

export type SeasonTutorialComponents = Partial<{
  statsBoard: TutorialComponentConfig<{
    scale: number;
    zIndex: number;
    borderColor: string;
  }>;
  standingsBoard: TutorialComponentConfig<{
    scale: number;
    zIndex: number;
    borderColor: string;
  }>;
  gameButton: TutorialComponentConfig<{ scale: number; zIndex: number }>;
}>;
