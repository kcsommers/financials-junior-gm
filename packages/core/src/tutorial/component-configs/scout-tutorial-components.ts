import { TutorialComponentConfig } from './tutorial-component-config';

export type ScoutTutorialComponents = Partial<{
  playerBoard: TutorialComponentConfig<{
    scale: number;
    borderColor: string;
    zIndex: number;
  }>;
  moneyLevel1: TutorialComponentConfig<{
    scale?: number;
    borderColor?: string;
    zIndex: number;
  }>;
  moneyLevel2: TutorialComponentConfig<{
    scale?: number;
    borderColor?: string;
    zIndex: number;
  }>;
  moneyLevel3: TutorialComponentConfig<{
    scale?: number;
    borderColor?: string;
    zIndex: number;
  }>;
  finishedBtn: TutorialComponentConfig<{
    scale: number;
    zIndex: number;
  }>;
}>;
