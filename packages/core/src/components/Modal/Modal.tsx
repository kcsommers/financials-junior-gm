import { AnimatePresence, motion } from 'framer-motion';
import { PropsWithChildren } from 'react';
import { ModalBoard } from '../../components/ModalBoard';

type ModalProps = PropsWithChildren<{
  isVisible: boolean;
  onClose?: () => void;
}>;

export const Modal = ({ children, isVisible, onClose }: ModalProps) => {
  return (
    // @ts-ignore
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial="enter"
          animate="center"
          exit="exit"
          variants={{
            enter: {
              y: '100%',
            },
            center: {
              y: '0%',
            },
            exit: {
              y: '100%',
            },
          }}
          className="absolute top-0 bottom-0 left-0 right-0 flex justify-center align-center z-50 bg-black bg-opacity-40"
        >
          <ModalBoard onClose={onClose}>{children}</ModalBoard>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
