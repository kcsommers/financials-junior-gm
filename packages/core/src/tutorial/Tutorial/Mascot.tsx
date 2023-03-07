import classNames from 'classnames';
import { motion, Variants } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import BackButton from '../../components/svg/back-btn.svg';
import ForwardButton from '../../components/svg/forward-btn.svg';
import { TutorialName } from '../../tutorial/tutorial-name';
import { TutorialSlide } from '../tutorial-slide';
import { SpeechBubble } from './SpeechBubble';

type MascotProps = {
  slide: TutorialSlide;
  currentSlideIndex: number;
  requestedTutorial: TutorialName;
  isExiting: boolean;
  nextSlide: () => void;
  prevSlide: () => void;
};

const buttonVariants = {
  initial: {
    opacity: 0,
    y: '100%',
  },
  center: {
    opacity: 1,
    y: '0%',
  },
  slideUp: {
    opacity: 0,
    y: '-100%',
  },
};

export const Mascot = ({
  slide,
  currentSlideIndex,
  requestedTutorial,
  isExiting,
  nextSlide,
  prevSlide,
}: MascotProps) => {
  const [variants, setVariants] = useState<Variants>();
  const btnRef = useRef();
  const [animateButtons, setAnimateButtons] = useState(false);

  useEffect(() => {
    setVariants({
      animate: slide.mascotConfig.animate,
    });
  }, [slide]);

  const showButtons = !slide.canAdvanceSlide;

  const onButtonClick = (cb: () => void) => {
    setAnimateButtons(true);
    window.setTimeout(() => {
      setAnimateButtons(false);
      cb();
    }, 500);
  };

  return (
    <motion.div
      initial={false}
      animate="animate"
      variants={variants}
      key={slide.id}
    >
      <div className="relative">
        <div className="relative z-20 flex items-start">
          {showButtons && (
            // @ts-ignore
            <motion.button
              ref={btnRef}
              id={slide.id}
              className={classNames(
                'inline-flex flex-col items-center justify-center text-2xl mr-2 z-30',
                { disabled: !currentSlideIndex && !requestedTutorial },
                { 'pointer-events-none': animateButtons }
              )}
              onClick={() => onButtonClick(prevSlide)}
              initial="initial"
              animate={animateButtons || isExiting ? 'slideUp' : 'center'}
              variants={buttonVariants}
              transition={{ duration: 0.5 }}
            >
              {/* @ts-ignore */}
              <BackButton width="80px" />
              Back
            </motion.button>
          )}
          <SpeechBubble slide={slide} />
          {showButtons && (
            // @ts-ignore
            <motion.button
              id={slide.id}
              className={classNames(
                'inline-flex flex-col items-center justify-center text-2xl ml-2 z-30',
                { 'pointer-events-none': animateButtons }
              )}
              onClick={() => onButtonClick(nextSlide)}
              initial="initial"
              animate={animateButtons || isExiting ? 'slideUp' : 'center'}
              variants={buttonVariants}
              transition={{ duration: 0.5 }}
            >
              {/* @ts-ignore */}
              <ForwardButton width="80px" />
              Next
            </motion.button>
          )}
        </div>
        <div
          className="absolute z-10"
          style={slide.mascotConfig.mascotStyles || {}}
        >
          {slide.mascotConfig.mascotComponent}
        </div>
      </div>
    </motion.div>
  );
};
