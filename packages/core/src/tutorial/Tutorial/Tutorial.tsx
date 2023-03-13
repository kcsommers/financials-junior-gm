import { motion } from 'framer-motion';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { TutorialComponentConfigs } from '../../tutorial/component-configs/tutorial-component-config';
import { TutorialName } from '../tutorial-name';
import { TutorialSlide, TutorialSlideEvent } from '../tutorial-slide';
import { Mascot } from './Mascot';

type TutorialProps<ComponentConfigs, SlideEvents> = {
  slides: TutorialSlide<ComponentConfigs, SlideEvents>[];
  activeTutorial: TutorialName;
  requestedTutorial: TutorialName;
  slideEventListener?: (eventName: SlideEvents) => void;
  setComponentConfigs?: Dispatch<SetStateAction<ComponentConfigs>>;
  setActionListener?: (...args: any[]) => void;
  onExit: (completed: boolean, tutorialName: TutorialName) => void;
};

export const Tutorial = <
  ComponentConfigs extends TutorialComponentConfigs<{}> = any,
  SlideEvents extends TutorialSlideEvent<string, {}> = any
>({
  slides,
  activeTutorial,
  requestedTutorial,
  slideEventListener,
  setComponentConfigs,
  setActionListener,
  onExit,
}: TutorialProps<ComponentConfigs, SlideEvents>) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const updateVariants = () => {
    const currentSlide = slides[currentSlideIndex];
    setComponentConfigs(
      currentSlide.componentConfigs || ({} as ComponentConfigs)
    );
  };

  const updateActionListener = () => {
    if (!setActionListener) {
      return;
    }
    const currentSlide = slides[currentSlideIndex];
    if (!currentSlide.canAdvanceSlide) {
      setActionListener(null);
    } else {
      setActionListener((...args: any[]) => {
        const shouldAdvanceSlide = currentSlide.canAdvanceSlide(...args);
        if (shouldAdvanceSlide) {
          nextSlide();
        }
      });
    }
  };

  const handleSlideEvent = () => {
    const currentSlide = slides[currentSlideIndex];
    if (slideEventListener && currentSlide.slideEvent) {
      slideEventListener(currentSlide.slideEvent);
    }
  };

  useEffect(() => {
    if (!setComponentConfigs) {
      return;
    }
    updateVariants();
    updateActionListener();
    handleSlideEvent();
  }, [currentSlideIndex]);

  const nextSlide = () => {
    setCurrentSlideIndex((prevIndex) => {
      if (prevIndex === slides.length - 1) {
        if (!requestedTutorial) {
          setIsExiting(true);
        }
        onExit(true, activeTutorial);
        return prevIndex;
      }
      return prevIndex + 1;
    });
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prevIndex) => {
      if (prevIndex === 0) {
        setIsExiting(true);
        onExit(false, activeTutorial);
        return prevIndex;
      }
      return prevIndex - 1;
    });
  };

  return (
    <motion.div
      initial="enter"
      animate="center"
      exit="exit"
      variants={{
        enter: {
          opacity: 0,
        },
        center: {
          opacity: 1,
        },
        exit: {
          opacity: 0,
        },
      }}
      className="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-white bg-opacity-75"
    >
      <span className="relative z-[70]">
        <Mascot
          isExiting={isExiting}
          requestedTutorial={requestedTutorial}
          slide={slides[currentSlideIndex]}
          currentSlideIndex={currentSlideIndex}
          nextSlide={nextSlide}
          prevSlide={prevSlide}
        />
      </span>
    </motion.div>
  );
};
