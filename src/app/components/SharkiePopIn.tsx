import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SharkieComponent } from '@tutorial';

export const SharkiePopIn = ({ slides }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const currentSlide = slides[currentSlideIndex];

  return (
    <AnimatePresence>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={
          {
            opactiy: 1,
          } as any
        }
        exit={
          {
            opactiy: 0,
          } as any
        }
        transition={{
          default: { duration: 1 },
        }}
        className="sharkie-pop-in-container"
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.35)',
        }}
      >
        <SharkieComponent slide={currentSlide} />
      </motion.div>
    </AnimatePresence>
  );
};
