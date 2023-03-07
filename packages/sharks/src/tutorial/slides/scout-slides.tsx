import { ScoutTutorialComponents } from '@statrookie/core/src/tutorial/component-configs/scout-tutorial-components';
import { TutorialSlide } from '@statrookie/core/src/tutorial/tutorial-slide';
import { SharksThemeColors } from 'src/theme/theme-colors';
import { v4 as uuid } from 'uuid';
import { mascotConfigs } from '../mascot-configs';

export const scoutSlides: TutorialSlide<ScoutTutorialComponents>[] = [
  {
    id: uuid(),
    textComponent: <p className="text-4xl">Welcome to the Scouting page!</p>,
    mascotConfig: mascotConfigs.sharkiePlay,
  },
  {
    id: uuid(),
    textComponent: (
      <p className="text-4xl">
        These are the players you will sign if you ever need to replace a
        starting player on your team.
      </p>
    ),
    mascotConfig: {
      ...mascotConfigs.sharkieSpeak,
      animate: {
        scale: 0.75,
        x: '30%',
        y: '15%',
      },
    },
    componentConfigs: {
      playerBoard: {
        variants: {
          animate: {
            scale: 1.1,
            zIndex: 60,
            borderColor: `rgb(${SharksThemeColors.highlight.join(' ')})`,
          },
        },
      },
    },
  },
  {
    id: uuid(),
    textComponent: (
      <p className="text-4xl">
        They don't have a contract value yet. So you have to decide how much you
        want to offer these players.
      </p>
    ),
    mascotConfig: {
      ...mascotConfigs.sharkieSpeak,
      animate: {
        scale: 0.75,
        x: '30%',
        y: '15%',
      },
    },
    componentConfigs: {
      playerBoard: {
        variants: {
          animate: {
            scale: 1.1,
            zIndex: 60,
            borderColor: `rgb(${SharksThemeColors.highlight.join(' ')})`,
          },
        },
      },
    },
  },
  {
    id: uuid(),
    textComponent: (
      <p className="text-4xl">There are 3 levels of contract values.</p>
    ),
    mascotConfig: {
      ...mascotConfigs.sharkieLean,
      animate: {
        scale: 0.75,
        x: '-30%',
        y: '35%',
      },
    },
    componentConfigs: {
      moneyLevel1: {
        variants: {
          animate: {
            scale: 1.1,
            zIndex: 60,
            borderColor: `rgb(${SharksThemeColors.highlight.join(' ')})`,
          },
        },
      },
    },
  },
  {
    id: uuid(),
    textComponent: (
      <p className="text-4xl">Each level has a different dollar amount.</p>
    ),
    mascotConfig: {
      ...mascotConfigs.sharkieLean,
      animate: {
        scale: 0.75,
        x: '-30%',
        y: '35%',
      },
    },
    componentConfigs: {
      moneyLevel1: {
        variants: {
          animate: {
            zIndex: 60,
          },
        },
      },
      moneyLevel2: {
        variants: {
          animate: {
            scale: 1.1,
            zIndex: 60,
            borderColor: `rgb(${SharksThemeColors.highlight.join(' ')})`,
          },
        },
      },
    },
  },
  {
    id: uuid(),
    textComponent: (
      <p className="text-4xl">
        Players will be offered the dollar amount of the level they are placed
        in.
      </p>
    ),
    mascotConfig: {
      ...mascotConfigs.sharkieLean,
      animate: {
        scale: 0.75,
        x: '-30%',
        y: '35%',
      },
    },
    componentConfigs: {
      moneyLevel1: {
        variants: {
          animate: {
            zIndex: 60,
          },
        },
      },
      moneyLevel2: {
        variants: {
          animate: {
            zIndex: 60,
          },
        },
      },
      moneyLevel3: {
        variants: {
          animate: {
            scale: 1.1,
            zIndex: 60,
            borderColor: `rgb(${SharksThemeColors.highlight.join(' ')})`,
          },
        },
      },
    },
  },
  {
    id: uuid(),
    textComponent: (
      <p className="text-4xl">
        Drag them into the level you choose and be sure to fill all six spots.
      </p>
    ),
    mascotConfig: {
      ...mascotConfigs.sharkieLean,
      animate: {
        scale: 0.75,
        x: '-30%',
        y: '35%',
      },
    },
    componentConfigs: {
      moneyLevel1: {
        variants: {
          animate: {
            zIndex: 60,
          },
        },
      },
      moneyLevel2: {
        variants: {
          animate: {
            zIndex: 60,
          },
        },
      },
      moneyLevel3: {
        variants: {
          animate: {
            zIndex: 60,
          },
        },
      },
    },
  },
  {
    id: uuid(),
    textComponent: (
      <p className="text-4xl">
        You can only scout players once every season, so pick the players who
        fit your team the best.
      </p>
    ),
    mascotConfig: mascotConfigs.sharkieSpeakInverse,
  },
  {
    id: uuid(),
    textComponent: (
      <p className="text-3xl">
        If you need help deciding which players to pick or want to know how to
        sign these players, click on the call S.J. Sharkie button.
      </p>
    ),
    mascotConfig: mascotConfigs.sharkieSpeakInverse,
  },
  {
    id: uuid(),
    textComponent: (
      <p className="text-4xl">Click here when you are finished.</p>
    ),
    mascotConfig: {
      ...mascotConfigs.sharkieSpeakInverse,
      animate: {
        x: '7%',
        y: '-5%',
      },
    },
    componentConfigs: {
      finishedBtn: {
        variants: {
          animate: {
            scale: 1.1,
            zIndex: 60,
          },
        },
      },
    },
  },
];
