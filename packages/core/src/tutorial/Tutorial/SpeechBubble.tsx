import { AnimatePresence, motion } from 'framer-motion';
import { TutorialSlide } from '../tutorial-slide';
import SpeechBubbleSvg from '../../components/svg/speech-bubble.svg';
import classNames from 'classnames';

type SpeechBubbleProps = {
  slide: TutorialSlide;
};

export const SpeechBubble = ({ slide }: SpeechBubbleProps) => {
  return (
    <div className="h-[300px] w-[400px] flex items-center justify-center relative">
      {/* @ts-ignore */}
      <AnimatePresence>
        <motion.span
          className="absolute top-0 left-0 h-full w-full inline-block"
          key={slide.id}
          variants={{
            enter: { opacity: 0.5, scale: 0.5 },
            center: { opacity: 1, scale: 1 },
            exit: { opacity: 0, scale: 1.2 },
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            scale: {
              type: 'spring',
              stiffness: 500,
            },
          }}
        >
          <span
            className={classNames('absolute top-0 left-0', {
              '-scale-x-100 right-0': slide.mascotConfig.isInverse,
            })}
          >
            <SpeechBubbleSvg />
          </span>
          <span className="relative w-full h-full flex items-center justify-center z-10 text-primary text-center p-8">
            {slide.textComponent}
          </span>
        </motion.span>
      </AnimatePresence>
    </div>
  );
};
