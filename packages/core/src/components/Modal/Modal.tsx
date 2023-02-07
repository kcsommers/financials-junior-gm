import { AnimatePresence, motion } from 'framer-motion';
import { PropsWithChildren } from 'react';

export const Modal = ({ children }: PropsWithChildren) => {
  const variants = {
    enter: {
      y: '100%',
    },
    center: {
      y: '0%',
    },
    exit: {
      y: '100%',
    },
  };

  return (
    // @ts-ignore
    <AnimatePresence>
      <motion.div
        initial="enter"
        animate="center"
        exit="exit"
        variants={variants}
        className="absolute top-0 bottom-0 left-0 right-0 flex justify-center align-center z-50"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
