import { Variant } from 'framer-motion';
import { CSSProperties, ReactElement } from 'react';

export type MascotConfig = {
  mascotComponent: ReactElement;
  animate: Variant;
  mascotStyles?: CSSProperties;
  isInverse?: boolean;
};
