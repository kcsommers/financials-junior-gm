import { AnimatePresence, motion } from 'framer-motion';
import './Snackbar.css';

const variants = {
  enter: {
    opacity: 0,
    scale: 0.75,
    x: '-50%',
  },
  center: {
    opacity: 1,
    scale: 1,
    x: '-50%',
  },
  exit: {
    opacity: 0,
    scale: 0.75,
    x: '-50%',
  },
};

export const Snackbar = ({ config, isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="snackbar-wrap box-shadow color-primary"
          style={{
            cursor: !!config.onClick ? 'pointer' : 'initial',
          }}
          initial="enter"
          animate="center"
          transition={{
            default: { duration: 1, type: 'spring', bounce: 0.55 },
          }}
          exit="exit"
          variants={variants}
          onClick={config.onClick}
        >
          <span>{config.message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
