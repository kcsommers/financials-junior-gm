import { useSelector, useDispatch } from 'react-redux';
import '@css/components/Overlay.css';
import { motion, AnimatePresence } from 'framer-motion';
import { ReactSVG } from 'react-svg';
import closeBtn from '@images/icons/cancel.svg';
import { toggleOverlay } from '../redux/actions';

export const Overlay = () => {
  const overlayConfig = useSelector((state) => state.overlay);

  const tutorialActive = useSelector((state) => state.tutorial.isActive);

  const dispatch = useDispatch();

  const closeOverlay = () => {
    dispatch(toggleOverlay({ isOpen: false, template: null }));
  };

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
    <AnimatePresence>
      {overlayConfig.isOpen && (
        <motion.div
          initial='enter'
          animate='center'
          exit='exit'
          variants={variants}
          className='overlay-container'
        >
          {overlayConfig.template}
          {!tutorialActive && (
            <ReactSVG
              className='close-btn box-shadow'
              src={closeBtn}
              onClick={closeOverlay.bind(this)}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
