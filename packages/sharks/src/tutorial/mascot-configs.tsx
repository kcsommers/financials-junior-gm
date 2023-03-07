// @ts-nocheck
import { MascotConfig } from '@statrookie/core/src/tutorial/mascot-config';
import SharkieLean from '../components/svg/sharkie-lean.svg';
import SharkiePlay from '../components/svg/sharkie-play.svg';
import SharkiePresent from '../components/svg/sharkie-present.svg';
import SharkieSpeakInverse from '../components/svg/sharkie-speak-inverse.svg';
import SharkieSpeak from '../components/svg/sharkie-speak.svg';

type SharksMascotConfigs = {
  sharkiePlay: MascotConfig;
  sharkieSpeak: MascotConfig;
  sharkieSpeakInverse: MascotConfig;
  sharkieLean: MascotConfig;
  sharkiePresent: MascotConfig;
};

export const mascotConfigs: SharksMascotConfigs = {
  sharkiePlay: {
    mascotComponent: <SharkiePlay width="350px" />,
    mascotStyles: {
      left: '80%',
      top: '30%',
    },
    animate: {
      x: '0%',
      y: '0%',
      scale: 1,
    },
  },
  sharkieSpeak: {
    mascotComponent: <SharkieSpeak width="350px" />,
    mascotStyles: {
      left: '78%',
      top: '58%',
    },
    animate: {
      x: '0%',
      y: '0%',
      scale: 1,
    },
  },
  sharkieSpeakInverse: {
    mascotComponent: <SharkieSpeakInverse width="350px" />,
    mascotStyles: {
      right: '75%',
      top: '58%',
    },
    animate: {
      x: '0%',
      y: '0%',
      scale: 1,
    },
    isInverse: true,
  },
  sharkieLean: {
    mascotComponent: <SharkieLean width="350px" />,
    mascotStyles: {
      right: '75%',
      top: '58%',
    },
    animate: {
      x: '0%',
      y: '0%',
      scale: 1,
    },
    isInverse: true,
  },
  sharkiePresent: {
    mascotComponent: <SharkiePresent width="350px" />,
    mascotStyles: {
      left: '78%',
      top: '58%',
    },
    animate: {
      x: '0%',
      y: '0%',
      scale: 1,
    },
  },
};
