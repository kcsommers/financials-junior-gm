import { Budget } from '@statrookie/core/src/game/budget/budget';
import { BudgetTutorialComponents } from '@statrookie/core/src/tutorial/component-configs/budget-tutorial-components';
import { TutorialSlide } from '@statrookie/core/src/tutorial/tutorial-slide';
import { v4 as uuid } from 'uuid';
import { SharksThemeColors } from '../../theme/theme-colors';
import { mascotConfigs } from '../mascot-configs';

export const budgetSlides: TutorialSlide<BudgetTutorialComponents>[] = [
  {
    id: uuid(),
    textComponent: (
      <p className="text-4xl">
        Welcome to your <span className="text-secondary-2">Budget!</span>
      </p>
    ),
    mascotConfig: mascotConfigs.sharkieSpeak,
  },
  {
    id: uuid(),
    textComponent: (
      <p className="text-4xl">
        In hockey, every team has some money to spend on players.
      </p>
    ),
    mascotConfig: mascotConfigs.sharkieSpeak,
  },
  {
    id: uuid(),
    textComponent: (
      <p className="text-4xl">
        You have to make a plan on how to spend your money. This plan is called
        a budget
      </p>
    ),
    mascotConfig: mascotConfigs.sharkieSpeak,
  },
  {
    id: uuid(),
    textComponent: (
      <p className="text-4xl">
        This is your{' '}
        <span className="text-secondary-2 text-5xl">total budget</span>.
      </p>
    ),
    mascotConfig: {
      ...mascotConfigs.sharkieSpeak,
      animate: {
        y: '50%',
        x: '0%',
      },
    },
    componentConfigs: {
      budgetEquation: {
        variants: {
          animate: {
            scale: 1.2,
            zIndex: 60,
          },
        },
      },
      totalBudget: {
        variants: {
          animate: {
            scale: 1.2,
            color: `rgb(${SharksThemeColors.highlight.join(' ')})`,
          },
        },
      },
    },
  },
  {
    id: uuid(),
    textComponent: (
      <p className="text-4xl">
        Your total budget is the money you have to make your budget.
      </p>
    ),
    mascotConfig: {
      ...mascotConfigs.sharkieSpeak,
      animate: {
        y: '50%',
        x: '0%',
      },
    },
    componentConfigs: {
      budgetEquation: {
        variants: {
          animate: {
            scale: 1.2,
            zIndex: 60,
          },
        },
      },
      totalBudget: {
        variants: {
          animate: {
            scale: 1.2,
            color: `rgb(${SharksThemeColors.highlight.join(' ')})`,
          },
        },
      },
    },
  },
  {
    id: uuid(),
    textComponent: <p className="text-4xl">This is your savings.</p>,
    mascotConfig: {
      ...mascotConfigs.sharkieSpeak,
      animate: {
        y: '50%',
        x: '0%',
      },
    },
    componentConfigs: {
      budgetEquation: {
        variants: {
          animate: {
            scale: 1.2,
            zIndex: 60,
          },
        },
      },
      savingsBudget: {
        variants: {
          animate: {
            scale: 1.2,
            color: `rgb(${SharksThemeColors.highlight.join(' ')})`,
          },
        },
      },
    },
  },
  {
    id: uuid(),
    textComponent: (
      <p className="text-4xl">
        Your savings are used for emergencies like an injured player or to save
        up to sign a really good player.
      </p>
    ),
    mascotConfig: {
      ...mascotConfigs.sharkieSpeak,
      animate: {
        y: '50%',
        x: '0%',
      },
    },
    componentConfigs: {
      budgetEquation: {
        variants: {
          animate: {
            scale: 1.2,
            zIndex: 60,
          },
        },
      },
      savingsBudget: {
        variants: {
          animate: {
            scale: 1.2,
            color: `rgb(${SharksThemeColors.highlight.join(' ')})`,
          },
        },
      },
    },
  },
  {
    id: uuid(),
    textComponent: (
      <p className="text-4xl">
        What's left is your spending budget. It is the money you have to sign
        players.
      </p>
    ),
    mascotConfig: {
      ...mascotConfigs.sharkieSpeak,
      animate: {
        y: '50%',
        x: '0%',
      },
    },
    componentConfigs: {
      budgetEquation: {
        variants: {
          animate: {
            scale: 1.2,
            zIndex: 60,
          },
        },
      },
      spendingBudget: {
        variants: {
          animate: {
            scale: 1.2,
            color: `rgb(${SharksThemeColors.highlight.join(' ')})`,
          },
        },
      },
    },
  },
  {
    id: uuid(),
    canAdvanceSlide: (budget: Budget) => {
      return budget.spendingBudget === 14;
    },
    textComponent: (
      <p className="text-4xl">
        Move the yellow puck to the right, so you have $14 to spend on signing
        players.
      </p>
    ),
    mascotConfig: {
      ...mascotConfigs.sharkieSpeakInverse,
      mascotStyles: {
        ...mascotConfigs.sharkieSpeakInverse.mascotStyles,
        right: '85%',
      },
      animate: {
        y: '0%',
        x: '-40%',
        scale: 0.75,
      },
    },
    componentConfigs: {
      budgetEquation: {
        variants: {
          animate: {
            scale: 1,
            zIndex: 60,
          },
        },
      },
      budgetSlider: {
        variants: {
          animate: {
            scale: 1.1,
            zIndex: 60,
          },
        },
      },
    },
  },
  {
    id: uuid(),
    canAdvanceSlide: (budget: Budget) => {
      return budget.savingsBudget === 3;
    },
    textComponent: (
      <p className="text-3xl">
        Good job! Now move the yellow puck to the left so you have $3 in savings
        for signing extra players, in case you lose a few players.
      </p>
    ),
    mascotConfig: {
      ...mascotConfigs.sharkieSpeakInverse,
      mascotStyles: {
        ...mascotConfigs.sharkieSpeakInverse.mascotStyles,
        right: '85%',
      },
      animate: {
        y: '0%',
        x: '-40%',
        scale: 0.75,
      },
    },
    componentConfigs: {
      budgetEquation: {
        variants: {
          animate: {
            scale: 1,
            zIndex: 60,
          },
        },
      },
      budgetSlider: {
        variants: {
          animate: {
            scale: 1.1,
            zIndex: 60,
          },
        },
      },
    },
  },
  {
    id: uuid(),
    canAdvanceSlide: (budget: Budget) => {
      return budget.savingsBudget === 4;
    },
    textComponent: (
      <p className="text-3xl">
        Awesome! Now move the puck to the left so you have one extra dollar to
        save for the next season to add to your total budget. You should have $4
        of savings.
      </p>
    ),
    mascotConfig: {
      ...mascotConfigs.sharkieSpeakInverse,
      mascotStyles: {
        ...mascotConfigs.sharkieSpeakInverse.mascotStyles,
        right: '85%',
      },
      animate: {
        y: '0%',
        x: '-40%',
        scale: 0.75,
      },
    },
    componentConfigs: {
      budgetEquation: {
        variants: {
          animate: {
            scale: 1,
            zIndex: 60,
          },
        },
      },
      budgetSlider: {
        variants: {
          animate: {
            scale: 1.1,
            zIndex: 60,
          },
        },
      },
    },
  },
  {
    id: uuid(),
    textComponent: (
      <p className="text-3xl">
        You just made your first budget! If you have any more questions about
        your budget, click on the call S.J. Sharkie button.
      </p>
    ),
    mascotConfig: mascotConfigs.sharkieSpeak,
  },
  {
    id: uuid(),
    textComponent: (
      <p className="text-4xl">
        Click on the blue hockey stick when you are done exploring the budget
        page.
      </p>
    ),
    mascotConfig: mascotConfigs.sharkieSpeak,
  },
];
