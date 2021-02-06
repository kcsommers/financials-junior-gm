import { useSelector, useDispatch } from 'react-redux';
import '@css/components/Modal.css';
import { motion, AnimatePresence } from 'framer-motion';
import { ReactSVG } from 'react-svg';
import closeBtn from '@images/icons/cancel.svg';
import { toggleModal } from '../redux/actions';

export const Modal = () => {
  const modalConfig = useSelector((state) => state.modal);

  const tutorialActive = useSelector((state) => state.tutorial.isActive);

  console.log('MODAL CONFIG:"::: ', modalConfig, tutorialActive);

  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(toggleModal({ isOpen: false, template: 'HI' }));
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
      {modalConfig.isOpen && (
        <motion.div
          initial='enter'
          animate='center'
          exit='exit'
          variants={variants}
          className='modal-container'
        >
          {modalConfig.template}
          {!tutorialActive && (
            <ReactSVG
              className='close-btn box-shadow'
              src={closeBtn}
              onClick={closeModal.bind(this)}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
