import { ReactElement } from 'react';
import { TutorialComponentConfigs } from './component-configs/tutorial-component-config';
import { MascotConfig } from './mascot-config';

export type TutorialSlideEvent<EventNames, Payload> = {
  name: EventNames;
  payload?: Payload;
};

export type TutorialSlide<
  ComponentConfigs = TutorialComponentConfigs<{}>,
  SlideEvents = TutorialSlideEvent<string, {}>
> = {
  textComponent: ReactElement;
  mascotConfig: MascotConfig;
  componentConfigs?: ComponentConfigs;
  id: string;
  slideEvent?: SlideEvents;
  canAdvanceSlide?: (...args: any[]) => boolean;
};
