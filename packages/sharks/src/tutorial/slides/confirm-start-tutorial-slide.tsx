import { TutorialSlide } from '@statrookie/core/src/tutorial/tutorial-slide';
import { v4 as uuid } from 'uuid';
import { mascotConfigs } from '../mascot-configs';

export const confirmStartTutorialSlide: TutorialSlide<any, any>[] = [
  {
    id: uuid(),
    textComponent: (
      <p className="text-4xl">Hey there! Would you like to watch a tutorial?</p>
    ),
    mascotConfig: mascotConfigs.sharkieSpeak,
  },
];
