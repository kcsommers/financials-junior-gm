import { SeasonTutorialComponents } from '@statrookie/core/src/tutorial/component-configs/season-tutorial-components';
import { TutorialSlide } from '@statrookie/core/src/tutorial/tutorial-slide';
import { SharksThemeColors } from 'src/theme/theme-colors';
import { v4 as uuid } from 'uuid';
import { mascotConfigs } from '../mascot-configs';

export const seasonSlides: TutorialSlide<SeasonTutorialComponents>[] = [
  {
    id: uuid(),
    textComponent: (
      <p className="text-4xl">
        Welcome to the <span className="text-secondary-2">Season</span> page!
      </p>
    ),
    mascotConfig: mascotConfigs.sharkieSpeak,
  },
  {
    id: uuid(),
    textComponent: (
      <p className="text-4xl">
        During the season, your team will play against 12 other teams for
        trophies.
      </p>
    ),
    mascotConfig: mascotConfigs.sharkieSpeak,
  },
  {
    id: uuid(),
    textComponent: (
      <p className="text-4xl">
        The team with the most points at the end of the season wins 1st place.
      </p>
    ),
    mascotConfig: mascotConfigs.sharkieSpeak,
  },
  {
    id: uuid(),
    textComponent: (
      <p className="text-4xl">
        If your team wins a game, your team earns 2 points.
      </p>
    ),
    mascotConfig: mascotConfigs.sharkieSpeak,
  },
  {
    id: uuid(),
    textComponent: (
      <p className="text-4xl">
        If your team loses a game, you earn 0 points, unless they lose in
        overtime. Then you earn 1 point.
      </p>
    ),
    mascotConfig: mascotConfigs.sharkieSpeak,
  },
  {
    id: uuid(),
    textComponent: (
      <p className="text-4xl">
        You can see your team's wins, losses and points here on the jumbotron.
      </p>
    ),
    mascotConfig: {
      ...mascotConfigs.sharkieSpeak,
      animate: { x: '30%', y: '45%', scale: 0.75 },
    },
    componentConfigs: {
      statsBoard: {
        variants: {
          animate: {
            scale: 1.3,
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
        The standings box shows your team's standing in the season.
      </p>
    ),
    mascotConfig: {
      ...mascotConfigs.sharkieLean,
      animate: { x: '-30%', y: '45%', scale: 0.75 },
    },
    componentConfigs: {
      standingsBoard: {
        variants: {
          animate: {
            scale: 1.3,
            zIndex: 60,
            borderColor: `rgb(${SharksThemeColors.highlight.join(' ')})`,
          },
        },
      },
    },
  },
  {
    id: uuid(),
    textComponent: <p className="text-4xl">To start a game, press play.</p>,
    mascotConfig: {
      ...mascotConfigs.sharkieLean,
      animate: { x: '-30%', y: '-15%', scale: 0.75 },
    },
    componentConfigs: {
      gameButton: {
        variants: {
          animate: {
            scale: 1.3,
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
        At the end of the season, you can see all of the trophies you won on the
        trophy page.
      </p>
    ),
    mascotConfig: mascotConfigs.sharkieSpeak,
  },
  {
    id: uuid(),
    textComponent: (
      <p className="text-4xl">
        If you finish in the top 3 and have savings left at the end of the
        season, you will be promoted!
      </p>
    ),
    mascotConfig: mascotConfigs.sharkieSpeak,
  },
  {
    id: uuid(),
    textComponent: (
      <p className="text-4xl">
        If you need more information about the season, click on the ask S.J.
        Sharkie button.
      </p>
    ),
    mascotConfig: mascotConfigs.sharkieSpeak,
  },
];
