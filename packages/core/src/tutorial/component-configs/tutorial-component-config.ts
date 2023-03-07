import { Transition, Variant } from 'framer-motion';

export type TutorialComponentConfig<V = {}> = {
  variants: {
    animate: Variant & V;
  };
  transition?: Transition;
};

export type TutorialComponentConfigs<V> = {
  [componentName: string]: TutorialComponentConfig<V>;
};
