import { TutorialComponentConfig } from './tutorial-component-config';

export type BudgetTutorialComponents = Partial<{
  budgetEquation: TutorialComponentConfig<{
    scale: number;
    zIndex: number;
  }>;
  totalBudget: TutorialComponentConfig<{ scale: number; color: string }>;
  savingsBudget: TutorialComponentConfig<{ scale: number; color: string }>;
  spendingBudget: TutorialComponentConfig<{ scale: number; color: string }>;
  budgetSlider: TutorialComponentConfig<{
    scale: number;
    zIndex: number;
  }>;
}>;
